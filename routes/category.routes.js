import { addCategorySchema, getAllCategorySchema, removeCategorySchema, updateCategorySchema } from "../schemas.js"

 const categoryRoutes = (app , options , done)=>{

     app.post('/create' , addCategorySchema)
     app.get('/list' , getAllCategorySchema)
     app.patch('/update/:id' , updateCategorySchema)
     app.delete("/remove/:id" , removeCategorySchema)
    done()
}


export default categoryRoutes


