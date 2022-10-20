async function addDreamHandler(event) {
    event.preventDefault();

    const description = document.querySelector('textarea[name="dream-body"]').value.trim();

    const title = document.querySelector('#dream-title').value.trim();


        const response = await fetch('/api/dreams',{
            method: 'POST',
            body: JSON.stringify({
                description,
                title,
            }),
            headers: {
                'Content-type': 'application/json'
            }
        });
        if(response.ok) {
            document.location.reload();
        } else {
            alert(response.statusText);
        }
    }


document.querySelector('.new-dream-form').addEventListener('submit', addDreamHandler)