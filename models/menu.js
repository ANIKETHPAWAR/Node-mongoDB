const mongoose = require('mongoose');
const menuItemSchema = new mongoose.Schema({
name: {
type: String,
required: true,
},
price: {
type: Number,
required: true,
},
spicy:{
    type:String,
    enum:['hot','heavy','sour'],
required: true

}

});
// defining the model
// The first argument is the name of the model, and the second argument is the schema
const MenuItem = mongoose.model('MenuItem', menuItemSchema);
module.exports = MenuItem;