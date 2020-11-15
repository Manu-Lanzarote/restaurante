buscarMenu();
function buscarMenu() {
  fetch("/api/menus") //Nota. Por defecto el fetch es get
    //Esto siempre igual hasta el console log.
    .then(function (respuesta) {
      return respuesta.json();
    })
    .then(function (datos) {
      //Para comprobar este console.log me voy al navegador pero NO FUNCIONA con la ruta que me da el Live Server de VS, hay que introducir: localhost:3000/ , que es la ruta del index.html de la carpeta public por defecto que nos devuelve el servidor. La barra de localhost:3000 es sinónimo del index.html de public.
      console.log(datos);
      //Sigo para imprimir en el front los menús que tengo en la base de datos. Para ello lo meto en una variable que igualo a un string vació y después añado los valores que obtendré de recorrer el objeto datos[i].elValorQueSea con un for.
      let menus = "";
      for (let i = 0; i < datos.length; i++) {
        menus += `
         <h1>Menú número ${datos[i].numero}</h1>
         <p>Primer plato: ${datos[i].primero}</p>
         <p>Segundo plato: ${datos[i].segundo}</p>
         <p>Postre: ${datos[i].postre}</p>
         <p>Precio: ${datos[i].precio} euros</p>
         <span>. . .<span>
        `;
      }
      //Para comprobar que todo está correcto, imprimo menus en el html y lo veré en el front localhost:3000/
      document.getElementById("div1").innerHTML = menus;
    });
}

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

//Ahora toca ir a index.html y codear los inputs y el button que recogerán los datos de los nuevos menús que el cliente envíe desde el front. (Ver código en index.html)

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

//Despues regresaré aquí para hacer un fetch dentro de la función nuevoMenu() que llamo desde el onclick del button para que recoja los inputs del index.html y los mande al app.post del servidor para que los añada a la base de datos.
function nuevoMenu() {
  //Recojo los inputs
  let numero = document.getElementById("numero").value;
  let primero = document.getElementById("primero").value;
  let segundo = document.getElementById("segundo").value;
  let postre = document.getElementById("postre").value;
  let precio = document.getElementById("precio").value;

  //Los meto en el objeto anyadirMenu
  let anyadirMenu = {
    numero,
    primero,
    segundo,
    postre,
    precio,
  };
  console.log(anyadirMenu);
  //Y hago el fetch al archivo app.post("/api/nuevoMenu/" que se encuentra en el index.js del servidor
  fetch("/api/nuevoMenu/", {
    //Método POST  (Hay que indicar el método por que no es un método GET)
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(anyadirMenu),
  })
    .then(function (res) {
      return res.json();
    })
    .then(function (datos) {
      console.log(datos);
    });
}

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

//Modificar

function modificarMenu() {
  //Recojo los inputs. (Igual que hicimos en nuevoMenu() más arriba)
  let numero = document.getElementById("numero").value;
  let primero = document.getElementById("primero").value;
  let segundo = document.getElementById("segundo").value;
  let postre = document.getElementById("postre").value;
  let precio = document.getElementById("precio").value;

  //Los meto en el objeto anyadirMenu (Igual que hicimos en nuevoMenu() más arriba)
  let anyadirMenu = {
    numero,
    primero,
    segundo,
    postre,
    precio,
  };

  //Ahora hacemos un fetch a la ruta /api/editarMenu/
  //Siempre igual: El flujo de la lógica va del servidor al index de public y de ahí al front. Por lo tanto, si voy al servidor podré ver la ruta en la que hay que hacer este fetch,    /api/editarMenu/
  fetch("/api/editarMenu/", {
    //Método PUT  (Hay que indicar el método por que no es un método GET)
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(anyadirMenu),
  })
    .then(function (res) {
      return res.json();
    })
    .then(function (datos) {
      console.log(datos);
    });
}

//Y puedo probar directamente en el navegador a modificar el menú.

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

// Borrar
function borrarMenu() {
  //Miro en el servidor para comprobar qué es lo que recibe esta función y comprobaré que recibe el número por lo que este será el input que necesitaré obtener de index.html
  let numero = document.getElementById("numero").value;
  let borrarNumero = {
    numero,
  };
  //Otra vez miro en el servidor para ver la ruta y hago el fetch
  fetch("/api/borraMenu/", {
    //Método DELETE  (Hay que indicar el método por que no es un método GET)
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(borrarNumero),
  })
    .then(function (res) {
      return res.json();
    })
    .then(function (datos) {
      console.log(datos);
      buscarMenu();
    });
}

//Y puedo probar directamente en el navegador a borrar el menú.

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
/////////////// REFRESCAR EL FRONT AUTOMÁTICAMENTE AL INSERTAR, MODIFICAR O BORRAR DATOS //////////////////////////////
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

//PARA QUE LOS DATOS SE ACTUALICEN EN EL FRONT  DIRECTAMENTE SIN TENER QUE REFRESCAR EL NAVEGADOR!!!!
//Hay que meter el primer fetch (línea 3 del código - /api/menus método GET) en una función,(en este caso buscarMenu())
//   Y LLAMAR A ESTA FUNCIÓN EN LA PRIMERA LÍNEA -(Ver línea 1)

//Y SI LLAMO A ESTA FUNCIÓN en el último .them de cada fetch, (o donde yo quiera que se me actulice) SE ME ACTULIZARÁN LOS DATOS AUTOMÁTICAMENTE EN EL FRONT
