const express = require('express');
const bodyParser = require('body-parser');
const path = require('path'); // Import the path module

const app = express();
const PORT = process.env.PORT || 3000;
let fetchModule;
try {
    fetchModule = import('node-fetch');
} catch (error) {
    console.error('Error loading node-fetch:', error);
}
const accessToken = process.env.GITHUB_ACCESS_TOKEN;

app.use(bodyParser.json()); // Parse JSON bodies

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));


// Endpoint to save notes
app.post('/saveFiles', async (req, res) => {
    try {
        const notes = req.body; // Assuming the request body contains an array of notes
        await saveNotesToGitHub(notes);
        res.status(200).send('Notes saved successfully.');
    } catch (error) {
        console.error('Error saving notes:', error);
        res.status(500).send('Error saving notes.');
    }
});

// Function to save notes to GitHub
async function saveNotesToGitHub(notes) {
    const repository = 'yronk9/website';
    const filePath = 'saveFiles/notes.json';
    const apiUrl = `https://api.github.com/repos/${repository}/contents/${filePath}`;

    let fetch;
    try {
        const fetchModule = await import('node-fetch');
        fetch = fetchModule.default;
    } catch (error) {
        console.error('Error loading node-fetch:', error);
        return;
    }

    let response;
    try {
        response = await fetch(apiUrl, {
            method: 'GET',
            headers: {
                'Authorization': `token ${accessToken}`,
                'User-Agent': 'Node.js'
            }
        });
    } catch (error) {
        console.error('Error fetching data:', error);
        return;
    }

    const fileData = await response.json();
    const content = JSON.parse(Buffer.from(fileData.content, 'base64').toString());

    // Append new notes
    content.push(...notes);

    // Update file on GitHub
    try {
        await fetch(apiUrl, {
            method: 'PUT',
            headers: {
                'Authorization': `token ${accessToken}`,
                'User-Agent': 'Node.js',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                message: 'Update notes',
                content: Buffer.from(JSON.stringify(content)).toString('base64'),
                sha: fileData.sha
            })
        });
    } catch (error) {
        console.error('Error updating file:', error);
    }
}

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
