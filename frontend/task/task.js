// Get modal and button elements
const modal = document.getElementById("addTaskModal");
const addTaskButton = document.querySelector(".add-task");
const closeModalButton = document.getElementById("closeModalBtn");

// Show the modal when the "Add Tasks" button is clicked
addTaskButton.onclick = function() {
  modal.style.display = "block";
};

// Close the modal when the "x" button is clicked
closeModalButton.onclick = function() {
  modal.style.display = "none";
};

// Close the modal if the user clicks anywhere outside of it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

// Handle the form submission
const taskForm = document.getElementById("taskForm");
taskForm.addEventListener("submit", async function(e) {
  e.preventDefault();

  const title = document.getElementById("title").value;
  const description = document.getElementById("description").value;
  const priority = document.getElementById("priority").value;
  const deadline = document.getElementById("deadline").value;

  // Create a new task object
  const taskData = {
    title,
    description,
    priority,
    deadline,
  };

  try {
    // Send data to the backend
    const response = await fetch('http://localhost:3000/api/tasks/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`, // Optional, if you're using JWT authentication
      },
      body: JSON.stringify(taskData),
    });

    // Handle the response
    if (response.ok) {
      const data = await response.json();
      alert(`Task created: ${data.task.title}`);
      modal.style.display = "none"; // Close the modal after submission
    } else {
      const error = await response.json();
      alert(`Error: ${error.message}`);
    }
  } catch (error) {
    console.error('Error creating task:', error);
    alert('An error occurred while creating the task.');
  }
});

