const express = require('express')
const apiRouter  = express.Router()

// require Transaction
const {TransactionData} = require('./transaction')
const {Transaction} = require('./model/transactionModel')

//middleware
const loggerMiddleware = (req, res,  next) => {
	console.log(req.method, req.url)
	console.log(req.body) // from user
	next()
}
// req check amount from user
const enhanceReq = (req, res,  next) => {
	if(req?.body?.amount) { // check amount is true 
		req.userAmount = req?.body?.amount // get amount from transaction user request to variable userAmount
	}
	next()
}
// apply middleware
apiRouter.use(loggerMiddleware)
// show Transaction
apiRouter.get('/transactions', async(req, res) => {
	const filter = req.query
	const transactions = await Transaction.find(filter).exec()
	res.json({
		transactions
	})

})

// get Transaction follow id
apiRouter.get('/transaction/:id',async (req,res) => {
	const id  = req.params.id //req from user
	const transaction = await Transaction.findById(id).exec()
	//compare to javascript object
	res.json({
		transaction
	})
})

// show transaction and handle request follow user
apiRouter.post('/transaction', [enhanceReq], async(req, res) => {
	const data = req.body
	const newTransaction = new Transaction(data) // transaction from user

	await newTransaction.save()

	res.json({
		newTransaction
	})
})
// updateReplace old Transaction
apiRouter.put('/transaction/:id', async(req, res) => {
	const newTransaction = req.body // req from user
	// new Transaction follow id and send  old transaction 
	const updateData = await Transaction.updateOne(
		{_id: req.params.id},
		newTransaction
	).exec()

	res.json({
		updateData
	})
})
// delete transaction follow id and delete is oneTime not manyTime 
apiRouter.delete('/transaction/:id', async(req, res) => {
	const deleteFromRespone = await  Transaction.deleteOne({_id: req.params.id})
	res.json({
		deleteFromRespone
	})

})

apiRouter.get('/earth', (req, res) => {
	res.send('GET API SUCCESS')
})
// use Handle Request
apiRouter.use(enhanceReq)

//export
module.exports = {apiRouter}