import { DataTypes } from "sequelize";
import { sequelize } from "../config/sequelize.config.js";



export const Category = sequelize.define('Category' , {
    id: {type : DataTypes.INTEGER , autoIncrement: true , primaryKey: true},
    name : {type : DataTypes.STRING , unique:true},
    parentID : {type:DataTypes.INTEGER , hierarchy: true}
})

Category.hasMany(Category , {as:"children" , foreignKey:"parentID"})
Category.belongsTo(Category , {as:"parent" , foreignKey:"parentID" })
Category.sync({alter: true})

// has many is one ==> to many relation , category has multiple children , 
// Category is our  model target which is category itself , that says it can has multiple fields called children 
// To make all of this work, we need to tell Sequelize which column in our "Category" model represents the connection between parent and child.