document.addEventListener('DOMContentLoaded', () => {
    const paymentOptions = document.getElementById('payment-options');
    const paymentButtons = paymentOptions.querySelectorAll('button');
  
    paymentButtons.forEach(button => {
      button.addEventListener('click', () => {
        const paymentMethod = button.getAttribute('data-payment-method');
        handlePaymentMethod(paymentMethod);
      });
    });
  
    const form = document.querySelector('form');
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const name = document.getElementById('name').value;
      const address = document.getElementById('address').value;
      const city = document.getElementById('city').value;
      const state = document.getElementById('state').value;
      const zip = document.getElementById('zip').value;
      const country = document.getElementById('country').value;
  
      if (!name || !address || !city || !state || !zip || !country) {
        alert('Please fill in all the required fields.');
        return;
      }
  
      const upiButton = paymentOptions.querySelector('button[data-payment-method="UPI"]');
      upiButton.click();
    });
  });
  
  function handlePaymentMethod(paymentMethod) {
    switch (paymentMethod) {
      case 'UPI':
        showUpiQrCode();
        break;
      default:
        console.error(`Unknown payment method: ${paymentMethod}`);
    }
  }
  
  function showUpiQrCode() {
    // Generate a UPI QR code using a payment gateway API
    // Replace this with actual API call
    const qrCode = document.createElement('img');
    qrCode.src = 'https://example.com/upi-qr-code.png';
    qrCode.style.display = 'block';
    document.body.appendChild(qrCode);
  
    // Listen for payment confirmation from the payment gateway API
    // Replace this with actual API call
    const paymentConfirmation = {
      paymentId: '1234567890',
      transactionId: 'abcdefghij',
      amount: 100,
      status: 'success',
    };
  
    setTimeout(() => {
      if (paymentConfirmation.status === 'success') {
        alert('Payment successful! You are now a premium user of Mall Map.');
        document.body.removeChild(qrCode);
      } else {
        alert('Payment failed. Please try again.');
        document.body.removeChild(qrCode);
      }
    }, 2000);
  }