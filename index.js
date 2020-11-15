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
//Guardar la base de datos
let db;

MongoClient.connect("mongodb://localhost:27017", function (err, client) {
  if (err !== null) {
    console.log(err);
  } else {
    db = client.db("restaurante");
  }
});
//Ya estamos conectados y ya tenemos todo lo que tenemos que poner SIEMPRE

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

//Empezamos con lo que pide el ejercicio.
// 1-  Crea una ruta GET /api/menus para obtener todos los menús...
//NOTA. function (req,res){...} es la función típica de express

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

//Ahora nos vamos al index.js de public para hacer la petición de la ruta. Es decir, hacer el fetch.
//Repetiré la misma secuencia para hacer el PUT y para el DELETE

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

app.put("/api/editarMenu/", function (req, res) {
  //Aquí hay que pensar qué es lo que me tiene que llegar por el body. Qué necesito poder editar un menú en concreto, qué es lo que necesito que me llegue del front para poder cambiar lo que el usuario quiere que se edite y poder ponerle los nuevos valores.
  //En este caso, necesitaré el número del menú para poder identificar el menú que quiere cambiar el usuario y también el resto de las claves para poder introducir nuevos valores.

  let nuevoMenu = {
    numero: req.body.numero,
    primero: req.body.primero,
    segundo: req.body.segundo,
    postre: req.body.postre,
    precio: req.body.precio,
  };
  //Ahora ya tenemos un objeto con todo lo que nos llega por el body por lo que accederemos a la base de datos para hacer el cambio, (la consulta), con la función que sirve para actualizar algo, (update).
  db.collection("menus").updateOne(
    //A esta funciuón hay que pasarle dos cosas, primero un objeto con la clave que queremos que busque
    { numero: nuevoMenu.numero },
    //Y después le llegará otro objeto con $set con las claves y valores que queremos modificar.
    //CUIDADO con escribir las claves malk, ya que no entonces no se modificarían, sino que se añadirían.
    {
      $set: {
        primero: nuevoMenu.primero,
        segundo: nuevoMenu.segundo,
        postre: nuevoMenu.postre,
        precio: nuevoMenu.precio,
      },
    },
    //Y la función típica de mongo
    function (err, datos) {
      if (err !== null) {
        res.send(err);
      } else {
        res.send(datos);
      }
    }
  );
});

//Ahora reinicio el servidor y lo pruebo.
//Primero me voy a robo 3T para buscar un número de menú para modificarlo.
//Luego voy a postman, selecciono put/body/raw/JSON a la ruta /api/editarMenu/ e introduzco el objeto que queremos mandarle introduciendo en este caso por ejemplo el número de menú y después los nuevos valores que queremos modificar:
// {
//   "numero": 2,
//   "primero": "Patatas",
//   "segundo": "huevos",
//   "postre": "tarta",
//   "precio": 12
// }
//Ahora si voy a robo 3T comprobaré que mi menú número 2 ha cambiado con los nuevos datos.
//(RECORDAR ACTUALIZAR ROBO 3T CON comando+R)

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

//Ruta delete
//Igual que con el PUT tenemos que decirle a express qué queremos que nos llegue para identificar un menú en la base de datos.
//Y a diferencia del PUT no necesitamos indicar ninguna clave y valor más ya que lo que vamos a hacer es borrar es menú en concreto:

app.delete("/api/borraMenu/", function (req, res) {
  //Primero pasamos el número de menú
  let numero = req.body.numero;
  //Y espués accedemos a la base de datos para borrarlo con la función deleteOne a la que hay que pasarle una clave y el valor numero y después, igual que en el updateOne de antes, le llega la función de mongo que es que recibe esta clave y valor y lo borra.
  db.collection("menus").deleteOne({ numero: numero }, function (err, datos) {
    if (err !== null) {
      res.send(err);
    } else {
      res.send(datos);
    }
  });
});

//Y ya podemos probarlo en postman.
//Reinicio eo servidor, me voy a postman   /api/borraMenu/   selecciono DELETE/Body/raw/JSON  y le paso el número del menú que quiero borrar. P. ejemplo:
// {
//   "numero": 2          (SIN coma al final)
// }

//Y después, si refresco robo 3T comprobaré que ya no lo tengo.

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

//Ahora ya podemos hacer la parte del front del PUT y del DELETE

//Para el PUT, (función updateOne de mongo) necesito 5 inputs text para introducir los cambios, QUE YA tengo creados, así que solo necesitaré un botón para llamar a la función modificarMenu() que crearé en el index.js de public

//Para el input, (función deleteOne de mongo), solo necesitaré el botón para llamar a la función borrar menú que también va en el index.js de public

app.listen(3000);
