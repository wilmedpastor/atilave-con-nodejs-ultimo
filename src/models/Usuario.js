const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

const { Schema } = mongoose;

const userSchema = new Schema({ 
    tip_documento: {type: String},
    num_documento: {type: String, unique: true},
    nombres: {type: String},
    apellidos: {type: String},
    celular: {type: String},
    direccion: {type: String},
    ciudad: {type: String},
    email: {type: String, unique: true},
    password: {type: String, unique: true},    
}, 
{versionKey: false});
userSchema.methods.encryptPassword = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

userSchema.methods.comparePassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('Usuario', userSchema);