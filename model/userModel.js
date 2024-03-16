import { DataTypes } from "sequelize";
import { sequelize } from "../config/sequelize.config.js";



export const User = sequelize.define("User" , {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    firstName : {
        type:DataTypes.STRING,
    },
    lastName : {
        type:DataTypes.STRING,
    },
    userName : {
        type:DataTypes.STRING ,
        unique: true,
        allowNull:false
    },
    password: {
        type: DataTypes.STRING, 
        allowNull:false
    } , 
    active : {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },

    birthDay : {
        type : DataTypes.DATE
    },
 
    token : {
        type:DataTypes.STRING,
        defaultValue: "" 
    }
})

export const UserDetail = sequelize.define("UserDetail" , {
    id: {type:DataTypes.INTEGER , primaryKey: true , autoIncrement:true},
    
    address:{
        type:DataTypes.STRING ,
    },
    latitudes: {type : DataTypes.DOUBLE},
    longitudes : {type: DataTypes.DOUBLE},
    UserId : {type : DataTypes.INTEGER}
})
 
User.hasOne(UserDetail);
UserDetail.belongsTo(User)

// User.sync({alter:true}).then(()=>{console.log('user synced ');})
// UserDetail.sync({alter:true}).then(()=>{console.log('UserDetail synced');}) 

   
 
 
// User.init ({
//     id: {type:DataTypes.INTEGER , primaryKey: true , autoIncrement:true},
//     firstName:{
//         type:DataTypes.STRING ,
//     },
//     lastName : {
//         type:DataTypes.STRING,
//     },
//     userName : {
//         type:DataTypes.STRING ,
//         unique: true,
//         allowNull:false
//     },
//     password: {
//         type: DataTypes.STRING, 
//         allowNull:false
//     } , 
//     active : {
//         type: DataTypes.BOOLEAN,
//         defaultValue: false
//     },

//     birthDay : {
//         type : DataTypes.DATE
//     },

//     token : {
//         type:DataTypes.STRING,
//         defaultValue: ""
//     }
  

// }, {sequelize , name: 'user'} ) 

// User.sync({force:true})// it forces the synchronization process to overwrite the table structure in the database.
// when you modify the model , you should remoev prior document for the new one to add with User.sync