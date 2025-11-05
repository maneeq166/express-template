const bcrypt = require("bcrypt");
const { User } = require("../../models/auth")

exports.createUser = async (username,email,password) =>{
    if(!username || !email || !password ){
        return {
            data:null,
            statusCode:400,
            message:"Required fields are missing"
        }
    }

    let user = await User.findOne({email:email})

    if(user){
        return {
            data:null,
            statusCode:400,
            message:"Email already exists"
        }
    }
    
    const hashedPassword = await bcrypt.hash(password,10);

    user = await User.create({username,email,password:hashedPassword});

    return {
        data:user.username,
        statusCode:201,
        message:"Registered Successfully"
    }
}

