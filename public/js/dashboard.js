const form = document.querySelector("form");

form.addEventListener("submit", async function (event) {
    event.preventDefault();
    const title = document.querySelector("#title").value;
    const content = document.querySelector("#content").value;

    if (title && content) {
        // Send a POST request to the API endpoint
        const response = await fetch('/api/post/', {
          method: 'POST',
          body: JSON.stringify({ title, content }),
          headers: { 'Content-Type': 'application/json' },
        });
    
        if (response.ok) {
          // If successful, redirect the browser to the profile page
          document.location.replace('/dashboard');
        } else {
          alert(response.status);
        }
      }
})