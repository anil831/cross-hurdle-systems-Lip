const User=require('../models/users');
const jwt = require("jsonwebtoken");

const signup=(req,res,next)=>{

    User.findOne({email:req.body.email}).then((response)=>{
        if(response){
           res.status(409).send("email already exist");
        }
        else{
            let newUser=new User({
                email:req.body.email,
                password:req.body.password
            });
            newUser.save().then((response)=>{
                let payload = { subject: response._id };
                let token = jwt.sign(payload, "secretKey");
                res.status(200).send({token});
            }).catch(err=>{
              res.send(err) 
            });
        }
        
    }).catch((error)=>{
        console.log(error)
    });

}

const login=(req, res,next) => {

    User.findOne({email:req.body.email}).then(user=>{
        if(!user){
           
            res.status(401).send("Invalid email");

        }
        else {
            if (user.password !==req.body.password) {
                res.status(401).send("Invalid Password");
              }
              else{
                let payload = { subject: user._id };
                let token = jwt.sign(payload, "secretKey");
                res.status(200).send({token});
                
              }
        
        }
    }).catch(err=>{
           res.send(err);
    })

  };

module.exports={signup,login}