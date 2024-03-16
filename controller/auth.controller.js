import { User } from "../model/userModel.js"
import { app } from "../server.js"

const register = async(req, reply)=>{
    const {userName, lastName , firstName, password} = req.body
    const newUser = new User({ 
        firstName , lastName , userName ,  password : await app.bcrypt.hash(password) 
    })
    newUser.save()
    reply.send({status:201 , message:"created" , newUser})
 
}

const login = async (req,  reply)=>{
    const {userName , password} = req.body
    const user = await User.findOne({
        where:{userName}
    })
    if(!user) throw new Error("couldn't find the user")
    const compareResult = await app.bcrypt.compare(password , user.password)
    if(!compareResult) throw new Error("user or pass is not correct")
    const token = app.jwt.sign({userName} , {expiresIn:"1w"})
    user.setDataValue('token' , token )
    await user.save()
    reply.send({message :"success" ,  user})
}


 
export {register , login}