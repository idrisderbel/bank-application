const readline = require("readline");
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

const ip = () => {
    return new Promise((resolve, reject) => {
        rl.question('\n 👉 Enter Your Choice : ', (ch) => {
            resolve(ch)
        })
    })
}


const start = async () => {
    while(true) {
        const choice = await ip()

        if(choice == 1) {
            console.log(`✅ Create Account`)
        }
        else if (choice == 2) {
            console.log(`✅ Please Deposit Money`)
        }
        else if(choice == 3) {
            console.log(`✅ Please Withdraw Money`)
        }
        else if(choice == 4) {
            console.log(`✅ Please Check Balance`)
        }
        else if(choice == 5) {
            console.log(`✅ Please Transfer Money`)
        }
        else {
            console.log(`Bye Bye`)
            process.exit()
        }
    }
}

start()