const mongoose = require('mongoose')
const url = process.env.MONGODB_URI || 'mongodb://localhost:27017/cmef'
module.exports = (() => {
    mongoose.connect(url, { useNewUrlParser: true })
    mongoose.set('useCreateIndex', true)
    const db = mongoose.connection
    db.on('error', (err) => {
        console.log('Mongo connection error ', err)
    })
    db.once('open', () => {
        db.db.stats(function(err, stats) {
            console.log(`We are connected on port:${db.port} to database:${db.name}`)
        });
    })
})()