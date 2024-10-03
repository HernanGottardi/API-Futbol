const express = require("express");
const app = express();
const cors = require('cors'); // Agrega el paquete cors
const admin = require('firebase-admin');
require('dotenv').config();

// Configura CORS para permitir solicitudes desde tu frontend
const corsOptions = {
    origin: '*', // Aquí especifica el origen de tu frontend
    optionsSuccessStatus: 200 // Algunos navegadores antiguos (IE11, algunos SmartTVs) requieren este estatus.
  };
  
app.use(cors(corsOptions)); // Aplicar CORS a todas las rutas

// Cargar las credenciales desde la variable de entorno
const credentials_json = {
    "type": "service_account",
    "project_id": "dbfutbol-979f4",
    "private_key_id": process.env.PRIVATE_KEY_ID,
    "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDM3JZifrHaqa76\nnf8iT+vRGQ4uKr+DUmlraeX1oAkwp1hn6zmkryebJsCHXvLuOQfVf7SXOxACrEkR\n2SMkEynS3oZdQ5fYupJ0sXbjttDK7zm3UgIDhux6p3zqbUzxdtyL1LO8n9VU4H/R\n+xgzIe8+oaLse4iUspwZk0lTuWFR+u50g/SBSQdcGRiQxnn/QO4xtaHTTwOkM6b1\nUVJ2EyuWolItC3B25N/GNSOQVKooH0jgxRglpd6u+HnStXN+lyYhtM2/NT2mNdiM\nfbFsk9JZKcR7vsaubJLTXh/0E1lrZ41d9iEFbRH0hTBimmqD3kKsjDBa9TFAl/mc\neek1nnR/AgMBAAECggEAHiNFgcVJvPVsPIpfLQO87syqKA3kkW6KUQxfPDyy8r7B\nDr4C2OtmVDjl51mx5hdAbnQ/HmXIpoavU+TcepjRylKE9IDWfJfV++eE/123EbkS\nhe7r75Y7K+rVQazwE4XSTu/tETl3qj5CD6N08ptyFYYJ8JMBNimgiqf/CEYkFGnQ\n+UkWshV4pT5Auh9GMb5ackOPLV9m+JgqP/gLyy5UHpGJGPP/JcMZsMXf/U0sG5j/\nnVaMKNvGdO1aK9gwsY3cokwR+flKx2TsV3wi+KpjhjdZbQRwtNipPYNMxQSx5o/O\nY77T53S9bQR51sg01kHw1PmCzTJf+M0XAX0yA9q4gQKBgQD9U9bUa3JG5joeFAWK\nyfotiSZvbq6xd3ZVU6iAXU6qjY5MLOIgoA8UzmfnOibg93E+cECDu94eu1M0FdVp\nCumvJ9DjEJ4KAo6+yvCSMKJKGve5uIFoFIHpKFpi8JHIRcnwgeujsgo4p8K92UkK\ntDgTuh0vOmzyUe138IcrbUPRsQKBgQDPBdtTsIvNPVyJVDeP1ykLV7dXVEW3G/Ir\nyDAaMrJ3jxsc6UMMGgqX64dCRVTecm3yVrjvxN/OhOjhg+Jc9zQCY7EJAOwdI9r5\nI5HfIhk2zLkUPa9bc5wMPlAK0kHDi5onQyNRAtzA93VVmKn2hxHeU9YRn7RTvF2L\nlj2h0lqFLwKBgB2c6FcKfGBXV2Heu0sfEzSxfKG4EYnDSjztO5xNy/1Z8NFsyb5A\nl6K6AiFghdz0b/N5kcEUfAGhqjdDeh/+W5TTFbMFZUQMSn15IaglMUNyZZT7QX1W\nMF1+DxrTvmbn6ZRIy6/mBxXaXoRs2wH6UTfVIMY9kTC+bQEBR/vGmQ/xAoGALU30\nz33FOmcBRzRc7GeDne3WO5A/qXC+MIKgtDr//1Yb8tnBSHaydsieUwxlJEEaenws\nAJyu9bz0UdXQxdN7WEKEzZmcEkx0cS0tkQ0fQ3TN0/Yj1/mW3r8MOTIGHksAszLo\nGaRstvXwgYjlOQQaDvN912GBzwlb115LoowsLxUCgYEAmetImLPNZHhmiK8zC5ZV\niot5JAiznCxfQGHC+Zp86be/Mp+/Ab3n9KDp9noqbLd9WOuYtB77YEbx44Nhwk9n\nVKCtlS6fScHJR9fxTc/3P8PyoYbn7UfkiZSeYvcxrZb/xiDEf+Q96+NHsJMHMMh1\nkPbJsQqYRyYuUKd3JdKW8lo=\n-----END PRIVATE KEY-----\n",
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