
require('dotenv').config();
const cors = require('cors');

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
const PORT = process.env.PORT || 5000;

// MongoDB connection using environment variable
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// mongoose schema section we can later saparate this section if application extendes later
const widgetSchema = new mongoose.Schema({
  widget: String,
  text: String,
  borderRadius: String,
});

// Creating a mongoose model
const Widget = mongoose.model('Widget', widgetSchema);

// Middleware to parse JSON requests
app.use(bodyParser.json());

// API endpoint to save widget data
app.post('/api/widgets', async (req, res) => {
  try {
    const { widget, text, borderRadius } = req.body;

    // Createing a new widget instance
    const newWidget = new Widget({
      widget,
      text,
      borderRadius,
    });

    //Saveing the widget to the database
    await newWidget.save();

    res.json({ success: true, message: 'Widget data saved successfully!' });
  } catch (error) {
    console.error('Error saving widget data:', error);
    res.status(500).json({ success: false, message: 'Error saving widget data.' });
  }
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
