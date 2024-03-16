import { authBodySchema, authLoginBodySchema } from "../schemas.js"


 const authRoutes = (app , options , done)=>{
    app.post("/register" , authBodySchema)
    app.post('/login' , authLoginBodySchema)
    done()
}


export default authRoutes


