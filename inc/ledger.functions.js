const { db } = require("../db");
const fs = require('fs');

const ENVIRONMENT = process.env.ENVIRONMENT;

const ledger_table = 'ledger';

var Ledger = {

    save_ledger: function (arg) {
        return new Promise((resolve, reject) => {
            db.query(
                `INSERT INTO ${ledger_table} (uid, credit, debit, payload)
                VALUES($1, $2, $3, $4)`,
                [arg.uid, arg.credit, arg.debit, JSON.stringify(arg.payload)],
                (err, result) => {
                    if (err) {
                        reject(err);
                    }
                    resolve(result);
                }
            );
        });
    },
    balance: function (uid) {
        return new Promise((resolve, reject) => {
            console.log(uid);
            db.query(
                `SELECT SUM(credit) AS total_credit, SUM(debit) AS total_debit  FROM ${ledger_table} WHERE uid=$1`,
                [uid],
                (err, result) => {
                    if (err) {
                        reject(err);
                    }
                    // console.log(result);
                    var balance = result.rows[0].total_credit - result.rows[0].total_debit;
                    resolve(balance);
                }
            );
        });
    },
    
}

module.exports = { Ledger };

