const express = require('express')
const app = express()
var cors = require('cors')


app.use(cors())

app.get('/', (re,res)=>{
    res.send('route is set')
})

const PORT = 3000
app.listen(PORT, ()=> {
    console.log(`Server is ruuning at port ${PORT}`)
})