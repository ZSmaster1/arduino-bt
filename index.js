const BTSerialPort = require('bluetooth-serial-port');
const btSerial = new BTSerialPort.BluetoothSerialPort();

const errFunction = (err) => {
    if(err) {
        console.log(err);
    }
}

class Arduino {

    /**
     * @param { String } bluetooth_module_name - The bluetooth module device name
     */
    constructor(bluetooth_module_name) {
        this.device_name = bluetooth_module_name;
    }

    setup() {
        const dname = this.device_name;
        btSerial.on('found', function(address, name) {
  
            if(name === dname) {
        
                console.log('connected to: ', dname);
        
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
    /**
     * @param { String } data the data that is going to be sent to the arduino 
     */
    send(data) {
        btSerial.write(Buffer.from(`${data}`), errFunction);

        return this;
    }

    /**
     * @callback that the arduino sent 
     */
    onDataReceive(callback) {
        btSerial.on('data', function(bufferData) {
            const data = Buffer.from(bufferData).toString('utf-8');
            callback(data);  
        });
    }
}

module.exports = Arduino;