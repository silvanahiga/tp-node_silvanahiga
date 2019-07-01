const express = require('express');
const cors = require('cors')
const app = express()

app.use(cors());
app.use(express.json()) 
const router = require('./router')


app.use('/', router); 



app.listen(3007)