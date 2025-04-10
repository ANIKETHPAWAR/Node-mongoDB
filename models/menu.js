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
const MenuItem = mongoose.model('MenuItem', menuItemSchema);
module.exports = MenuItem;