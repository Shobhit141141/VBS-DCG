const jwt = require('jsonwebtoken');

const token = jwt.sign({name:"AMAN TIWARI", position:"CTO"}, "my custom @ secret key 123")
console.log(token)