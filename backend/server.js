const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { v4: uuidv4  } = require('uuid');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

let appointments = []; // Move this to the top

//frontoos ywuulah n
app.post('/api/appointments', (req, res) => {
  const { name, email_address, phone, category } = req.body;
  if (!name || !email_address || !phone || !category) {
    return res.status(400).send({ message: 'All fields are required!' });
  }

  console.log('Appointment received:', req.body);
  const newAppointment = {
    id: uuidv4(),
    name,
    email_address,
    phone,
    category,
  };
  
  appointments.push(newAppointment); // Save the appointment to the array
  console.log('Appointment added:', newAppointment);
  res.status(201).send({ message: 'Appointment scheduled successfully!' });
});


//admin deer awah
app.get('/api/appointments', (req, res) => {
  res.json(appointments.length ? appointments : { message: 'No appointments found.' });
});

app.delete('/api/appointments/:id', (req, res) => {
  const { id } = req.params;
  appointments = appointments.filter(app => app.id !== id);
  res.status(204).send();
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
