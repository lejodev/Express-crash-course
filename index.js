const express = require('express'); // bring express
const path = require('path');
const logger = require('./middleware/logger');

const app = express(); // Initialize a variable called app with express

// serve file in a non static way
// app.get('/', (req, res) => {
    //     res.sendFile(path.join(__dirname, 'public', 'index.html'))
    // })
    
// BodyParser Middleware
app.use(express.json());
app.use(express.urlencoded({extended : false}))

app.use(logger);
// Members API Routes
app.use('/api/members', require('./routes/api/members'));

// serve files in a static way
app.use(express.static(path.join(__dirname, 'public')))

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
})