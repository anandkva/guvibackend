const userModel = require('../model/UserSchema');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

//

/**
 * Author: Anand
 * Description: Create user
 */

const signup = async (req, res) => {
    try {
        var emailExist = await userModel.findOne({ email: req.body.email })
        if (emailExist) {
            return res.status(400).json("Email Already exist")
        }
        if(req.body.password === req.body.cnf_password){
            var hastPassword = await bcrypt.hash(req.body.password, 10)
            var hastCnf_password = await bcrypt.hash(req.body.cnf_password, 10)
            var newUser = new userModel({
                name: req.body.name,
                email: req.body.email,
                password: hastPassword,
                cnf_password: hastCnf_password
            });
            newUser.save((err, data) => {
                if (!err) {
                    res.send(data)
                } else {
                    console.log(err)
                }
            })
        }else{
            return res.status(400).json("Password and Confirm password Mismatch")
        }
        
    } catch (err) {
        res.status(400).json(err)
    }
}

/**
 * Author: Anand
 * Description: Authentication middleware
 */

const middleAuth = (req, res, next) =>{
    var token = req.header('auth');
    req.header = token;
    next();
}

/**
 * Author: Anand
 * Description: Login user
 */
const signin = async (req, res) => {
    try {
        var userData = await userModel.findOne({ email: req.body.email })
        if (!userData) {
            return res.status(400).json("User Not Exist")
        }
        var validPassword = await bcrypt.compare(req.body.password, userData.password)
        if (!validPassword) {
            return res.status(400).json("Invalid Password")
        }
        var userToken = jwt.sign({ email: userData.email }, "secretkey");
        res.header('auth', userToken).json(userToken)
    } catch (err) {
        res.status(400).json(err)
    }
}

const getuser = (req, res) => {
    userModel.find((err, data) => {
        if (err) {
            console.log(err);
        }
        else {
            res.send(data);
        }
    });
}
const getuserID = (req, res) =>{
    var userID = req.params.userID;
    userModel.findById(userID, (err,data)=>{
        if(!err){
            res.send(data)
        }else{
            res.status(400).json(err)
        }
    })
}


const filteruser = (req, res) => {
    userModel.aggregate([{ "$group": { _id: "$name" } }, { "$sort": { _id: 1 } }])
        .exec((err, data) => {
            if (err) {
                console.log(err);
            }
            else {
                res.send(data);
            }
        })
}
const filtername = (req, res) => {
    var newuser = new userModel();
    newuser.name = req.body.name
    userModel.aggregate([{ "$match": { name: newuser.name } }])
        .exec((err, data) => {
            if (err) {
                console.log(err);
            }
            else {
                res.send(data);
            }
        })
}
const filtersum = (req, res) => {
    userModel.aggregate([{ "$group": { _id: "$name", total: { $sum: 1 } } }])
        .exec((err, data) => {
            if (err) {
                console.log(err);
            }
            else {
                res.send(data);
            }
        })
}

module.exports = {
    signup,
    signin,
    middleAuth,
    getuser,
    getuserID,
    filteruser,
    filtername,
    filtersum
}
