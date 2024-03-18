var express = require('express');

var api = express.Router()
var transactionController = require('../controllers/transaction');

api.post('/transaction', transactionController.createTransaction)
api.get('/movements/:id?', transactionController.getMovements)

module.exports = api;

