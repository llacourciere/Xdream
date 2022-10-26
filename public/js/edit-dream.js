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

async function editFormHandler(event) {
    event.preventDefault();

    const title = document.querySelector('input[name="dream-title"]').value.trim();
    const description = document.querySelector('textarea[name="dream-description"]').value.trim();
    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];

    const response = await fetch(`/api/dreams/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
            title,
            description,
            tag_id
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.ok) {
        document.location.replace('/dashboard');
    } else {
        alert(response.statusText)
    }
}

document.querySelector('.edit-dream-form').addEventListener('submit', editFormHandler);