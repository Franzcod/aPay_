const mongoose = require('mongoose');
const colors = require('colors');

const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.DB_CNN_STRING, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            // useCreateIndex: true
        });
        console.log('[ ok ]'.bgGreen.black,' Conexión a la base de datos establecida'.blue);
    } catch (error) {
        console.log(error);
        throw new Error('[ X ]'.bgRed.black,' X -Error en la base de datos => '.bgRed.white , error.message);
    }
}


module.exports = {
    dbConnection
};