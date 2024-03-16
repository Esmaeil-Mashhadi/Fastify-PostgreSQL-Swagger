import { login, register } from "./controller/auth.controller.js"
import { createCategory, getAllCategories, removeCategory, updateCategory } from "./controller/category.controller.js"
import {getAllProducts, getOneProduct} from "./controller/product.controller.js"
import { changeProfile, getProfile } from "./controller/user.controller.js"
import { getUserMiddleware } from "./middlewares/getUser.js"

const product = {
        type:"object",
        properties : {
            id: {type:'integer'},
            name:{type:"string"}
        } 
}


const user = {
    type : "object",
    properties : {
        id : {type:"string"},
        firstName : {type:"string"},
        lastName : {type:"string"},
        userName : {type:"string"},
        active : {type:"boolean"},
        birthDay: {type:"string"},
        UserDetail:{
            type:"object", 
            properties:{
                latitudes : {type:"number"},
                longitudes : {type:"number"},
                address : {type:"string"},
            }
        }
    }
}

export const getOneProductItem = {
    schema:{
        tags : ['products'],
        security: [{
            apiKey: []
        }],
        summary:"getting one product by its id" ,
        response:{
            200: {
              product
            }
        }
    }, 

    handler : getOneProduct,
  
}

export const getProductItem = {
    schema : {
        tags :['products'],
        security: [{
            apiKey: []
        }],
        response: {
            200: {
                type:'object',
                properties:{
                    products : {type : 'array' , items : product},
                    user : {type: "string"}
                }
            }
        }
    },

    handler : getAllProducts,
}


export const authBodySchema = {
    schema : {
        tags:['authentication'],
        summary: "registeration form",
        body : {
            type:"object", 
            properties : {
                userName:{
                    type:"string"
                },
                firstName:{
                    type:"string"
                },
                lastName:{
                    type:"string"
                },
                password:{
                    type:"string"
                },
            }
        }
    } , 
    handler : register
}
export const authLoginBodySchema = {
    schema : {
        tags:['authentication'],
        summary: "login form",
        body : {
            type:"object", 
            properties : {
                userName:{
                    type:"string"
                },
                password:{
                    type:"string"
                },
            }
        }
    } , 
    handler : login
}

export const ChangeProfileSchema = {
    schema: {
        tags: ['user'],
        summary: "change user profile",
        security: [{apiKey: []}],
        body: {
            type: "object",
            properties: {
                address: {
                    type: "string"
                },
                latitudes: {
                    type: "number"
                },
                longitudes: {
                    type: "number"
                }
            },
        },
        response: {
            201: {
                type: "object"
            }
        }
    },
    handler: changeProfile,
    preHandler : [getUserMiddleware]

  };
  
export const getProfileSchema = {
    schema: {
        tags: ['user'],
        summary: "get user profile",
        security: [{apiKey: []}],

        response: {
            200: {
                user 
            }
        }
    },
    handler: getProfile,
    preHandler : [getUserMiddleware]
  };


export const getAllCategorySchema = {
    schema : {
        tags : ['category'],
        summary: "getting all categories",
        security :[{apiKey :[]}],
        response: {
         200 : {type: "object" , properties :{categories : {type :"array"}}}
        }
    },

    handler :getAllCategories,
    preHandler : [getUserMiddleware]
}

export const addCategorySchema = {
 schema : {
    tags : ['category'],
    summary : "creating category",
    security : [{apiKey : []}],
    body : {
        type:'object',
        properties : {
            name : {
                type:"string"
            }, 
            parentID : {
                type:"number"
            }
        }
    },
    response : {
        201 : {type:"object"}
    }
 },

 handler : createCategory,
 preHandler : [getUserMiddleware]
}

export const updateCategorySchema = {
 schema : {
    tags :['category'],
    summary : 'changing category',
    security : [{apiKey :[]}],
    body : {
        type:"object" ,
        properties : {
            name : {type:"string"},
        }
    }
 },
 handler : updateCategory,
 preHandler:[getUserMiddleware]
}
export const removeCategorySchema = {
 schema : {
    tags :['category'],
    summary : 'removing category',
    security : [{apiKey :[]}],
 },
 handler : removeCategory,
 preHandler:[getUserMiddleware]
}