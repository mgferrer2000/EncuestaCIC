const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();

// Load Config
let config = { port: 3001 };
if (fs.existsSync('./config.json')) {
    config = JSON.parse(fs.readFileSync('./config.json', 'utf8'));
}

// Middleware
app.use(cors());
app.use(bodyParser.json());

const DATA_FILE = path.join(__dirname, 'data.csv');

// Ensure CSV exists with headers
if (!fs.existsSync(DATA_FILE)) {
    const headers = 'Timestamp,Q1,Q2,Q3,Q4,Q5,Comentarios\n';
    fs.writeFileSync(DATA_FILE, headers);
}

// Helper to escape CSV fields
const escapeCvField = (field) => {
    if (field === null || field === undefined) return '';
    const stringField = String(field);
    if (stringField.includes(',') || stringField.includes('"') || stringField.includes('\n')) {
        return `"${stringField.replace(/"/g, '""')}"`;
    }
    return stringField;
};

// Routes
app.get('/api/status', (req, res) => {
    res.json({
        status: 'ok',
        storage: 'local-csv',
        file: DATA_FILE
    });
});

app.post('/api/submit', async (req, res) => {
    try {
        const { answers } = req.body;
        // answers is an array: [Date, Q1, Q2, Q3, Q4, Q5, Comments]

        if (!Array.isArray(answers)) {
            return res.status(400).json({ error: 'Invalid data format' });
        }

        const csvRow = answers.map(escapeCvField).join(',') + '\n';

        fs.appendFile(DATA_FILE, csvRow, (err) => {
            if (err) {
                console.error('Error writing to CSV:', err);
                return res.status(500).json({ error: 'Failed to save data' });
            }
            console.log('New response saved to data.csv');
            res.json({ success: true, message: 'Response saved' });
        });

    } catch (error) {
        console.error('Error processing request:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Start Server
app.listen(config.port, () => {
    console.log(`Server running on port ${config.port}`);
    console.log(`Data will be saved to: ${DATA_FILE}`);
});
