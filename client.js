//this will be the client file
// 16 March 2024
// Purpose:
// This code and the corresponding server code will
// allow for a website to run on a localhost:3000
// 
// Extra files:
// Within the directory that this file is in, the
// files: index.html, README.md; are available.
// 
// In index.html, there is an html script that 
// corresponds with the website's intended theme
// and overall format.

const shapeContainer = document.getElementById('shape-container');
const button = document.querySelector('button');
const philosophyText = document.getElementById('philosophy-text');

// Create a random number of shapes
function createShapes(count) {
    shapeContainer.innerHTML = '';
    for (let i = 0; i < count; i++) {
        const shape = document.createElement('div');
        shape.classList.add('shape');
        shapeContainer.appendChild(shape);
    }
}

// Generate random philosophy text
function generatePhilosophyText() {
    const philosophers = ['Socrates', 'Plato', 'Aristotle', 'Descartes', 'Kant'];
    const philosophies = [
        'The unexamined life is not worth living.',
        'Knowledge is the food of the soul.',
        'The ultimate goal of human life is to attain happiness.',
        'I think, therefore I am.',
        'The moral law within us is the voice of God.'
    ];
    const randomPhilosopher = philosophers[Math.floor(Math.random() * philosophers.length)];
    const randomPhilosophy = philosophies[Math.floor(Math.random() * philosophies.length)];
    philosophyText.textContent = `${randomPhilosopher} once said, "${randomPhilosophy}"`;
}

// Change the number of shapes displayed
function changeShapeCount() {
    const count = Math.floor(Math.random() * 10) + 5;
    createShapes(count);
    generatePhilosophyText();
}

// Initialize the page with a random number of shapes
createShapes(Math.floor(Math.random() * 10) + 5);
generatePhilosophyText();
