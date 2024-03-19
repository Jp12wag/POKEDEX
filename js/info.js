/*Constantes  */
const listaPokemon = document.querySelector('#listaPokemon');
const urlParams = new URLSearchParams(window.location.search);
const pokemonId = urlParams.get('id');

// Ahora puedes usar el ID del Pokémon según sea necesario
console.log("ID del Pokémon:", pokemonId);


//Url de la api
let Url = "https://pokeapi.co/api/v2/pokemon/" + pokemonId;
 fetch(Url).then((response) => response.json()).then(data => mostrarPokemones(data))


//fin del ciclo 
//funcion mostrar pokemones 
async function mostrarPokemones(data) {

    let claseColores = data.types.map((type) => type.type.name);

    let pokeId = data.id.toString();

    if (pokeId.length === 1) {
        pokeId = "00" + pokeId;
    } else if (pokeId.length === 2) {
        pokeId = "0" + pokeId;

    } else {

        pokeId;
    }
    const div = document.createElement('div');
    div.classList.add("pokemon");
    div.innerHTML = `<div class="contenedora ${claseColores[0]}">
                        <div class="nombreContenedora">
                        <h2 class="tamano">${data.name}</h2>
                        <p class="id">#${pokeId}</p>         
                        </div>
                        <div class="contendedoraImagen">
                            <img class="imagenCentrada" src="${data.sprites.other["official-artwork"].front_shiny}" alt="${data.name}" alt="Pokebola cerrada">
                        </div>
                       
                        <div class="informacionContenedora">
                            
                         <h2 class="ataquesInfo">Tipos</h2>
                          <div class="pokemon-tipos">
                            <p class="${claseColores[0]} tipo">${claseColores[0]} </p>
                            <p class="${claseColores[1]} tipo">${claseColores[1]}</p>
                             </div>
                             <h2 class="ataquesInfo">Estados</h2>
                          <div class="estadistica ${claseColores[0]}">
                            <label for="nameHp">Hp:${data.stats['0'].base_stat}<input type="range" id="nameHp" name="nameHp" min="0" maxlength="150" value="${data.stats['0'].base_stat}"></label>
                            <label for="nameAtack">Attack:${data.stats['1'].base_stat}<br><input type="range" id="nameAtack" name="nameAtack" min="0" maxlength="150" value="${data.stats['1'].base_stat}"></label>
                            <label for="namedefense">Defense:${data.stats['2'].base_stat}<br><input type="range" id="namedefense" name="namedefense" min="0" maxlength="150" value="${data.stats['2'].base_stat}"></label>
                            <label for="nameSpecial-attack">Special-attack:${data.stats['3'].base_stat}<br><input type="range" id="nameSpecial-attack" name="nameSpecial-attack" min="0" maxlength="150" value="${data.stats['3'].base_stat}"></label>
                            <label for="nameSpecial-defense">special-defense:${data.stats['4'].base_stat}<br><br><input type="range" id="nameSpecial-defense" name="nameSpecial-defense" min="0" maxlength="150" value="${data.stats['4'].base_stat}"></label>
                            <label for="nameSpeed">Speed:${data.stats['5'].base_stat}<br><br><input type="range" id="nameSpeed" name="nameSpeed" min="0" maxlength="150" value="${data.stats['5'].base_stat}"></label>
                          </div>
                         
                        </div>
                    </div>
                    </div>`;

                    listaPokemon.append(div);
}      