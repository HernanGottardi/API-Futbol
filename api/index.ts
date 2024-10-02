const express = require("express");
const app = express();
const cors = require('cors'); // Agrega el paquete cors
const admin = require('firebase-admin');
require('dotenv').config();

// Configura CORS para permitir solicitudes desde tu frontend
const corsOptions = {
    origin: 'https://front-futbol.vercel.app', // Aquí especifica el origen de tu frontend
    optionsSuccessStatus: 200 // Algunos navegadores antiguos (IE11, algunos SmartTVs) requieren este estatus.
  };
  
app.use(cors(corsOptions)); // Aplicar CORS a todas las rutas

// Cargar las credenciales desde la variable de entorno
const credentials_json = {
    "type": "service_account",
    "project_id": "dbfutbol-979f4",
    "private_key_id": process.env.PRIVATE_KEY_ID,
    "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQC7M2EDrT2pDp3f\nd8hPkw0BRdkdAQ4ShuBSMJ15DPuOuLGcoiqldGBSXzg9OLwTYL/94Fv+iUDil1qF\nEs9gdLZFRuzZbuGaX9FrKo9PzgxUFeYhFnEN1vJ1TO/g4aCN11dGaDNJxDoZUjx0\nZKDTDaFzg0PKuwrRLXSbdNd4YUPNbNTk0zDq4u4WrQc8Hb7degpQDRDpnsATjoTw\n8tEWcWfDpavcc5vI0vwCscpp8qNcjknb4MMaDdAIdMMtAbVKH//tURhj1gYj8XJb\nNjtFfSu+5O3dvdiXSyaK5uCViNCHdxC1IjmFvyzDAmBcgKmipQcVOMCeYs0solzt\n1sMPesHJAgMBAAECggEADW7Yp5GjItI2cG5xPIqODJkVRRBKEPjGOIeeCS1uELX+\nosF9Q22oKskD6Vq8njxbUo2qtEdnlUrsly98G40MdkiqXsjm3fPBvImrinu75T3E\nC3xHhQl3UQUCEpZGNd9ttxLrmT/ANohw554/7x0jiH0zHGVTF6MGItCd1JjQK3mj\n7oAF1MXuEdhEy2T1P357bv3bbTaXzX5sYh+uKarMlOKgjhwfclTXHGGwGKB+XlQQ\nK/BhstT1OhCngx5IwEQ1QvXbG9wSPi4RUJacD3rKib83eJ4/5stYbg4w4qMU0j3G\n6C/JL+uEHI5114j8rIWCn6EWPmfO2gb3FeqEn8V2vQKBgQDzRLKB2TqvZte2MvbT\nzD6d3gCkKlREQGSSsMbc9szweYFeLao/H/tSeDWzyrjTNJi+mAn3Ov+M/tede5vZ\nHBqUolm+2xtcgvDgka1ERkKRk2hNZZ+w6UlEVaJgFgbwrCT5//UQl/vpJ5fZHNNo\nSob2LXgMCg3oYadmz6NCmFOAZQKBgQDE/30jrrf/xVStF5dSQPlJm5THRVbQCHHS\nifvX9g4j8A1VqIs/RDcNIjIjUNG0PXAe7FR0dlpK4Afyaaz1/k9ehLP7K7cM9hwn\nw6H/VaCWaWTocWIFtYiIdjQUO9hLUtEDJ0qd4y1tODq5qC0rRRT7HA31ErrPwyNK\n4bQJhSb7lQKBgGUUU1OuzjqZceIL1RF2GUKBPyT3TaI6W0+0Ujz383msEvvt34Jx\nKH1A45d8EUX44cq349QtWIfeT/ropH4WtliyCLZL1lefNLUq8qKeywQwCrO2GR9q\nH35cUqa4IFQaQxb5qnslm49qWybkWldIOEHL7Mib2OGIygTnG8ANCQ0dAoGAK445\ngtwsfnaIxESFBoCrHWUyveRMz24ujFhJwHP8qGF48Ul0kCZq7ZJz9271Dp7O3Wdv\nPNi2Gfvyhdxri3AQ6Fr62DvQGyOHEhulA6lQ+jCPSP1YqN58M3+/AAJDTlQfNk1H\nqCUEdDOMeGQAqKJ7gxGu3FKpzynb8cB5Z+lytwkCgYAA+GoBbX05RTmgsZ8oUFvB\nCfKdM+yRcy9qMVb5OdRnMfLq4LFVjuRNbFMTldRmexB3+PWL8DkG9u94NPiBxc24\nLMPNlvm4IcJl0rPocqL2fior2pnSwUu6fekHagjgz/jnjvsBQyTtTTzcR6gAQ0E6\nvHYg48zcGMCShpcpTHmZzw==\n-----END PRIVATE KEY-----\n",
    "client_email": process.env.CLIENT_EMAIL,
    "client_id": process.env.CLIENT_ID,
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": process.env.AUTH_PROVIDER_X509_CERT_URL,
    "client_x509_cert_url": process.env.AUTH_PROVIDER_X509_CERT_URL
}
admin.initializeApp({
  credential: admin.credential.cert(credentials_json),
});

const db = admin.firestore();

app.get("/games", async (req: any, res: any) =>
{
    try {
        const querySnapshot = await db.collection("Entorno").get();
        const documents = querySnapshot.docs.map((doc: { id: any; data: () => any; }) => ({ id: doc.id, data: doc.data() }));
        res.json(documents);
    } catch (error) {
        console.error("Error al obtener los juegos:", error);
        res.status(500).send('Error al obtener los juegos.');
    }
})

// app.listen(4000, () => console.log("Server ready on port 3000."));

module.exports = app;