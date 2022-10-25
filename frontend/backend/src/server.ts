import express, { Router } from 'express'
import cors from 'cors'
import { sample_foods, sample_tags, sample_users } from './data'
import jwt from 'jsonwebtoken'
import foodRouter from './routers/food.router'
const app = express()
app.use(express.json())
// use cors so that localhost 4200 can have a request on this server
app.use(cors({
    credentials:true,
    origin:['http://localhost:4200']
}))
// express will send the api to foodRouter
app.use('/api/foods', foodRouter)
// the lines below is called Destructuring Assignment
app.post('/api/users/login', (req, res) => {
    const {email, password} = req.body
    const user = sample_users.find(user => user.email === email &&
        user.password === password)

        if(user) {
            res.send(generateTokenResponse(user))
        } else {
            res.status(400).send('User name or password is not valid')
        }
})

const generateTokenResponse = (user:any) => {
    const token = jwt.sign ({
        email:user.email, isAdmin:user.isAdmin
        // this private key needs to be kept secret in .env
        // this token that will be generated with this function will be expired in 30 days 
    }, 'SomeRandomText', {
        expiresIn: '30d'
    })
    
    user.token = token
    return user 
}

const port = 3000
app.listen(port, () => {
    console.log('Website served on http://localhost:' + port);
    
})

