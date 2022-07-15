const axios = require('axios')
const ENVIRONMENT = process.env.ENVIRONMENT;
exports.validatedSession = (req, res, next) => {
 
    // if (ENVIRONMENT == "dev") {
    //     req.tribe_uid = "rangers";
    //     return next();
    // }
    if (req.headers['authorization']) {
        var config = {
            method: 'get',
            url: process.env.SEEK_SESSION_API_URL + "/check",
            headers: {
                'Authorization': req.headers['authorization']
            }
        };
        try {
            axios(config)
                .then(function (response) {
                    // console.log("tribe_data",response.data);
                    if (!response.data.tribe) {
                        return res.json({ statusCode: 400, sid_error: true, error: 'Session verification failed!' });

                        // return res.status(400).send({ error: '' });
                    }
                    else {
                        req.tribe_uid = response.data.uid;
                        return next();
                    }

                })
                .catch(function (error) {
                    console.log(error);
                    return res.json({ statusCode: 400, sid_error: true, error: error });
                    // return res.status(400).send({ error: error });
                });
        } catch (err) {
            return res.json({ statusCode: 400, sid_error: true, error: err.message });
            // return res.status(400).send({ error: err.message });
        }
    } else {
        return res.json({ statusCode: 400, sid_error: true, error: 'Invalid authorization headers!' });
        // return res.status(400).send({ error: 'Invalid authorization headers!' });
    }

};