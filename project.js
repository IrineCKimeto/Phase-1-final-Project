const coffeeImage = document.getElementById('coffee-image');
const newCoffeeBtn = document.getElementById('new-coffee-btn');
const likeCoffeeBtn = document.getElementById('like-coffee-btn');
const commentInput = document.getElementById('comment-input');
const submitCommentBtn = document.getElementById('submit-comment-btn');
const commentsContainer = document.getElementById('comments-container');
const imageUrlInput = document.getElementById('image-url-input');
const submitUrlBtn = document.getElementById('submit-url-btn');
const likesCount = document.getElementById('likes-count');

let likes = 0;
let comments = [];


async function fetchCoffee() {
    try {
        const response = await fetch('http://localhost:3000/coffees');
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        const randomCoffee = data[Math.floor(Math.random() * data.length)];
        coffeeImage.src = randomCoffee.file;
    } catch (error) {
        console.error('Error fetching coffee image:', error);
        alert('Error. Please try again later.');
    }
}



likeCoffeeBtn.addEventListener('click', () => {
    likes++;
    likesCount.textContent = `Likes: ${likes}`;
});


submitCommentBtn.addEventListener('click', () => {
    const comment = commentInput.value.trim();
    if (comment) {
        comments.push(comment);
        displayComments();
        commentInput.value = '';
    } else {
        alert('Please enter a comment.');
    }
});


function displayComments() {
    commentsContainer.innerHTML = '';
    comments.forEach(comment => {
        const p = document.createElement('p');
        p.textContent = comment;
        commentsContainer.appendChild(p);
    });
}


newCoffeeBtn.addEventListener('click', fetchCoffee);


submitUrlBtn.addEventListener('click', () => {
    const url = imageUrlInput.value.trim();
    if (url) {
        coffeeImage.src = url;
    } else {
        alert('Please enter a valid URL.');
    }
});


fetchCoffee();
