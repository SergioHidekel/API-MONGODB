const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');


class Server {
    
    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPaht = '/api/usuarios';
        this.authPaht = '/api/auth';
        //Conectar base 
        this.conectarDB();
        //Middlewares
        this.middlewares();
        //Rutas
        this.routes();
    }

    async conectarDB(){
        await dbConnection()
    }

    middlewares(){
        //CORS
        this.app.use(cors());
        //Lectura y parseo del body
        this.app.use(express.json());
        //PUBLIC
        this.app.use(express.static('public'))
    }

    routes(){       
        this.app.use(this.usuariosPaht, require('../routes/usuarios'));
        this.app.use(this.authPaht, require('../routes/auth'));
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en puerto:', this.port);
        });
    }
}



module.exports = Server;