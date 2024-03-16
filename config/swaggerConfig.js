const swaggerConfig = ()=>{
   return {
        
       swagger : {
            info:{
                title:"fastify swagger",
                description:"swagger document practice",
                version:"0.1.0"
            },
            tags : [
            {name:"products" , description:"admin product handler"} , 
            {name:"authentication" , description:"admin authentication handler"},
            {name:"user" , description:"admin user profile handler"},
            {name:"category" , description:"admin category handler"}],

            schemes: ['http'],
            consumes: ['application/json', 'application/x-www-urlencoded'],
            securityDefinitions: {
                apiKey: {
                    type: "apiKey",
                    in: "header",
                    name: "authorization",
                    description : "bearer token"
                }
            },
        } 
    }
}

const swaggerUiConfig = ()=>{
  return  {
        prefix:"swagger" , 
        exposeRoute  : true, // it let use send request to the swagger url routes
    }
}

export {swaggerConfig , swaggerUiConfig}