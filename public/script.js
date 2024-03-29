const deleteButton = document.getElementsByClassName('deleted');
const passwordPrompt = document.getElementsByClassName('passwordPrompt');
const noButton = document.getElementsByClassName('noButton');

function changeStyleBlock(element){
    const targetedElement = element.parentNode.getElementsByClassName("passwordPrompt");
    targetedElement[0].style.display = 'block';
}
function changeStyleNone(element){
    const targetedElement = element.parentNode;
    targetedElement.style.display = 'none';
}

Array.from(deleteButton).forEach(element => {
    element.addEventListener('click', () => {
        changeStyleBlock(element);
    });
});

Array.from(noButton).forEach(element => {
    element.addEventListener('click', () => {
        changeStyleNone(element);
    });
});

// function verifyAndDelete() {
//     const password = document.getElementById('passwordInput').value;

//     // Send the password to your Node.js server for verification
//     fetch('/verify-delete', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ password: password }) 
//     })
//     .then(response => response.json())
//     .then(data => {
//         if (data.success) {
//             callDeleteFunction(); // Assuming you have this function on the frontend
//             passwordPrompt.style.display = 'none';
//         } else {
//             alert('Incorrect password'); 
//         }
//     });
// }
