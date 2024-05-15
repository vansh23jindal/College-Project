const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const ACCESS_TOKEN_SECRET = 'profile access';
const jwt = require('jsonwebtoken');

const app = express();
mongoose.set("strictQuery", true);

app.use(bodyParser.json());
app.use(cors());
app.use(express.static("public"));

const PORT = process.env.PORT || 5500;

// MongoDB Atlas connection string
const MONGODB_URI =
  "mongodb+srv://vansh1450be22:private23vansh@cluster0.myhoijq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(MONGODB_URI);

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
  username: String,
});

const User = mongoose.model("User", userSchema);

// Nodemailer transporter configuration
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "vansh1450.be22@chitkarauniversity.edu.in",
    pass: "private23vansh",
  },
});

// Middleware function to check for valid authentication token
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.sendStatus(401);
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      return res.sendStatus(403);
    }
    req.user = user;
    next();
  });
}

// Endpoint for updating the user profile
app.put('/api/update-profile', authenticateToken, async (req, res) => {
  const { currentPassword, newPassword, ...userData } = req.body;

  try {
    const user = await User.findOne({ email: req.user.email });

    if (!user) {
      return res.status(404).send('User not found.');
    }

    // Check if current password is correct
    const isPasswordValid = await bcrypt.compare(currentPassword, user.password);

    if (!isPasswordValid) {
      return res.status(401).send('Invalid current password.');
    }

    // Hash new password if provided
    if (newPassword) {
      userData.password = await bcrypt.hash(newPassword, 10);
    }

    // Update user data in database
    const updatedUser = await User.findOneAndUpdate({ email: req.user.email }, userData, { new: true });

    res.send('Profile updated successfully.');
  } catch (error) {
    console.error(error);
    res.status(500).send('Failed to update profile.');
  }
});

app.post("/signup", async (req, res) => {
  const { email, password, username } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(409).send({ success: false, message: "Email already in use" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ email, password: hashedPassword, username });
    await newUser.save();

    res.send({ success: true,message: "User created successfully" });
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
});

app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).send({ success: false, message: "Invalid email or password" });
    }

    // Compare the user's password with the stored hash
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).send({ success: false, message: "Invalid email or password" });
    }

    // Generate a JWT token
    const accessToken = jwt.sign(
      { id: user._id, email: user.email },
      ACCESS_TOKEN_SECRET,
      { expiresIn: '1h' }
    );

    // Set the JWT token in the response headers
    res.setHeader('Authorization', `Bearer ${accessToken}`);

    res.send({ success: true, message: "Login successful" });
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
});

app.post("/api/forgot-password", async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).send("User not found.");
    }

    // Generate a unique token for the password reset link
    const token = crypto.randomBytes(20).toString("hex");

    // Save the token in the user document
    user.resetToken = token;
    user.resetTokenExpiration = Date.now() + 3600000; // Token expires in 1 hour
    await user.save();

    // Send password reset link to user
    const resetLink = `http://localhost:5500/reset-password?token=${token}`;
    const mailOptions = {
      from: "vansh1450.be22@chitkarauniversity.edu.in",
      to: email,
      subject: "Password Reset Request",
      text: `Please click on the following link to reset your password: ${resetLink}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        res.status(500).send("Error sending email.");
      } else {
        res.send("Password reset link sent to email.");
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error sending email.");
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});