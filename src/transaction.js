class Transactions {
  transactions = [];

  constructor() {// init transaction from user 
    this.transactions[
      ({
        type: "income",
        category: "salary",
        amount: 10000,
      },
      {
        type: "expense",
        category: "shopping",
        amount: 4000,
      })
    ];
  }

  getTransactions() { //getTransaction
	  return this.transactions
  }

  getTransaction(idx) { // getTransaction from index
	  return this.transactions[idx]

  }

  createTransaction(type, category, amount) { // create Transaction
	  const newTransaction = { //init newTransaction from user
		  type,
		  category,
		  amount
	  }

	  this.transactions.push(newTransaction) //push newTransaction to transaction
	  return newTransaction 
  }

  updateTransaction(idx, transaction) { //update follow index
	  this.transactions[idx] = transaction
	  return this.transactions[idx]
  }

  deleteTransaction(delIdx) { //delete follow index
	  this.transactions = this.transactions.filter((data, idx) => {
		  idx !== Number(delIdx) 
	  })
	  return true
  }
}

//new Class alway new Transaction from user
const TransactionData = new Transactions()

module.exports = {
	TransactionData
}