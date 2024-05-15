let comments = [];

document.getElementById('rating-form').addEventListener('submit', function(event) {
  event.preventDefault();
  const rating = document.getElementById('rating').value;
  const comment = document.getElementById('comment').value;
const newComment = {
    rating: rating,
    comment: comment,
    date: new Date()
  };
  comments.push(newComment);
  displayComments();
  console.log('Rated:', rating, 'Commented:', comment);
  document.getElementById('rating-form').reset();
});

function displayComments() {
  const commentsList = document.getElementById('comments');
  commentsList.innerHTML = '';
  comments.forEach(function(comment) {
    const li = document.createElement('li');
    li.innerHTML = `<strong>Rating:</strong> ${comment.rating} <br /> <strong>Comment:</strong> ${comment.comment} <br /> <strong>Date:</strong> ${comment.date.toLocaleString()}`;
    commentsList.appendChild(li);
  });
}

// Display any existing comments
displayComments();