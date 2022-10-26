let tag_id
const drpDwnBtn = document.getElementById('drpDwnBtn');
$('#nightmare').on('click', function(){
    tag_id = 'Nightmare'
    drpDwnBtn.textContent = 'Nightmare'
});
$('#lucid').on('click', function(){
    tag_id = 'Lucid'
    drpDwnBtn.textContent = 'Lucid'
});
$('#realistic').on('click', function(){
    tag_id = 'Realistic'
    drpDwnBtn.textContent = 'Realistic'
});
$('#recurring').on('click', function(){
    tag_id = 'Recurring'
    drpDwnBtn.textContent = 'Recurring'
});
$('#prophetic').on('click', function(){
    tag_id = 'Prophetic'
    drpDwnBtn.textContent = 'Prophetic'
});
$('#daydream').on('click', function(){
    tag_id = 'Daydream'
    drpDwnBtn.textContent = 'Daydream'
});
$('#erotic').on('click', function(){
    tag_id = 'Erotic'
    drpDwnBtn.textContent = 'Erotic'
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