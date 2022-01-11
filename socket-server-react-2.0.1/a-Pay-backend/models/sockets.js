

class Sockets {

    constructor( io ) {

        this.io = io;

        this.socketEvents();
    }

    socketEvents() {
        // On connection
        this.io.on('connection', ( socket ) => {


            // TODO:
            // Validar JWT
            // Si el token no es valido desconectar



            //  Saber si el usuario esta activo mediante UID para
            // Emitir todos los usuarios conectados 


            // socket jooin, uid

            // Escuchar cuando el cliente manda un msj

            // Disconnect
            // Marcar en BD q se desconecto

            // Escuchar evento: mensaje-to-server
            socket.on('mensaje-to-server', ( data ) => {
                console.log( data );
                
                this.io.emit('mensaje-from-server', data );
            });
            
        
        });
    }


}


module.exports = Sockets;