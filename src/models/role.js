const mongoose = require('mongoose');
const roleSchema = mongoose.Schema({
    name : {
        type : String,
        require : true,
        unique : true,
        uppercase : true
    }
});
const Role = mongoose.model('Role',roleSchema);
module.exports = Role;