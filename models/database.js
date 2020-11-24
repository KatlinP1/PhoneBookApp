const mongoose = require('mongoose');
const url = 'mongodb://127.0.0.1:27017/phonebookHome'
mongoose.connect(url, { useNewUrlParser: true })

//database connection- error or okay 
const db = mongoose.connection
db.once('open', _ => {
  console.log('Database connected:', url)
})

db.on('error', err => {
  console.error('connection error:', err)
})