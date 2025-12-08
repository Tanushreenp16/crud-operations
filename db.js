const mysql=require('mysql2/promise');

const mysqlPool=mysql.createPool({
    host:'localhost',
    user:'root',
    password:'Tanu@123',
    database:'employee_db',
});

// mysqlPool.query("Select 1")
// .then(()=>console.log("Data successfully loaded"))
// .catch(error=>console.log("Error occured"))
module.exports=mysqlPool;