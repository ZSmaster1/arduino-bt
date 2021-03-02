# Installation
```
npm install arduino-bt
```

# Example usage
## nodeJS (.js)
```js
const arduino_bt = require('arduino-bt');
const arduino = new arduino_bt('hc-05');

//connect to the arduino
arduino.setup();

//send data to the arduino
arduino.send('1');

//receive data from the arduino
arduino.onDataReceive((data) => {
    console.log(data);
})
```

## Arduino (.ino)
### Connections / Wiring

<img src="https://hackster.imgix.net/uploads/attachments/814074/bluetooth_wiring_3AMdqqHtL8.png?auto=compress%2Cformat&w=680&h=510&fit=max" />

### Code
```cpp
#include <SoftwareSerial.h>

SoftwareSerial BTserial(10, 11);

void setup() {
    BTserial.begin(9600);
}

void loop() {
    //send data to the nodeJS server
    BTserial.print('1');

    //read the sent data from the nodeJS server
    String data = BTserial.readStringUntil('\n');
}
```