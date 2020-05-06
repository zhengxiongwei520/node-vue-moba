const express = require('express')
const path = require('path')
const app = express()

app.set('secret', 'codezheng54288')

app.use(require('cors')())
app.use(express.json())
app.use('/admin/api/upload', express.static(path.join(__dirname, '/uploads')))
app.use('/admin', express.static(path.join(__dirname, '/admin')))
app.use('/web', express.static(path.join(__dirname, '/web')))

require('./routes/admin/index')(app)
require('./routes/web/index')(app)
require('./plugins/db')(app)

app.listen(3000, () => {
  console.log('localhost:3000')
})