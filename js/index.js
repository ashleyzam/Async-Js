// Variable global de nuestra url base, por si necesitamos hacer otras peticiones como lo pueden ser: POST, PUT, DELETE o, simplemente necesitamos otra petición GET con distintos ENDPOINTS/QUERYPARAMS.
const BASE_URL = "https://rickandmortyapi.com/api";

// función que nos ahorra hacer una variable global por cada elemento que necesitemos traer del dom.
const queryId = (id) => document.getElementById(id);

// Como charlamos muchas veces JavaScript es un lenguaje síncrono, por lo cual, ejecuta línea por línea de código. Entonces, bloqueará el código la función setTimeout siendo esta, una función asíncrona? 🤨🤔
console.log("1");
console.log("2");
// Pos claro ¡No! lo que ocurre es que ​​JS empieza a leer la secuencia de código de arriba a abajo, y cuando llega al ​setTimeout, ​lo coloca en otra línea secuencial y sigue leyendo el código.😉
setTimeout(() => {
  console.log("bloqueo el código?");
}, 2000);
console.log("3");
console.log("4");

const persons = [
  {
    name: "Ashley",
    age: 24,
    petName: "Dior",
  },
  {
    name: "Jane Doe",
    age: 28,
    petName: "Garfield",
  },
];

// con destructuring podemos extraer de una manera más rapida a las propiedades o datos de un array u objeto o ambos combinados, simplemente lo que hacemos es (dentro de la iteración, porque si no no podríamos acceder a las propiedades, ya que se encuentran dentro de un array y si o si van a necesitar recorrerlo) asignarlos a una variable y decirle que será igual a nuestro array, en este caso persons[i].
for (let i = 0; i < persons.length; i++) {
  const { name, age, petName } = persons[i];
  console.log(
    `Hola, mi nombre es ${name} tengo ${age} años y mi mascota se llama ${petName} ♥`
  );
}
// for of cumple la misma función que un for común, simplemente cambia la sintaxis, salteamos lo que sería inicializar la variable en 0, en este caso la variable sería el singular de lo que sería nuestro array, evitamos decirle el length del nuestra matriz como así también la cantidad de veces que se tiene que incrementar. Podemos hacer el destructuring dentro de las {} si no directamente dentro del for así: for(const { name, age, petName } of persons){}
for (const person of persons) {
  const { name, age, petName } = person;
  console.log(
    `Hola, mi nombre es ${name} tengo ${age} años y mi mascota se llama ${petName} ♥`
  );
}

const getData = () => {
  // acá concatenamos nuestra variable base url con su respectivo endpoint (character). fetch traducción de buscar mandará a pedir esos datos
  fetch(`${BASE_URL}/character`)
    // Devuelve una promesa que se resuelve con el resultado de analizar el texto del cuerpo como JSON. Tengan en cuenta que, a pesar de que se nombra json() NO es formato json sino el resultado de tomar JSON como entrada y analizarlo para producir un objeto JavaScript.
    .then((response) => response.json())
    // aca finalmente poseemos esa data para poder mostrarla en un console.log() o en pantalla, que sería nuestro objetivo.
    .then((data) => showData(data.results))
    // con el .catch pordemos agarrar el error, de haberlo, se puede mostrar en consola o generar html para mostrarlo en el navegador, este error puede ser, por ejemplo, que la url esté mal escrita.
    .catch((err) => showError(err));
};
getData(); // ← recuerden ejecutar sus funciones

// characters sería el dato que me devuelve la petición en este caso sería results: un array. Entonces se lo paso como parámetro a mi función que después ejecuto dentro de la función donde recibo la data. Entonces simplemente queda iterar y mostrar lo que querramos dentro de nuestro html creado desde JS. Excelente, ya creamos nuestro primer conjunto de cards desde una api request 👏
const showData = (characters) => {
  for (const {
    created,
    name,
    gender,
    image,
    origin,
    species,
    status,
  } of characters) {
    queryId("card_container").innerHTML += `
                <div class="card">
                    <img src="${image}" class="card-img-top" alt="Image of ${name} of the tv show Rick & Morty">
                    <div class="card-body">
                        <h5 class="card-title">${name}</h5>
                        <p class="card-text">${created}</p>
                        <p class="card-text">${gender}</p>
                        <p class="card-text">${origin.name}</p>
                        <p class="card-text">${species}</p>
                        <p class="card-text">${status}</p>
                        <button class="btn btn-primary" id="btn">See Detail</button>
                    </div>
                </div>
  `;
  }
};
// como plus SIEMPRE lean documentación por que NO todas las apis son iguales, cada una tiene su documentación en cuanto a endpoints, filtrados etc.
