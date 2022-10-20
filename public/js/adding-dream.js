async function addDreamHandler(event) {
    event.preventDefault();

    const description = document.querySelector('textarea[name="dream-body"]').value.trim();
    const public = document.getElementById('public-dream').checked;
    const title = document.querySelector('#dream-title').value.trim();

        console.log(public)
        const response = await fetch('/api/dreams',{
            method: 'POST',
            body: JSON.stringify({
                description,
                title,
                public
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