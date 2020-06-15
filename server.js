const sslRedirect = require('heroku-ssl-redirect')
const express = require('express')
const port = process.env.PORT || 8080
const app = express()
app.use(sslRedirect())

app.use(express.static(__dirname+'/dist/'))
app.get(/.*/, (req,res) => {
    res.sendfile(__dirname+'/dist/index.html')
})
app.listen(port)

console.log('NorteApp iniciada..')
