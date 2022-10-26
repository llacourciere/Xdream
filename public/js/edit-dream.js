console.log("this page has loaded")
let tag_id
$('#nightmare').on('click', function(){
    tag_id = 'Nightmare'
});
$('#lucid').on('click', function(){
    tag_id = 'Lucid'
});
$('#realistic').on('click', function(){
    tag_id = 'Realistic'
});
$('#recurring').on('click', function(){
    tag_id = 'Recurring'
});
$('#prophetic').on('click', function(){
    tag_id = 'Prophetic'
});
$('#daydream').on('click', function(){
    tag_id = 'Daydream'
});
$('#erotic').on('click', function(){
    tag_id = 'Erotic'
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