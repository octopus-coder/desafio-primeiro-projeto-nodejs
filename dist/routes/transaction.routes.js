"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var CreateTransactionService_1 = __importDefault(require("../services/CreateTransactionService"));
var TransactionsRepository_1 = __importDefault(require("../repositories/TransactionsRepository"));
var transactionRouter = express_1.Router();
var transactionsRepository = new TransactionsRepository_1.default();
// GET / transactions: Essa rota deve retornar uma listagem
// com todas as transações que você cadastrou até agora,
// junto com o valor de soma de entradas, retiradas e total de crédito.
// Essa rota deve retornar um objeto com o formato a seguir:
// should be able to list the transactions: Para que esse teste passe, sua aplicação deve permitir que seja retornado um objeto contendo todas as transações junto ao balanço de income, outcome e total das transações que foram criadas até o momento.
transactionRouter.get('/', function (request, response) {
    try {
        // TODO
        var transactions = transactionsRepository.all();
        var balance = transactionsRepository.getBalance();
        return response.json({ transactions: transactions, balance: balance });
    }
    catch (err) {
        return response.status(400).json({ error: err.message });
    }
});
// POST / transactions: A rota deve receber title,
// value e type dentro do corpo da requisição, sendo type o tipo da transação,
// que deve ser income para entradas(depósitos) e outcome para saídas(retiradas).
// Ao cadastrar uma nova transação, ela deve ser armazenada dentro de um objeto
// com o seguinte formato:
// {
//   "id": "uuid",
//   "title": "Salário",
//   "value": 3000,
//   "type": "income"
// }
// should be able to create a new transaction: Para que esse teste passe, sua aplicação deve permitir que uma transação seja criada, e retorne um json com a transação criada.
// should not be able to create outcome transaction without a valid balance: Para que esse teste passe, sua aplicação não deve permitir que uma transação do tipo outcome extrapole o valor total que o usuário tem em caixa, retornando uma resposta com código HTTP 400 e uma mensagem de erro no seguinte formato: { error: string }
transactionRouter.post('/', function (request, response) {
    try {
        var _a = request.body, title = _a.title, value = _a.value, type = _a.type;
        var createTransaction = new CreateTransactionService_1.default(transactionsRepository);
        var transaction = createTransaction.execute({ title: title, value: value, type: type });
        return response.json(transaction);
    }
    catch (err) {
        return response.status(400).json({ error: err.message });
    }
});
exports.default = transactionRouter;
