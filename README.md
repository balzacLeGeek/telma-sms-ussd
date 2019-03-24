# Description

Very simple application to send USSD from HTTP using Telma Madagascar, Modem (or Phone) and NodeJs.

It uses [serial-at](https://github.com/kolonist/serial-at) node package and could be used in with linux and windows.

# Installation

This project is not (yet) a node package so you must clone the repository:
```bash
git clone https://github.com/balzacLeGeek/telma-sms-ussd.git
```

Plug in your modem (+ Telma Madagascar SIM Card) and if you are in Windows, run this command to check the used port

```bash
mode
```

This command should show something like this (The port can be COM1 .... COMXX)

```bash
Statut du périphérique COM16:
-----------------------------
    Baud :            115200
    Parité :          None
    Bits de données : 8
    Bits d’arrêt :    1
    Temporisation :   OFF
    XON/XOFF :        OFF
    Protocole CTS :   OFF
    Protocole DSR :   OFF
    Sensibilité DSR : OFF
    Circuit DTR :     OFF
    Circuit RTS :     OFF


Statut du périphérique COM15:
-----------------------------
    Baud :            115200
    Parité :          None
    Bits de données : 8
    Bits d’arrêt :    1
    Temporisation :   OFF
    XON/XOFF :        OFF
    Protocole CTS :   OFF
    Protocole DSR :   OFF
    Sensibilité DSR : OFF
    Circuit DTR :     OFF
    Circuit RTS :     OFF


Statut du périphérique CON:
---------------------------
    Lignes :          1000
    Colonnes :        92
    Vitesse clavier : 31
    Délai clavier :   1
    Page de codes :   850
```

# Configuration

Before running the app, there are some configurations

### /config/modem.js

```JavaScript
/*
	(string) com: 'COMx' (Windows), '/dev/ttyUSBx' (Linux)
	(array) options: { read_time : 'Max timeout for wait AT Command response' }
*/
module.exports = {
	com : 'COM3',
	option: {
		read_time: 10000
	}
}
```

### /config/account.js

```JavaScript
// (4 int) pwd : Your Mvola Password
module.exports = {
	pwd : 'not_set'
}
```

In case your want to check your Mvola account balance for example, your must provide your `Mvola password` so change `pwd` value

# Usage

To run the application, just start node serve

```bash
npm start
```

# API Routes (Avaible for this version)
- [Mvola balance](#mvola-balance)
- [Account balance](#account-balance)
- [Forfait balance](#forfait-balance)

## `Mvola balance`
GET method to `http://127.0.0.1:1503/api/ussd/check?type=mvola_balance`.

## `Account balance`
GET method to `http://127.0.0.1:1503/api/ussd/check?type=account_balance`.

## `Forfait balance`
GET method to `http://127.0.0.1:1503/api/ussd/check?type=forfait_balance`.

### API Response
- [Error](#error)
- [Success](#success)

## `Error`

```JavaScript
{
	"status": "RESPONSE_STATUS",
	"error": {
		"message": "RESPONSE_MESSAGE"
	}
}
```
## `Success`

```JavaScript
{
	"status": "RESPONSE_STATUS",
	"success": {
		"message": "RESPONSE_MESSAGE"
	}
}
```

***

@author RAZAFIMANDIMBY Niaina Michaël (balzacLeGeek) 

[b-project Antananarivo](https://b-project.mg) [Geek inside Madagascar](https://geek-inside.mg)

<michaniainar@gmail.com>
