
   
var sql = require("mssql");

    // config for your database
    var config = {
        user: 'sa',
        password: 'gofore4fgH',
        server: 'localhost', 
        database: 'BankingDb' ,
        options: {
    trustServerCertificate: true
  }
    };

    // connect to your database
    sql.connect(config, function (err) {
    
        if (err) console.log(err);

        // create Request object
        var request = new sql.Request();
           
        // query to the database and get the records
        request.query('select * from account', function (err, recordset) {
            
            if (err){
            console.log(`\n ❌ Error in connectivity`)
            return
            } 
       
            console.log(`\n ✅ Connected succesfuly`)
            // send records as a response
            // createNewAccount("pqr",0)
            // transfer(1,2,370)
            // console.log(recordset)
            
        });
    });

//Crud Operations
const createNewAccount = (acName,balance, onCreate = undefined) =>{
    sql.query(`insert into account(ac_nm,balance) values ('${acName}',${balance})`,(err,res)=>{
        if(err) console.log(`\n ❌ Problem in creating the account`,err.message)
        else 
        {
            console.log(`\n ✅ New Account created succesfully`)
            if(onCreate) onCreate(`✅ New Customer Created Successfully`)

        }
})

} 

const withdraw = (acId,amount, onWithdraw = undefined) =>{
    sql.query(`select balance from account where ac_id=${acId}`,(err,res)=>{
    if(err) console.log('\n ❌ Problem in Withdrawing')
    else
        {
            const newBalance =parseFloat(res.recordset[0].balance-amount)
            sql.query(`update account set balance=${newBalance} where ac_id=${acId}`,(err,res)=>{
            if(err) console.log('\n ❌ Problem in Withdrawing')
            else
            {
                console.log(`\n ✅ Amount ${amount} Withdrawal Succesfully`)
                if(onWithdraw) onWithdraw(`✅ Amount ${amount} Withdraw Successfully`)
            } 
        })
        }
    })
} 

const deposit = (acId,amount, onDeposit = undefined) =>{
    sql.query(`select balance from account where ac_id=${acId}`,(err,res)=>{
    if(err) console.log('\n ❌ Problem in Depositing',err.message)
    else
    {
        const newBalance =parseFloat(res.recordset[0].balance+amount)
        sql.query(`update account set balance=${newBalance} where ac_id=${acId}`,(err,res)=>{
            if(err) console.log('\n ❌ Problem in Depositing')
            else 
            {
                console.log(`\n ✅ Amount ${amount} Deposited Succesfully`)
                if(onDeposit) onDeposit(`✅ Amount ${amount} Deposited Successfully`)
            }
        })
    }
        
    })
} 

const transfer = (srcId,destId,amount, onTransfer = undefined) =>{
    // sql.query(`select balance from account where ac_id=${srcId}`,(err,res)=>{
    //     const srcBal =parseFloat(res.recordset[0].balance)
    //     sql.query(`select balance from account where ac_id=${destId}`,(err,res)=>{
    //         const srcBal =parseFloat(res.recordset[0].balance)
        
       
    // })
       
    // })
    withdraw(srcId,amount)
        deposit(destId,amount)
         if(onTransfer) onTransfer( `✅ Amount ${amount} Transferred Successfully` )
        
    
} 

const balance = (acId,onBalance=undefined) =>{
sql.query(`select balance from account where ac_id=${acId}`,(err,res)=>{
    if(err) console.log('\n ❌ Problem in Fetching the balance')
    else
        {
            const balance =parseFloat(res.recordset[0].balance)
            console.log(`\n 💰 Your Account Balance is: ${balance}`)
            if(onBalance)
            onBalance(balance)
            
        }
    })
    
}
module.exports={
    createNewAccount,deposit,withdraw,transfer,balance
}

