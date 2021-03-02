const BTSerialPort = require('bluetooth-serial-port');
const btSerial = new BTSerialPort.BluetoothSerialPort();

class Arduino {

    constructor(bluetooth_module_name) {
        this.dname = bluetooth_module_name.toLowerCase();
    }

    setup() {
        btSerial.on('found', function(address, name) {
  
            if(name.toLowerCase().includes(this.dname)){
        
                console.log('connected to: ', name);
        
                btSerial.findSerialPortChannel(address, function(channel) {
        
                    console.log('found port channel');
        
                    btSerial.connect(address, channel, function() {
                        console.log('Connected');                    
                    }, errFunction);
                }, errFunction);
            }
        });
        
        btSerial.inquire();

        return this;
    }

    send(data) {
        btSerial.write(Buffer.from(`${data}`), errFunction);

        return this;
    }

    onDataReceive(callback) {
        btSerial.on('data', function(bufferData) {
            const data = Buffer.from(bufferData).toString();
            callback(data);  
        });
    }
}

module.exports = Arduino;