##Quick Reference 

1. Install node
2. Install dependencies - `$ npm intall`
3. Navigate to main folder, then `$ node main.js`

##Notes

a. Credit to: [shanetully.com](https://shanetully.com/2014/09/a-dead-simple-webrtc-example/) 

b. How to get a third party signed certificate:
[AWS Security](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/SSL-on-an-instance.html#ssl_certificate) 

c. Personal AWS Certificates have been removed for security, using the self-signed certs from shanetully.com. Please note that when using self-signed certificates a warning may appear, and I've had problems getting 'wss' to work without getting my own cert.

####Public ICE servers used (may need updating in future): 

    var peerConnectionConfig = { 
    'iceServers': [
        {'urls': 'stun:stun.stunprotocol.org:3478'},
        {'urls': 'stun:stun.l.google.com:19302'},
     ]
    };
