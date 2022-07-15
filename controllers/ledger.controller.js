const { Ledger } = require("../inc/ledger.functions");

exports.ledger = async (req, res) => {
    try {

        if (req.body.splits == undefined && req.body.debit == undefined) {
            return res.json({ statusCode: 200, message: "Invalid payload." });
        }

        if (req.body.transaction == undefined || req.body.transaction.meta == undefined) {
            return res.json({ statusCode: 200, message: "Invalid payload." });
        }

        var amount = req.body.transaction.meta.amount;

        if (req.body.splits != undefined) {
            var splits = req.body.splits;
            // console.log(Object.keys(splits).length);
            for (var key in splits) {
                console.log(key + ": " + splits[key]);
                var arg = {
                    "credit": (amount * splits[key]) / 100,
                    debit: 0,
                    "uid": req.body.uid,
                    "payload": req.body
                };
            }

        }

        if (req.body.debit != undefined) {
            var debit = req.body.debit;
            var arg = {
                "credit": 0,
                debit: amount,
                "uid": debit,
                "payload": req.body
            };
        }
        var save_ledger = await Ledger.save_ledger(arg);
        if (save_ledger.rowCount > 0) {
            return res.json({ statusCode: 200, message: "Ledger saved successfully." });

        } else {
            return res.json({ statusCode: 200, message: "Ledger data has not saved successfully." });
        }
    } catch (err) {
        console.log("ledger error", err);
        return res.json({ statusCode: 400, error: err.message });
    }

}

exports.ledger_balance = async (req, res) => {

    try {

        if (req.body.uid == undefined) {
            return res.json({ statusCode: 200, message: "Invalid payload." });
        }

        var balance = await Ledger.balance(req.body.uid);
        // console.log(balance);
        return res.json({ statusCode: 200, data: balance.toFixed(2) });
    } catch (err) {
        console.log("ledger_balance error", err);
        return res.json({ statusCode: 400, error: err.message });
    }

}

