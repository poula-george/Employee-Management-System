const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 8080;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// MongoDB connection
mongoose.connect('mongodb://127.0.0.1:27017/dataset', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Employee Schema
const employeeSchema = new mongoose.Schema({
  id: Number,
  name: String,
  email: String,
  salary: Number,
});

const Employee = mongoose.model('Employee', employeeSchema);

// Add Employee
app.post('/emp/addEmployee', async (req, res) => {
  const emp = new Employee(req.body);
  try {
    await emp.save();
    res.status(201).send(emp);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Get All Employees
app.get('/emp/getAll', async (req, res) => {
  try {
    const employees = await Employee.find();
    res.status(200).send(employees);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Update Employee
app.put('/emp/updateEmployee', async (req, res) => {
  try {
    const emp = await Employee.findByIdAndUpdate(req.body.id, req.body, { new: true });
    if (!emp) {
      return res.status(404).send();
    }
    res.send(emp);
  } catch (error) {
    res.status(400).send(error);
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
