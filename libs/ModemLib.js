'use strict'

var Port = require('serial-at');
var modem_config = require('../config/modem');
var account_config = require('../config/account');

const port = new Port(modem_config.com, modem_config.option);
var ussd_code = "";
var need_mvola_pwd = false;

const ModemLib = function() {

	const executeUSSD = function(ussd_type, callback) {

		if (ussd_type == 'mvola_balance') {
			need_mvola_pwd = true;
			ussd_code = '"#111*1*6*1*' + account_config.pwd + '#"';
		}
		else if(ussd_type == 'account_balance') {
			ussd_code = '"#357#"';
		}
		else if(ussd_type == 'forfait_balance') {
			ussd_code = '"#358#"';
		}

		if (need_mvola_pwd && checkMvolPwd(account_config.pwd) == false) {
			console.log("Mvola Password not set");
			return callback({ 'status': 401, 'error': { 'message': 'Please set your Mvola password' } });
		}

		port.open()
		    .then(result => {
		        console.log("Executing AT Command");

		        port.at('AT+CUSD=1, ' + ussd_code + ', 15')
		            .then(result => {
		            	var result	= ModemLib.hexToString(result.split(',')[1].replace(/^"|"$/g, ''));
		                let payload = {
							status: 200,
							success: {
								message: result
							}
						}

						console.log(result);
						return callback(null, payload);
		            })
		            .catch(err => {
		            	let payload = {
							status: 500,
							error: {
								message: "An error has occured when excuting USSD Command. Please try later"
							}
						}
		            	
		            	console.log(`.catch(${err})`);
						return callback(payload);
		            });
		    })
		    .catch(err => {

		    	let payload = {
					status: 302,
					error: {
						message: 'Service permanently unnavaible. Please try later'						
					}
				}
		    	
		    	console.log(`.catch(${err})`);
				return callback(payload);
		    });
	}

	const hexToString = function(hex) {
		return Buffer.from(hex, 'hex').toString('utf8');
	}

	const checkMvolPwd = function(pwd) {
		if (pwd == 'not_set')
			return false;
	}

	return {
		executeUSSD: executeUSSD,
		hexToString: hexToString,
	}
}()

module.exports = ModemLib