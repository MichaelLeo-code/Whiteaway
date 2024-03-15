import express, { Request, Response} from 'express'
import http from 'http'
import bodyParser from 'body-parser'
import "reflect-metadata"
// import cookieParser from 'cookie-parser'
// import compression from 'compression'
// import cors from 'cors'

const app = express()
app.use(express.json())

const server = http.createServer(app)

app.get('/', (req, res) => {
    return res.send("hi there")
})

server.listen(8080, () => {
    console.log('Server running on http://localhost:8080/')
})