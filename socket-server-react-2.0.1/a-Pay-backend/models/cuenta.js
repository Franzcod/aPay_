const { Schema, model} = require('mongoose');


const CuentaSchema = Schema({
    deudor: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    prestamista: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    monto: {
        type: String,
        required: true
    },
    cuotas: {
        type: String,
        required: true
    },
    cuotasPagadas: {
        type: String,
        required: true
    },
    // si el deudor ya pago (?)
    estadoDeudor: {
        type: Boolean,
        default: false,
        required: true
    },
    // Si el prestasmista ya cobro (?)
    estadoPrestamista: {
        type: Boolean,
        default: false,
        required: true
    },
    // Si finaliso la cuenta (?)
    estadoCuenta: {
        type: Boolean,
        default: false,
        required: true
    },
    concepto: {
        type: String,
        default: '',
        required: true
    },
    fechaInicio: {
        type: Date,
        default: new Date().toLocaleTimeString(),
        required: true
    },
    fechaLimite: {
        type: Date,
        required: false
    },

},{
    timestamps: true
})


CuentaSchema.method('toJSON', function() {
    const {__v, _id, ...object} = this.toObject();
    object.uid = _id;
    return object;
})


module.exports = model('Cuenta', CuentaSchema);