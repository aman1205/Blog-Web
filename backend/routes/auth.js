const express = require('express')
const router = require('express').Router()
const bodyParser = require('body-parser');
const jwt = require('jwt-simple');
const User = require('../model/user')
const bcrypt = require('bcrypt')


const app = express()
app.use(bodyParser.json());

const secret = 'mynameisamankumarandmychannelnameisroyalgaming';

router.post('/register', async (req, res) => {
    try {
        const pass = String(req.body.password)
        const hashPassword = await bcrypt.hash(pass, 10);
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashPassword
        });
        // const { email, password } = req.body;
        // if (!email || !password) {
        //   res.status(400).json({ error: 'Email and password are required' });
        // }

        // const existingUser = await User.find((user) => user.email === email);
        // if (existingUser) {
        //   res.status(409).json({ error: 'Email already in use' });
        // }

        // const id = User.length + 1;
        // const id = "6454e39ae6c4bd22cfa467be";
        // const user = { id, newUser.email };
        // User.push(newUser);

        const user = await newUser.save();
        // console.log(user.email)
        // Generate a JWT token for the new user
        // const token = jwt.encode({ id },secret );
        // console.log(token)
        // Return the token to the client
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json(error)
        console.log(error)
    }
});


//Login

router.post('/login', async (req, res) => {
    try {
        const email = req.body.email;
        const password  = req.body.password;
        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password are required' });
        }
        const user= await User.findOne({email:req.body.email})
        !user && res.status(400).json("Wrong Credentails")

        const validate =await bcrypt.compare(req.body.password,user.password)
        !validate && res.status(400).json("Wrong Credentails")
        
        // const user = await User.findOne((user) => user.email === email &&bcrypt.compare(password ,user.password));
        // if (!user) {
        //     return res.status(401).json({ error: 'Invalid email or password' });}
          res.status(200).json("Login Complete");
        

        // Generate a JWT token for the user
        // const token = jwt.encode({ id: user.id }, secret);

        // Return the token to the client
        
        
    } catch (error) {
            res.status(500).json(error)
    }
})


module.exports = router

