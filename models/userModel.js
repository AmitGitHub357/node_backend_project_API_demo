const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const argon2 = require('argon2')

const { Schema } = mongoose
const userSchema = new Schema({
    name : {
        type : String
    },
    password : {
        type : String,
        minlength : 3,
        required : false
       // maxlength : 20
    },
    phoneNumber : {
      type : String,
      minlength : 10,
      maxlength : 10
    },
    email: {
        type: String,
        required: false,
        trim: true,
        index:true,
        unique: true,
        sparse:true, 
      },
      role : {
        type : String,
        enum : ['Admin','Customer','BackendTeam','SalesManager','AccountManager'],
        default : "Customer"
      },
      isAdmin : {
        type : Boolean,
        default : false
      },
      tokens : [
          {
              token : {
                  type : String
              }
          }
      ],
     isActive : {
      type : Boolean,
      default : false
     },
      resetPasswordToken : {
        token :{
            type : String
        } 
      },
      emailVerificationToken : {
        token : {
          type : String
        }
      },
      isEmailVerified : {
        type : Boolean,
        default : false
      },
      
       address : {
          street : {
            type : String
          },
          city : {
            type : String
          },
          state : {
            type : String
          },
          country : {
            type : String
          },
          pincode : {
            type : String
          }
        },
    },{timestamps : true})
userSchema.pre("save", async function(next) {
    let user = this;

   
      //console.log('in pre save of user')
      if (user.isNew) {
        const hash = await argon2.hash(user.password);
        // console.log('hash password',hash)
        user.password = hash
            next();
    } else {
      next();
    }
   
  });
userSchema.statics.findByCredentials = async function(email, password) 
{
    let User = this;
   // console.log('user and password',email,password)
    //'isDeleted' : false
    let userInfo = await User.findOne({'email' : email})
     console.log('user in find by credentials',userInfo)
      if (!userInfo) {
        return Promise.reject({message : "Email does not exist"});
      }
      return argon2.verify(userInfo.password, password).then(function (result) {
        if (result) {
       //   console.log('password matching')
          return Promise.resolve(userInfo);
        } else {
        //  console.log('password not matching')
          return Promise.reject({message : 'Password does not match'});
        }
      });
  };
 
  userSchema.methods.generateToken = function() 
  {
  //  console.log('entered generate token method')
    let user = this;
    let payloadData = {
      userId: this._id,
      email : this.email
    };
    let jwtToken = jwt.sign(payloadData, "supersecret",{expiresIn:'1h'});
   // console.log('jwt token',jwtToken)
    user.tokens.push({ token: jwtToken });
    return user.save().then(function() {
    //  console.log('save user')
      return jwtToken;
    });
  };
  
  userSchema.statics.findByToken = function(token) {
    let User = this;
   // console.log('token in find by token',token)
    let tokenData;
    try {
      tokenData = jwt.verify(token, "supersecret");
     // console.log('token data',tokenData);
    } catch (err) {
      return Promise.reject(err.message);
    }
    return User.findOne({
      _id: tokenData.userId,
      "tokens.token": token
    });
  };
const User = mongoose.model('User',userSchema)
module.exports = User