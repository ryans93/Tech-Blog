const form = document.querySelector("form");

form.addEventListener("submit", async function (event) {
    event.preventDefault();
    const username = document.querySelector("#username").value;
    const password = document.querySelector("#password").value;

    if (username && password) {
        // Send a POST request to the API endpoint
        const response = await fetch('/api/user/signUp', {
          method: 'POST',
          body: JSON.stringify({ username, password }),
          headers: { 'Content-Type': 'application/json' },
        });
    
        if (response.ok) {
          document.location.replace('/dashboard');
        } else {
          alert(response.status);
        }
      }
})