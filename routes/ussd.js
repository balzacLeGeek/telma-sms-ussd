'use strict'

var express = require('express');
var router = express.Router();
var ModemLib = require('../libs/ModemLib');

router.route('/check')
	.get(function(req, res) {

		let type = req.query.type || 'mvola_balance';

		ModemLib.executeUSSD(type, (err, result) => {
			if (err)
				return res.status(err.status).send(err)

			return res.status(result.status).send(result)
		});
	})

module.exports = router;