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
}
console.log(numero);

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
    nuevoMenu();
  });

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
