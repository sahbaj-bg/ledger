const express = require("express");
const router = express.Router();
const sessionMiddleware = require('../authorization/middlewares/session.middleware');

const IndexController = require('../controllers/index.controller');
const LedgerController = require('../controllers/ledger.controller')




router.get('/', [
    sessionMiddleware.validatedSession,
    IndexController.index
]);


// ledger
router.post('/ledger', [
    sessionMiddleware.validatedSession,
    LedgerController.ledger
]);
// balance
router.post('/ledgerBalance', [
    sessionMiddleware.validatedSession,
    LedgerController.ledger_balance
]);

module.exports = router;