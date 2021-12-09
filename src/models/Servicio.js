const mongoose = require('mongoose');

const servicioSchema = new Schema(
    {   tipo_automotor: String,
        tipo_procedimiento: String,
        precio: String,
        duracion: String,
    },
    {
        versionKey: false
    }
);
module.exports = mongoose.model('Servicio', servicioSchema);