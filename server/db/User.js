const db = require('./db');
const { Sequelize } = db;
//jwt auth imported here

const User = db.define('user', {
    email:{
        type: Sequelize.STRING
    },
    password:{
        type: Sequelize.STRING
    },
    firstName:{
        type: Sequelize.STRING
    },
    lastName:{
        type: Sequelize.STRING
    }
})

//create authentication



User.prototype.getCart = async function(){
    const user = User.findOne({
        where: {
            id: this.id
        },
        include: [
            {
                model: Order,
                include: [
                    {
                        model: ListItem
                    }
                ]
            }
        ]
    })
}

User.prototype.addToCart = async function(){
//    grab the order associated with the user
//    orders are your cart
}

User.prototype.removeFromCart = async function(){

}

//coverting order model from cart to actual placed order
User.prototype.createOrder = async function(){

}

module.exports=User;