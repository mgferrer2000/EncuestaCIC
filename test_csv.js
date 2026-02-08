const fs = require('fs');
const path = require('path');
const axios = require('axios');

async function testServer() {
    try {
        console.log("Sending test data to server...");
        const response = await axios.post('http://localhost:3001/api/submit', {
            answers: [new Date().toISOString(), 5, 4, 3, 2, 1, "Test comment"]
        });

        console.log("Server Response:", response.data);

        const csvPath = path.join(__dirname, 'server', 'data.csv');
        if (fs.existsSync(csvPath)) {
            console.log("SUCCESS: data.csv created!");
            console.log("Content:");
            console.log(fs.readFileSync(csvPath, 'utf8'));
        } else {
            console.error("FAILURE: data.csv not found.");
        }

    } catch (error) {
        console.error("Test Failed:", error.message);
        console.log("Make sure the server is running!");
    }
}

testServer();
