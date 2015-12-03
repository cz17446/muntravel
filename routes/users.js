var express = require('express');
var router = express.Router();

function usersFunc(req, res, next) {
    res.send('respond with a resource o yeah!');
}

/* GET users listing. */
router.get('/', usersFunc);

module.exports = router;
