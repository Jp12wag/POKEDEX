/*Constantes  */
const listaPokemon = document.querySelector('#listaPokemon');
const botonesCabecera = document.querySelectorAll('.btn-header');
const nuevaListaPokemon = document.querySelector('#nuevaListaPokemon');
const navegador = document.querySelector('.header');
const BuscarPokemon = document.querySelector('#search');
const Buscar=document.querySelector('.Busqueda');


//Url de la api
let Url = "https://pokeapi.co/api/v2/pokemon/";

//nueva funcion

// Función para cargar un Pokémon por su número
async function cargarPokemon(numero) {
    try {
        const response = await fetch(Url + numero);
        const data = await response.json();
        mostrarPokemones(data);
    } catch (error) {
        console.error(`Error al cargar el Pokémon ${numero}:`, error);
    }
}
// Array para almacenar todas las promesas de carga de Pokémon
const promesas = [];

// Ciclo para crear las promesas de carga de Pokémon del 1 al 151
for (let i = 1; i <= 151; i++) {
    promesas.push(cargarPokemon(i));
}

// Esperar a que todas las promesas se resuelvan
Promise.all(promesas).then(() => console.log("Todos los Pokémon cargados exitosamente"))
    .catch(error => console.error("Error al cargar los Pokémones:", error));


//funcion mostrar pokemones 
function mostrarPokemones(data) {

    //let tipos = data.types.map((type) => `<p class="${type.type.name} tipo">${type.type.name}</p>`);
    let claseColores = data.types.map((type) => type.type.name);

    let pokeId = data.id.toString();

    pokeId = pokeId.padStart(3, "0");

    const div = document.createElement('div');
    div.classList.add("pokemon");
    div.innerHTML = `
        <div class="pokebola cerrada ${claseColores[0]}">
        <div class"divtamanoLeft ${claseColores[0]}">
        <img src="images/pokebola-cerrada.png" alt="Pokebola cerrada">
        <p class="pokemon-frontal">${"#" + pokeId}</p>
        </div>
        <div class"divtamanoRigt ${claseColores[1]}">
        <h2 class="pokemon-nombre poNombre">${data.name}</h2>
        </div>
      
            </div>
            <div class="pokebola abierta">
            <div class="pokemonImagen">
             <img src="${data.sprites.other["official-artwork"].front_default}" alt="${data.name}">
             </div>                   
                <div class="informacionPokemon">
                <div class="contendedor-nombre">
                <p class="pokemon-id">${"#" + pokeId}</p>
                <h2 class="pokemon-nombre">${data.name}</h2>
        </div>
        <div class="pokemon-tipos">
       <p class="${claseColores[0]} tipo">${claseColores[0]}</p>
       <p class="${claseColores[1]} tipo">${claseColores[1]}</p>
        </div>
        <div class="pokemon-status">
        <p class="status">${data.height + "M"}</p>
        <p class="status">${data.weight + "KG"}</p>
        <div><button class="btn btn-header btncolor" id="abrirVentana">Mas info</button></div>
        </div>
        </div>
    </div>`;

    listaPokemon.append(div);


    const abrirVentanaButton = div.querySelector("#abrirVentana");


    abrirVentanaButton.addEventListener("click", function () {

        //buscador
        const acumuladorBusqueda=Buscar.classList;
        //navegado
        const acumulador = navegador.classList;
        const pokemonId = data.id;
        const clasesArray = Array.from(acumulador);
        const claseArrayBusqueda=Array.from(acumuladorBusqueda);
        navegador.classList.remove(clasesArray[1]);
        Buscar.classList.remove(claseArrayBusqueda[1]);

        
        navegador.classList.add(claseColores[0]); // Agregar la clase de color aleatorio
        Buscar.classList.add(claseColores[0]);
        //  al hacer clic en el botón
        const url = `informacion.html?id=${pokemonId}`;
        // Abrir la ventana emergente
        const popupWindow = window.open(url, "Informacion Pokemon", "resizable,status");
        // Verificar si la ventana emergente fue bloqueada por el navegador
        if (!popupWindow || popupWindow.closed || typeof popupWindow.closed == 'undefined') {
            alert("La ventana emergente fue bloqueada por el navegador. Por favor, habilite las ventanas emergentes para ver la información.");
        }
    });

}


botonesCabecera.forEach(boton => boton.addEventListener("click", async (event) => {
    const botonId = event.currentTarget.id;

    listaPokemon.innerHTML = "";

    try {
        const response = await fetch(Url + '?limit=151');
        const { results } = await response.json();

        const promises = results.map(({ url }) => fetch(url).then(response => response.json()));
        const pokemones = await Promise.all(promises);

        for (const pokemon of pokemones) {
            const tipos = pokemon.types.map(({ type }) => type.name);
            if (botonId === "ver-todos" || tipos.includes(botonId)) {
                mostrarPokemones(pokemon);
            }
        }
    } catch (error) {
        console.error("Error al obtener  Pokemon: ", error);
    }
}));


//metodo input al 
BuscarPokemon.addEventListener("input", async function (e) {
    try {
        let valorPokemon = e.target.value.trim().toLowerCase();
        listaPokemon.innerHTML = "";

        if (valorPokemon === "") {
            
            return;
        }

        let urlPokemon = `https://pokeapi.co/api/v2/pokemon/${valorPokemon}`;

        const response = await fetch(urlPokemon);
        if (!response.ok) {
            throw new alert( Error('No se encontró el Pokemon'));
        }

        const data = await response.json();
        mostrarPokemones(data);
    } catch (error) {
        if (error instanceof TypeError) {
            console.error("Error de tipo:", error.message);
        } else if (error instanceof SyntaxError) {
            console.error("Error de sintaxis:", error.message);
        } else {
            console.error("Error inesperado:", error.message);
        }
    }
});



