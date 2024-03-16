import fastify  from "fastify"
import productRoutes from "./routes/product.routes.js"
import authRoutes from "./routes/auth.routes.js"
import profileRoutes from "./routes/profile.routes.js"
import categoryRoutes from "./routes/category.routes.js"



import fastifySwagger from "@fastify/swagger"
import fastifySwaggerUi from "@fastify/swagger-ui"
import { swaggerConfig, swaggerUiConfig } from "./config/swaggerConfig.js"
import "./config/sequelize.config.js"
import fastifyBcrypt from "fastify-bcrypt"
import fastifyJwt from "@fastify/jwt"
import cors from 'cors'
import fastifyMiddie from "@fastify/middie"
import serveStatic from "serve-static"
export const app = fastify()
const port = 4000
import path from 'path'
import { fileURLToPath } from "url"
const __dirname = path.dirname(fileURLToPath(import.meta.url))


const main = async()=>{ 
    app.get('/' , (req, reply)=>{
        reply.send({
            message:"hey fasty"
        })
    })
        app.register(fastifySwagger , swaggerConfig())
        app.register(fastifySwaggerUi , swaggerUiConfig())
        await app.register(fastifyMiddie)
        app.register(fastifyBcrypt , {saltWorkFactor:12})
        app.register(fastifyJwt , {secret :"mySecret"}) 
        app.use(cors())
   
        app.use('/static' , serveStatic(path.join(__dirname , 'public')))
        app.register(authRoutes , {prefix:'auth'})
        app.register(productRoutes , {prefix : 'products'})
        app.register(profileRoutes, {prefix : 'profile'})
        app.register(categoryRoutes, {prefix : 'category'})

        app.listen({port} , (err)=>{
            if(err) console.log(err);
            console.log(`server ran on http://localhost:${port}`);
        })
    
}

await main()