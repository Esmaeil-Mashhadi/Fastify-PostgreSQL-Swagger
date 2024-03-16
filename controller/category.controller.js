import { Category } from "../model/categoryModel.js"

const createCategory = async(req , reply)=>{
    const {name , parentID} = req.body
    const category = await Category.findOne({where : {name}})
    if(category) return reply.send("this category already exist ")
     await Category.create({name , parentID})
    reply.status(201).send('category created successfully')
}

const getAllCategories = async(req , reply )=>{
    const categories = await Category.findAll({
        where : {parentID : null},
        include :[
            {
                 model :Category,
                 as:"children"
            }
        ], 
    });
    reply.status(200).send({categories})
}


const getOneCategory = async(req,  reply )=>{
 const {id} = req.params
 const category = await Category.findOne({id})
 if(category) reply.status(404).send("couldn't find the category")
 reply.send(category)
}

const updateCategory = async (req , reply)=>{
    const {id } = req.params
    const category = await Category.findOne({where :{id}})
    if(!category) reply.send("there is not category with id of" + id)
    const {name} = req.body
     category.setDataValue('name' , name)
     category.save() // by setting raw true , we make data plain object and in this case we wont have access to the functions available on them
    reply.send('category updated')

//     const { id } = req.params;
//   const { name } = req.body;

//   const [rowsUpdated] = await Category.update(
//     { name },
//     { where: { id }}
//   );                                                     ...> second  way to update

//   if (rowsUpdated === 0) {
//     return reply.send("There is no category with an ID of " + id);
//   }

//   reply.send('Category updated');
}


const removeCategory = async (req, reply)=>{
    const {id}  = req.params
    const result = await Category.destroy({where:{id}})
    if(!result) reply.send("there is no category to remove")
    reply.send("category deleted successfully")
}

export {createCategory , getAllCategories , getOneCategory , updateCategory , removeCategory}