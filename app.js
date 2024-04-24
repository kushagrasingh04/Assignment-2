// Import dependencies
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path'); // Import path module

// Create Express app
const app = express();

// Set up middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files from the 'public' folder
app.set('view engine', 'ejs'); // Assuming you're using EJS as the view engine

// Connect to MongoDB Atlas
mongoose.connect('mongodb+srv://kush:123@kushagra.mu5hlri.mongodb.net/?retryWrites=true&w=majority&appName=Kushagra', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB Atlas');
}).catch((err) => {
  console.error('Error connecting to MongoDB Atlas:', err.message);
});

// Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html')); // Serve the index.html file
});
app.post('/users', async (req, res) => {
  const { username, email, password } = req.body;
  try {
      const newUser = new User({ username, email, password }); // Create a new user instance
      await newUser.save(); // Save the new user to the database
      res.redirect('/users');
  } catch (err) {
      console.error('Error saving user:', err.message);
      res.redirect('/');
  }
});

app.get('/users', async (req, res) => {
  try {
    const users = await User.find({});
    res.render('index.html', { users }); // Assuming you want to render the index.html file with user data
  } catch (err) {
    console.error('Error finding users:', err.message);
    res.redirect('/');
  }
});

// Start the server
const PORT = process.env.PORT || 2234; // Use the environment variable PORT or default to 3007
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
