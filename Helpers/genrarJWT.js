const jwt = require('jsonwebtoken');

    const generarJWT = (rol = '', uid = '') =>{
        return new Promise((resolve, reject) =>{
            const payload = { rol, uid };
            jwt.sign(payload, process.env.SECRETORPRIVATEKEY, {
                expiresIn: '30d'
            }, ( err, token ) => { 
                if ( err ) {
                    console.log(err);
                    reject( 'No se pudo generar el token' )
                } else {
                    resolve( token );
                }
            })
        })
    }
    
    module.exports = { generarJWT }