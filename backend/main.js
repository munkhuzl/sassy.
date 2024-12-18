const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 4000;

// MongoDB connection string
const mongoUri =
  'mongodb+srv://bolzopzulaa:VU6dlVlK7CdYHCgU@cluster0.r7vw0.mongodb.net/SASSYNAIL?retryWrites=true&w=majority&appName=Cluster0';

// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Connect to MongoDB
mongoose
  .connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Error connecting to MongoDB:', err));

// Define Schema and Model
const appointmentSchema = new mongoose.Schema({
  email_address: { type: String, required: true },
  name: { type: String, required: true },
  category: { type: String, required: true },
  time: { type: String, required: true },
  phone: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Appointment = mongoose.model('Appointment', appointmentSchema);

// Routes

// Create a new appointment
app.post('/api/appointments', async (req, res) => {
  try {
    const { email_address, name, category, time, phone } = req.body;

    if (!email_address || !name || !category || !time || !phone) {
      return res.status(400).send({ message: 'All fields are required!' });
    }

    // Parse time into a full Date object
    const [hours, minutes] = time.split(':');
    const appointmentDate = new Date();
    appointmentDate.setHours(hours, minutes, 0, 0); // Set time on today's date

    const newAppointment = new Appointment({
      email_address,
      name,
      category,
      time: appointmentDate,
      phone,
    });
    await newAppointment.save();

    res.status(201).send({ message: 'Таны цаг амжилттай баталгаажлаа!', appointment: newAppointment });
  } catch (error) {
    console.error('Error creating appointment:', error);
    res.status(500).send({ message: 'Internal server error' });
  }
});

// Get all appointments
app.get('/api/appointments', async (req, res) => {
  try {
    const appointments = await Appointment.find();
    res.status(200).send(appointments);
  } catch (error) {
    console.error('Error fetching appointments:', error);
    res.status(500).send({ message: 'Internal server error' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`[server]: Server is running on http://localhost:${PORT}`);
});
