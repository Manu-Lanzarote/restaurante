// Crea una aplicación para gestionar menús de un restaurante. Cada menú tendrá 5 propiedades:
// Número de menu
// Primer plato
// Postre
// Segundo plato
// Precio

// 1-  Crea una ruta GET /api/menus para obtener todos los menús
// 2-  Crea una ruta POST /api/nuevoMenu para añadir un nuevo menú. Desde el navegador manda un objeto con las 5 propiedades y, en el servidor, introduce ese objeto en la base de datos
// 3-  Crea una ruta PUT /api/editarMenu para modificar un menú existente. Envía un objeto al servidor en el body de la petición, recoge ese objeto en el servidor (req.body, recuerda añadir el app.use correspondiente para poder leer el body) y modifica el menú con el número indicado.
// 4- Crea una ruta DELETE /api/borrarMenu para borrar un menú existente. Envía un objeto al servidor en el body de la petición, recoge ese objeto en el servidor (req.body) y borra el menú con el número indicado.

// IMPORTANTE: Antes de crear formularios o elementos input en un archivo HTML, prueba desde el Postman que todas las rutas hacen lo esperado.

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

//SIEMPRE:
//En el terminal instalar el archivo package.jsonl, instalar express e instalar mongodb
//npm init -y
//npm install express
//npm install mongodb

//SIEMPRE
//Importo express e importo mongodb
const express = require("express");
const mongodb = require("mongodb");
//Ejecuta/ Crea una aplicación express
const app = express();
//Indicamos al servidor donde tenemos nuestros archivos html, css, imágenes u otros archivos estáticos.
app.use(express.static("public"));
//Indicamos al servidor que analice el cuerpo de la petición """req.body""" que tenemos dentro de app.post.
app.use(express.urlencoded({ extended: false }));
//Para que el servidor sepa interpretar le JSON que llega al body dentro del app.post.
app.use(express.json());

//SIEMPRE
//Conectar a la base de datos
const MongoClient = mongodb.MongoClient;
//Guardar la base de datros
let db;

MongoClient.connect("mongodb://localhost:27017", function (err, client) {
  if (err !== null) {
    console.log(err);
  } else {
    db = client.db("restaurante");
  }
});
//Ya estamos conectados y ya tenemos todo lo que tenemos que poner SIEMPRE

//Empezamos con lo que pide el ejercicio.
// 1-  Crea una ruta GET /api/menus para obtener todos los menús...

app.get("/api/menus", function (req, res) {
  //...Para ello tenemos que consultar a la db a la colección     "menus"      y traernos todos los menús
  // .find() es una función que solo usaremos en app.get
  db.collection("menus")
    .find()
    .toArray(function (err, datos) {
      if (err !== null) {
        res.send(err);
      } else {
        res.send(datos);
      }
    });
});
//Ahora inicio el servidor y lo compruebo en postman en la dirección localhost:3000/api/menus  - GET

// 2-  Crea una ruta POST /api/nuevoMenu para añadir un nuevo menú. Desde el navegador manda un objeto con las 5 propiedades y, en el servidor, introduce ese objeto en la base de datos.
//Esta ruta va a recibir un objeto que crearemos después a partir de los inputs type text que insertaremos en el front y que el usuario enviará a través de un button onclick que llamará a a la función nuevoMenu()

//IMPORTANTE: Cuando nos conectamos a una base de datos como mongodb NO USAMOS LA ETIQUETA <form> en el front, por que si lo hiciéramos enviaríamos los datos DE FORMA VISIBLE a través de la url, (que recogeríamos con params o con query), pero no con el body, que es lo que necesitamos para poder recoger un objeto con todas las propiedades/valores que envia el usuario desde el front.

app.post("/api/nuevoMenu/", function (req, res) {
  //Cuando hago un post uso req.body sin más por que voy a guardar todos los datos que inserto desde el front en el objeto body. Cuando tenga que hacer put, sí que tendré que indicar qué propiedad del objeto body quiero modificar.
  const nuevoMenu = req.body;
  //Vuelvo a hacer la consulta a la db e inserto en la función insertOne dos parámetros, el objeto nuevoMenu y como segundo parámetro el objeto function(err, datos) y volvemos a repetir el if - else del app.get
  db.collection("menus").insertOne(nuevoMenu, function (err, datos) {
    if (err !== null) {
      res.send(err);
    } else {
      res.send(datos);
    }
  });
});
//Reinicio el servidor y lo pruebo en postman.

//En postman seleccionamos POST que tiene que recibir el objeto por el BODY y en body seleccionamos RAW y en TEXT selecionamos JSON
//Para hacer la prueba le paso un objeto que como está en JSON tendré que ponerle comillas tanto a las claves como a los valores, (a los números no hace falta).
//Paso este objeto:
//{
// "numero": 2,
// "primero": "lentejas",
// "segundo": "filete",
// "postre": "flan",
// "precio": 8  //Aquí no poner la última coma porque daría error
//}
//Si le doy a send veré el objeto insertado y si compruebo de nuevo la primera ruta GET veré que se ha añadido el objeto a la db.

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//Antes de continuar con el resto de las rutas voy a hacer la parte del front de estas dos, así que creo la carpeta public y dentro los archivos index.html e index.js.

//En el index.html enlazo el archivo index.js
//Y creo un div que recibirá el fetch que crearemos en public index.js para imprimir en el front los nuevos menús que creemos:
/* <body>
    <div id="div1"></div>
    <script src="./index.js"></script>
</body> */
//(Ver archivo index.html)
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

//Ahora nos vamos al index.js de public para hacer la petición de la ruta. Es decir, hacer el fetch.
//Ver archivo index.js de public para seguir el código)

//Indico el puerto al que conectaré al servidor
app.listen(3000);
