// Register
const API_BASE_URL = "http://localhost:3000/api"; // Your API base URL

function handleSignup() {
  const username = document.getElementById('signup-username').value;
  const email = document.getElementById('signup-email').value;
  const password = document.getElementById('signup-password').value;
  const button = document.getElementById('signup-btn');
  const messageDiv = document.getElementById('signup-message');

  // Disable the button and show loading text
  button.disabled = true;
  button.textContent = "Signing Up...";
  messageDiv.textContent = "";

  // Check if all fields are filled
  if (!username || !email || !password) {
    alert("All fields are required!");
    button.disabled = false;
    button.textContent = "Signup";
    return;
  }

  // Send the signup request
  fetch(`${API_BASE_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, email, password })
  })
  .then(response => response.json())
  .then(data => {
    if (data.token) {
      // Store the token in localStorage or sessionStorage
      localStorage.setItem('userToken', data.token); // Or sessionStorage.setItem if you prefer session storage

      messageDiv.style.color = "green";
      messageDiv.textContent = "Registration successful! You will be redirected to login.";

      // Redirect to login page after successful registration
      setTimeout(() => {
        window.location.href = "/frontend/login.html"; // Redirect to login page
      }, 2000); // Redirect after 2 seconds
    } else {
      messageDiv.style.color = "red";
      messageDiv.textContent = data.error || "Signup failed!";
    }
  })
  .catch(error => {
    console.error('Error:', error);
    alert("An error occurred during signup. Please try again.");
  })
  .finally(() => {
    // Re-enable the button and reset text after the request is completed
    button.disabled = false;
    button.textContent = "Signup";
  });
}


// Login

const LOGIN_BASE_URL = "http://localhost:3000/api"; // Your API base URL

// Handle Login
function handleLogin() {
  const email = document.getElementById('login-email').value;
  const password = document.getElementById('login-password').value;

  // Check if all fields are filled
  if (!email || !password) {
    alert("All fields are required!");
    return;
  }

  // Send the login request
  fetch(`${LOGIN_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  })
  .then(response => {
    if (!response.ok) {
      // Handle HTTP errors
      return response.json().then(err => Promise.reject(err));
    }
    return response.json();
  })
  .then(data => {
    const messageDiv = document.getElementById('login-message');
    if (data.token || document.cookie.includes("token")) {
      messageDiv.style.color = "green";
      messageDiv.textContent = "Login successful! Redirecting..."; // Success message

      // Store the token if returned (for non-cookie-based auth)
      if (data.token) {
        localStorage.setItem('authToken', data.token);
      }

      // Redirect to the task page after login
      setTimeout(() => {
        window.location.href = '/task.html'; // Redirect to task page
      }, 2000); // Wait for 2 seconds before redirecting
    } else {
      messageDiv.style.color = "red";
      messageDiv.textContent = data.message || "Login failed!"; // Error message
    }
  })
  .catch(error => {
    console.error('Error:', error);
    const messageDiv = document.getElementById('login-message');
    messageDiv.style.color = "red";
    messageDiv.textContent = error.message || "An error occurred during login. Please try again.";
  });
}
