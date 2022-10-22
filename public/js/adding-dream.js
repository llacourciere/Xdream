let tag_id
$('#nightmare').on('click', function(){
    tag_id = 1
});
$('#lucid').on('click', function(){
    tag_id = 2
});
$('#realistic').on('click', function(){
    tag_id = 3
});
$('#reoccurring').on('click', function(){
    tag_id = 4
});
$('#prophetic').on('click', function(){
    tag_id = 5
});
$('#daydream').on('click', function(){
    tag_id = 6
});
$('#erotic').on('click', function(){
    tag_id = 7
});

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
                public,
                tag_id
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