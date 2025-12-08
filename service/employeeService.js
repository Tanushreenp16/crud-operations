const db=require('../db')

module.exports.getAllEmployees=async()=>{
    const [row] = await db.query("select * from employees")
    .catch(err=> console.log(err))
    return row;
}

module.exports.getById=async(id)=>{
    const [record]=await db.execute('Select * from employees where id=?',[id])
    return record;
}

module.exports.deleteEmp=async(id)=>{
    const [delRow]=await db.execute('delete from employees where id=?',[id])
    return delRow;
}

// module.exports.addEmployee = async (obj) => {
//     const [addRows] = await db.query("insert into employees (id, name, employee_code, salary) values(?,?,?,?)",
//         [obj.id, obj.name, obj.employee_code, obj.salary]);
//     return addRows;
// }

module.exports.addEmployee = async (obj) => {
  // Validate input object
  if (!obj || !obj.id || !obj.name || !obj.employee_code || !obj.salary) {
    throw new Error("Incomplete employee data");
  }

  const [result] = await db.execute(
    "INSERT INTO employees (id, name, employee_code, salary) VALUES (?, ?, ?, ?)",
    [obj.id, obj.name, obj.employee_code, obj.salary]
  );

  return result.insertId;
}

module.exports.updateEmployee = async (id, data) => {
    const [updatedRow] = await db.execute(
        "UPDATE employees SET name = ?, employee_code = ?, salary = ? WHERE id = ?",
        [data.name, data.employee_code, data.salary, id]
    );
    return updatedRow.affectedRows;
};


