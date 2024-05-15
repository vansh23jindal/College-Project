$(document).ready(function() {
  $("#forgot-password-form").submit(function(event) {
    event.preventDefault();

    var email = $("#email").val();

    // Send an AJAX request to the server to send a password reset link
    $.ajax({
      url: '/forgot-password',
      method: 'POST',
      data: { email: email },
      success: function(response) {
        if (response.success) {
          $("#message").text("A password reset link has been sent to your email.");
        } else {
          $("#message").text("Failed to send password reset link.");
        }
      },
      error: function(xhr, status, error) {
        console.error(error);
        $("#message").text("Failed to send password reset link.");
      }
    });
  });
});