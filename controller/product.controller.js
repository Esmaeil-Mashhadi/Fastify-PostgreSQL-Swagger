import { products } from "../db/products.js"

const getOneProduct = async(req ,reply)=>{
        const {id} = req.params
        const product = products.find(item => item.id == id)
        reply.send({product})
    
}

const getAllProducts = async(req, reply)=>{
        reply.send({products , user : req.user.userName})
    
}



export  {getAllProducts , getOneProduct}
