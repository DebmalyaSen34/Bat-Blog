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
