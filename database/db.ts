import mongoose from 'mongoose';

/**0=disconnected
 * 1=connected
 * 2=connecting
 * 3=disconnecting
 */

const mongoConnection={
    isConected:0
}

export const connect=async()=>{

    if(mongoConnection.isConected === 1){
        console.log('conexion establecida');
        return;
    };

    if(mongoose.connections.length > 0){ //revisamos si en las conexiones de mongoose hay alguna EN PROCESO
         mongoConnection.isConected = mongoose.connections[0].readyState; //DE SER ASI NUESTRO ESTADO SERA IGUAL
                                                                        //AL VALOR DE ESTADO DE ESA CONEXION EN PROCESO
        if(mongoConnection.isConected === 1){                           //ENTONCES SI ESA CONEXION ACTIVA OSEA VALOR 1
            console.log('usando conexion anterior');                    //UTILIZAMOS ESTA CONEXIÓN YA EN PROCESO
            return; 
        }
        // await disconnect();    //SI ESE VALOR NO ES 1 HACEMOS LA DESCONEXION
    }



    //|||||||----LLEGADO A ESTE PUNTO SIN CONEXIONES previas CREAMOS NUESTRA CONEXIÓN-------|||||||||||||||
    await mongoose.connect(process.env.MONGO_URL!);      
    mongoConnection.isConected=1;
    console.log(`conectado en ${process.env.MONGO_URL!}` );
}


export const disconnect=async()=>{

    if(process.env.NODE_ENV === 'development') return;

    if(mongoConnection.isConected === 0)return;  //si el estado esta en 0 ya esta desconectado

    await mongoose.disconnect();            //si no esta desconectado, desconectamos la BD
    console.log('Conexión finalizada');
    
}