const express = require('express');
const app = express();
const service = require('../service/employeeService');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// ------------------------------
// 1️⃣ Add Employee Page (STATIC ROUTE)
// ------------------------------
app.get('/add', (req, res) => {
  res.render('addEmployee');   // <-- Your addEmployee.ejs file
});

// ------------------------------
// 2️⃣ Get All Employees
// ------------------------------
app.get('/', async (req, res) => {
  const employees = await service.getAllEmployees();
  res.render('employees', { employees });
});

// ------------------------------
// 3️⃣ Get Employee By ID (DYNAMIC ROUTE)
// MUST COME AFTER /add
// ------------------------------
app.get('/employees/:id', async (req, res) => {
  const emp = await service.getById(req.params.id);
  res.send(emp);
});


// ------------------------------
// 4️⃣ Delete Employee
// ------------------------------
app.get('/delete/:id', async (req, res) => {
  const delEmp = await service.deleteEmp(req.params.id);

  if (delEmp === 0) {
    return res.status(404).send('Not found');
  }

  res.redirect('/employees');
});

// ------------------------------
// 5️⃣ Add Employee (POST form)
// ------------------------------
app.post('/', async (req, res) => {
  try {
    const employeeData = req.body;

    if (!employeeData.id || !employeeData.name || !employeeData.employee_code || !employeeData.salary) {
      return res.status(400).send("All employee fields are required");
    }

    await service.addEmployee(employeeData);
    res.redirect('/employees');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error adding employee');
  }
});

// ------------------------------
// 6️⃣ Update Employee
// ------------------------------
app.get('/edit/:id', async (req, res) => {
  const emp = await service.getById(req.params.id);
  res.render('updateEmployee', { employee: emp[0] });
});

app.put('/edit/:id', async (req, res) => {
  await service.updateEmployee(req.params.id, req.body);
  res.send("Employee data updated successfully");
});


module.exports = app;
