const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const cors = require('cors')
const port = 3000
const connect = require('./config')


app.use(bodyParser.json({limit: '50mb'}))
app.use(bodyParser.urlencoded({extended: true, limit: '50mb'}))
app.use(cors())


app.get('/user', async (req, res) => {
    const client = await connect()
    const result = await client.query('SELECT * FROM users')
    res.status(200).json(result.rows)
})

app.post('/user', async (req, res) => {
    const client = await connect()
    const { id, name, foto } = req.body
    const result = await client.query('INSERT INTO users (id, name, foto) VALUES ($1, $2, $3)', [id, name, foto])
    res.status(201).send(`User added with ID: ${req.body.id}`)
})


app.get('/post', function (req, res) {
    res.send('Hello World!')
})

app.listen(port, () => {

    console.log(`App running on port ${port}.`)
})



