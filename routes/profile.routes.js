import { ChangeProfileSchema, getProfileSchema } from "../schemas.js"


 const profileRoutes = (app , options , done)=>{

     app.post('/get/:id' , getProfileSchema)
    app.post("/change" , ChangeProfileSchema)
    done()
}


export default profileRoutes


