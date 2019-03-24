/*
	(string) com: 'COMx' (Windows), '/dev/ttyUSBx' (Linux)
	(array) options: { read_time : 'Max timeout for wait AT Command response' }
*/
module.exports = {
	com : 'COM3',
	option: {
		read_time: 10000,
	}
}
