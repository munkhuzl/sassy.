import express from 'express';
import  bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';

const app = express();
const PORT = process.env.PORT || 4000;

// MongoDB connection string
const mongoUri ='mongodb+srv://munkhzul:zulaa1234@sassybooking.0jskx.mongodb.net/appointments?retryWrites=true&w=majority'
// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Connect to MongoDB
mongoose
  .connect(mongoUri)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Error connecting to MongoDB:', err));

  app.get('/api/appointments', async (req, res) => {
    try {
      const appointments = await Appointment.find();
      res.status(200).send(appointments);
    } catch (error) {
      console.error('Error fetching appointments:', error);
      res.status(500).send({ message: 'Internal server error' });
    }
  });

const appointmentSchema = new mongoose.Schema({
  email_address: { type: String, required: true },
  name: { type: String, required: true },
  category: { type: String, required: true },
  time: { type: String, required: true },
  phone: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  message: { type: String, required: true },
});

const Appointment = mongoose.model('Appointment', appointmentSchema);
// export default async (req, res) => {
//   if (req.method === 'GET') {
//     try {
//       const appointments = await Appointment.find();
//       res.status(200).json(appointments);
//     } catch (error) {
//       res.status(500).json({ error: 'Error fetching appointments' });
//     }
//   } else if (req.method === 'POST') {
//     try {
//       const { email_address, name, category, time, phone } = req.body;
//       const newAppointment = new Appointment({ email_address, name, category, time, phone });
//       await newAppointment.save();
//       res.status(201).json({ message: 'Appointment created successfully' });
//     } catch (error) {
//       res.status(500).json({ error: 'Error creating appointment' });
//     }
//   } else {
//     res.status(405).json({ error: 'Method not allowed' });
//   }
// };
app.post('/api/appointments', async (req, res) => {
  try {
    const { email_address, name, category, time, phone, _id, message} = req.body;
    if (!email_address || !name || !category || !time || !phone, _id) {
      return res.status(400).send({ message: 'All fields are required!' });
    }
    const [hours, minutes] = time.split(':');
    const appointmentDate = new Date();
    appointmentDate.setHours(hours, minutes, 0, 0); 
    const newAppointment = new Appointment({
      _id,
      email_address,
      name,
      time,
      category,
      time: appointmentDate,
      phone,
      createdAt: new Date(),
      message,
    });
    await newAppointment.save();
    res.status(201).send({ message: 'Таны цаг амжилттай илгээгдлээ!', appointment: newAppointment });
  } catch (error) {
    console.error('Error creating appointment:', error);
    res.status(500).send({ message: 'Илгээхэд алдаа гарлаа' });
  }
});

app.delete('/api/appointments:id', async (req, res) => {
  try {
    const { id } = req.params;
    if (!id === _id) {
      return res.status(400).send({ message: 'Appointment ID is required' });
    }
 
    const deletedAppointment = await Appointment.findByIdAndDelete(_id);
    if (!deletedAppointment) {
      return res.status(404).send({ message: 'Appointment not found' });
    }

    res.status(200).send({ message: 'Appointment deleted successfully' });
  } catch (error) {
    console.error('Error deleting appointment:', error);
    res.status(500).send({ message: 'Устгахад алдаа гарлла' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`[server]: Server is running on http://localhost:${PORT}`);
});


