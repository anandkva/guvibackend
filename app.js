const express = require('express');
const cors = require('cors')
const morgan = require('morgan')
const app = express();
const port = process.env.PORT || 3030;
const db = require('./database')
const userRouter = require('./router/user.routes')
const WelcomeRouter = require('./router/welcome.route')
const googleSheetsRouter = require('./router/api.router')


app.use(cors());
app.use(morgan('dev'))
app.use(express.urlencoded({ extended: false }))
app.use(express.json());
app.use('/api', userRouter)
app.use('/api', googleSheetsRouter)
app.use('/', WelcomeRouter)


app.listen(port, (err)=>{
    if(!err){
        console.log(`Port Running ${port}`)
    }else{
        console.log("Error: ", err)
    }
})

db.dbConnection();   