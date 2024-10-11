// const express = require('express');
// const bodyParser = require('body-parser');
// const cors = require('cors');

// const app = express();
// const PORT = process.env.PORT || 3000;

// app.use(cors());
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

// app.post('/api/appointments', (req, res) => {
//   const { name, email_address, phone, category } = req.body;
//   // Here, you would typically save this data to a database.
//   console.log('Appointment received:', req.body);
  
//   // Send a response back to the client
//   res.status(201).send({ message: 'Appointment scheduled successfully!' });
// });

// app.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });