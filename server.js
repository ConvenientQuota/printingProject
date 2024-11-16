// Import required modules
const express = require('express');
const multer = require('multer');
const path = require('path');
const bodyParser = require('body-parser');

// Initialize Express app
const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname)));

// Setup Multer for file uploads
const storage = multer.diskStorage({
    destination: 'uploads/', // Upload files to the 'uploads' folder
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname); // Append timestamp to file name
    }
});
const upload = multer({ storage });

// Serve `home.html` for the root URL
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'home.html'));
});

// Handle form submission
app.post('/submit-order', upload.single('file'), (req, res) => {
    const { name, email, documentType, quantity } = req.body;
    const filePath = req.file ? req.file.path : null;

    if (!filePath) {
        return res.status(400).send('File upload failed.');
    }

    console.log('Order Details:');
    console.log(`Name: ${name}`);
    console.log(`Email: ${email}`);
    console.log(`Document Type: ${documentType}`);
    console.log(`Quantity: ${quantity}`);
    console.log(`Uploaded File Path: ${filePath}`);

    res.send(`<h1>Order Submitted</h1><p>Thank you, ${name}! Your order has been received.</p>`);
});

// Start server on port 3000
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
