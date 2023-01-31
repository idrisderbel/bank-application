
const readline = require("readline");
const {createNewAccount,deposit,withdraw,balance,transfer} = require('./db')
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log("🙏 welcome to banking app 🙏");
console.log("\n 1.creating new account");
console.log("\n 2.Deposit money");
console.log("\n 3.withdraw money");
console.log("\n 4.check balance");
console.log("\n 5.transfert money");
console.log("\n 6.exit");

const ip = (msg) => {
    return new Promise((resolve, reject) => {
        rl.question(`\n 👉 ${msg} `, (ch) => {
            resolve(ch)
        })
    })
}


const start = async () =>{

    while(true)
    {
        const Choice=await ip('Enter your choice')

        if(Choice==1){
        console.log('\n ✅ Create Account')
        const acNm=await ip('Enter Account Name')
        const balance=0;
        createNewAccount(acNm,balance)
        }
        else if(Choice==2){
        console.log('\n ✅ Please Deposit Money')

        const acId=parseInt(await ip('Enter Account Id'))
        const amount=parseFloat(await ip('Enter amount'))

        deposit(acId,amount)
        }
        else if(Choice==3){
        console.log('\n ✅ Please Withdraw Money')

        const acId=parseInt(await ip('Enter Account Id'))
        const amount=parseFloat(await ip('Enter amount'))

        withdraw(acId,amount)
        }
        else if(Choice==4){
        console.log('\n ✅ Please Check Balance')

        const acId=parseInt(await ip('Enter Account Id'))
        balance(acId)
        }
      
        else if(Choice==5){
        console.log('\n ✅ Please Transfert Money')

        const srId=parseInt(await ip(' Enter source Account Id'))
        const destId=parseInt(await ip(' Enter destination Account Id'))
        const amount=parseFloat(await ip('Enter amount'))

        transfer(srId,destId,amount)
        }
        else if(Choice>=6){
        console.log('\n BYE BYE !!!')
        process.exit()
        }
        
    }

}

start()