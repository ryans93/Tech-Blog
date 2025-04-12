const editForm = document.querySelector("#editPostForm");
const commentForm = document.querySelector("#commentForm");
const deleteBtn = document.querySelector("#deletePost")

if (editForm) {
    const id = editForm.getAttribute("data-id");

    editForm.addEventListener("submit", async function (event) {
        event.preventDefault();
        const title = document.querySelector("#title").value;
        const content = document.querySelector("#content").value;
        console.log(id)
        if (title && content) {
            // Send a POST request to the API endpoint
            const response = await fetch(`/api/post/${id}`, {
                method: 'PUT',
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

    deleteBtn.addEventListener("click", async function (event) {
        event.preventDefault();

        // Send a POST request to the API endpoint
        const response = await fetch(`/api/post/${id}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            // If successful, redirect the browser to the profile page
            document.location.replace('/dashboard');
        } else {
            alert(response.status);
        }

    })
}

if (commentForm) {
    const id = commentForm.getAttribute("data-id");

    commentForm.addEventListener("submit", async function (event) {
        event.preventDefault();
        const content = document.querySelector("#content").value;
        console.log(id)
        if (content) {
            // Send a POST request to the API endpoint
            const response = await fetch(`/api/post/comment`, {
                method: 'POST',
                body: JSON.stringify({ content, post_id: id }),
                headers: { 'Content-Type': 'application/json' },
            });

            if (response.ok) {
                // If successful, redirect the browser to the profile page
                document.location.replace(`/post/${id}`);
            } else {
                alert(response.status);
            }
        }
    })

}