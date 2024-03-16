import { User, UserDetail } from "../model/userModel.js"

export const changeProfile = async(req , reply)=>{
  const data   = req.body ;
   const userDetail = await UserDetail.findOne({where : {id : +req.user.id}})

   if(userDetail){
    for (const key in data) {
        if(data[key]){
            userDetail.setDataValue(key , data[key])
        }
    }
   }else{
        Object.assign(data , {UserId : req.user.id})
         await UserDetail.create(data)
   }

   return reply.status(200).send({message : "user detail updated"})
 
}


export const getProfile = async (req, reply) => {

    const user = await User.findOne({
        where : {id : req.user.id},
        include : [
            {
                model : UserDetail, 
                as :"UserDetail",
                attributes : ['latitudes' , 'longitudes' , 'address']
            }
        ]
    })
    return reply.status(200).send({user: user.toJSON()})
}