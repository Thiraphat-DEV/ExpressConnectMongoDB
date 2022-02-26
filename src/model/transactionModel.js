const mongo = require('mongoose')

const transactionModel = new mongo.Schema({

	type: {
		type: String,
		required: true,
	},
	category: {
		type: String,
		default: 'Shop'
	},
	date: {
		type: Date, 
		default: new Date()

	}
})

const Transaction = mongo.model('transaction', transactionModel)

module.exports = {Transaction}