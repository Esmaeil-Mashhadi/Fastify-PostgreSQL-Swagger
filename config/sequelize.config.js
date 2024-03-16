import { Sequelize } from "sequelize";
import sequelizeHierarchy from "sequelize-hierarchy";

// export const sequelize = new Sequelize("postgres://postgres:2022@localhost:5432/fastify")

export const sequelize  = new Sequelize('fastify' , 'postgres' , '2022' , {
    host:'localhost',
    port:5432,
    dialect:"postgres",
})

const dbConnection = async()=>{
    await sequelize.authenticate()
    console.log('connection established'); // the usage of this is we can see the connection is established or not
}


dbConnection()