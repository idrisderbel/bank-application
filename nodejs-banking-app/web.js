var express = require('express');
var app = express();
const {createNewAccount,deposit,withdraw,balance, transfer} = require('./db')

const cors=require('cors')
const port=3100
app.use(cors())


app.post('/create', express.json(), (req, res) => {
    createNewAccount( req.body.acName,req.body.balance , (msg) => {
        res.json({ 'sts' : 'success', msg })
    })
})

app.put('/transfer', express.json() ,(req, res) => {
    transfer(req.body.srcId,req.body.destId,req.body.amount, msg => {
        res.json({ 'sts' : 'success', msg })
    })
})

app.put('/withdraw', express.json(), (req, res) => {
    withdraw(req.body.acId,req.body.amount, msg => {
        res.json({ 'sts' : 'success', msg })
    })
})

app.put( '/deposit', express.json() ,(req, res) => {
    deposit(req.body.acId,req.body.amount, msg => {
        res.json({ 'sts' : 'success', msg })
    })
} )

app.get('/balance/:acId', ( req, res ) => {
    console.log(req.params)
    const acId = req.params.acId
    // balance(acId)
    balance(acId, bal => {
        res.json({ bal })
    })
})

app.listen(port,() => {
    console.log(`Banking app listening on port ${port}`)
})