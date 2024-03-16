import { User } from "../model/userModel.js";
import { app } from "../server.js";

export const getUserMiddleware = ( req , reply , next)=>{
    const authorizationToken = req?.headers?.authorization;
    if(!authorizationToken) return reply.status(401).send({message:"first register"})
    const [bearer , token] = authorizationToken.toString().split(' ')
    if(bearer && bearer.toLowerCase() == "bearer"){
       const result = app.jwt.verify(token)
       if(typeof(result) == "string") return reply.send(result)
       const {userName} = result;
        User.findOne({where :{userName}}).then(data =>{
          req.user = data.dataValues
            next()

        }).catch(err => console.log(err))
    }else{
        reply.status(401).send({message : "authorization token is not valid"})
    }

}

 