let clicks = 0; //guarda los clicks
let aciertos = 0; //guarda los aciertos (cuando dos cartas son iguales)
let dosCartas = []; //guarda las cartas clickeadas de a pares en el array, cada dos cartas clickeadas se suma un intento

const jugador = []; //guardo los jugadores en este array para poder guardarlos luego en el localStorage
const jugadorInfo = { //objeto con la información de cada persona que juega
    nombre: '',
    nivel: '',
    intentos: 0
}

const niveles = { //objeto con la información de cada nivel
  'FACIL': {
    'intentos': 18
  },
  'INTERMEDIO': {
    'intentos': 12
  },
  'EXPERTO': {
    'intentos': 9
  }
}
const imagenes = [ //array de las imágenes que se mostrarán en el tablero
  {id: '1', src: 'img/alce.jpg'},
  {id: '2', src: 'img/epelante.jpg'},
  {id: '3', src: 'img/nena.jpg'},
  {id: '4', src: 'img/peces.jpg'},
  {id: '5', src: 'img/unichancho.jpg'},
  {id: '6', src: 'img/zapas.jpg'},
  {id: '7', src: 'img/alce.jpg'},
  {id: '8', src: 'img/epelante.jpg'},
  {id: '9', src: 'img/nena.jpg'},
  {id: '10', src: 'img/peces.jpg'},
  {id: '11', src: 'img/unichancho.jpg'},
  {id: '12', src: 'img/zapas.jpg'},
]

const tapadaImg = { //objeto con la información de la imagen que se muestra para ocultar las otras imágenes del tablero
  name: 'tapada',
  src: 'img/tapada.jpg'
};

function comienzo(){
  $('.inicio').show();
  $('.error').hide();
  $('.main-container').hide();
  $('.images').removeClass('gris');
}

//de acuerdo al botón de la dificultad que clickee el jugador, se guardarán el nivel elegido y su nombre,
//dentro de las propiedades nivel y nombre del objeto JugadorInfo
function loginJugador(){ 
  $("#facil").on("click", function() { 
    jugadorInfo.nombre = $('#name').val(); 
    jugadorInfo.nivel = 'FACIL';
      if (jugadorInfo.nombre){
        $('.inicio').hide();
        $('.main-container').show();
        $('.saludo').prepend('<p class="saludos">¡Hola ' + jugadorInfo.nombre +'!</p>')
        $('.nivel').prepend('<p class="niveles"> FACIL </p>')
        $('.num-intentos').text('18');
      } else {
        $('.error').show();
        return;
      }
  });
  $("#intermedio").on("click", function() { 
    jugadorInfo.nombre = $('#name').val();
    jugadorInfo.nivel = 'INTERMEDIO';
      if (jugadorInfo.nombre){
        $('.inicio').hide();
        $('.main-container').show();
        $('.saludo').prepend('<p class="saludos">¡Hola ' + jugadorInfo.nombre +'!</p>')
        $('.nivel').prepend('<p class="niveles"> INTERMEDIO </p>')
        $('.num-intentos').text('12');
      } else {
        $('.error').show();
        return;
      }
  });
  $("#experto").on("click", function() { 
    jugadorInfo.nombre = $('#name').val();
    jugadorInfo.nivel = 'EXPERTO';
      if (jugadorInfo.nombre){
        $('.inicio').hide();
        $('.main-container').show();
        $('.saludo').prepend('<p class="saludos">¡Hola ' + jugadorInfo.nombre +'!</p>')
        $('.nivel').prepend('<p class="niveles"> EXPERTO </p>')
        $('.num-intentos').text('9');
      } else {
        $('.error').show();
        return;
      }
  });
}

//desordena el array con las imágenes para que aparezcan de manera aleatoria cada vez que comienza el juego
function shuffle(imagenes) { 
  for (let i = imagenes.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [imagenes[i], imagenes[j]] = [imagenes[j], imagenes[i]];
  }
  return imagenes;
}

//creo los divs que contendrán a las imágenes tapadas y destapadas (que son las que están dentro del array imagenes)
function crearTablero(){
  for (let i = 0; i < imagenes.length; i++){
    let carta = $('<div class="card"></div>');
    let cartaTapadaDiv = $('<div class="cartaTapada"></div>');
    let cartaDestapadaDiv = $('<div class="cartaDestapada"></div>');
    let cartaTapadaImg = $('<img class="imgTapada" src="'+ tapadaImg.src + '">');
    let cartaDestapadaImg = $('<img class="imgDestapada" src="' + imagenes[i].src +'">');
    carta.append(cartaTapadaDiv);
    carta.append(cartaDestapadaDiv);
    cartaTapadaDiv.append(cartaTapadaImg);
    cartaDestapadaDiv.append(cartaDestapadaImg);
    $('.tablero').append(carta); //una vez creados todos los divs con sus imágenes los meto dentro del div tablero
    cartaDestapadaDiv.attr('id', imagenes[i].id); //me guardo el id de cada carta del array imagenes (sirve para comparar luego)
  }
}

function jugar(){
  $('.cartaTapada').on('click', function(){
    if (clicks <= (niveles[jugadorInfo.nivel].intentos * 2)){
      clicks++; //cuento cada click siempre y cuando no me pase de la cantidad de intentos para cada nivel
      $(this).parent().addClass('visible'); //muestro la carta que está oculta (la destapada) y oculto la carta con clase tapada
      dosCartas.push($(this).next()); //guardo cada carta clickeada en el array
      if (dosCartas.length === 2) { //comparo la longitud del array, si tiene dos valores guardados,
          jugadorInfo.intentos = jugadorInfo.intentos + 1; //o sea, si clickeo dos cartas, sumo un intento
          //comparo el src de la imagen de cada carta guardada en el array para ver si son iguales o no y también comparo su id, 
          //para no clickear en la misma carta dos veces y que lo tome como un acierto
          if (dosCartas[0].children('img').attr('src') === dosCartas[1].children('img').attr('src')
          && dosCartas[0].attr('id') !== dosCartas[1].attr('id')) { 
              dosCartas[0].addClass('gris'); //si hubo un acierto coloreo con gris las dos cartas
              dosCartas[1].addClass('gris');//para que no se puedan volver a clickear
              aciertos++; //sumo un acierto
              dosCartas = []; //vacío el array para que no me guarde más de dos valores
          }
          else { //si no hubo acierto:
            setTimeout(function(){ 
              dosCartas[0].parent().removeClass('visible') //vuelvo a ocultar la carta destapada y mostrar la tapada
              dosCartas[1].parent().removeClass('visible')
              dosCartas = []; //vacío el array
            },800)
          }   
      }
      ganaPierde(); //llamo a la función que mostrará el modal con el mensaje de ganador o perdedor
  } 
  $('.contador-intentos').text('Intentos: ' + jugadorInfo.intentos); //muestro los intentos dentro del texto de este div
  }) 
};

function ganaPierde(){ //muestra el mensaje ganador o perdedor
  if (aciertos === 6) { //gana (tuvo 6 aciertos)
    $('#modal').removeClass('oculto');
    $('#gana').removeClass('oculto');
    $('.intentos-span').text(jugadorInfo.intentos).css('color', 'black');
    guardarJugador(); //guarda la info dentro de jugadorInfo en el local storage 
    armarRanking(); //muestra la info de los ganadores en una tabla dentro del modal
  }
  if (clicks === (niveles[jugadorInfo.nivel].intentos * 2) && aciertos < 6){ //pierde (superó el número de intentos disponibles)
    $('#modal').removeClass('oculto');
    $('#pierde').removeClass('oculto');
  }
}; 

function guardarJugador (){ //guardo la info de cada jugador en el localStorage
  let jugadorJSON = localStorage.getItem('jugador');
  if (jugadorJSON == null) {
    jugadorJSON = []
  } else {
    jugadorJSON = JSON.parse(jugadorJSON)
  }
  jugadorJSON.push(jugadorInfo);
  localStorage.setItem('jugador', JSON.stringify(jugadorJSON));
};

function armarTabla() { //armo la tabla que mostrará el ranking de ganadores (nombre, nivel y número de intentos)
  let tablaJugadores = $('<table id="tablaRanking"></table>')
  let cabecera = '<th>Nombre</th><th>Nivel</th><th>Intentos</th>'
  tablaJugadores.append(cabecera)
  let container = $('.ranking');
  container.append(tablaJugadores);
}

//ordeno la lista de jugadores guardada en localStorage de acuerdo al número de intentos que les llevó ganar el juego
//el que menos intentos usó para ganar va primero en el ranking
function armarRanking() { 
  let infoJugador = JSON.parse(localStorage.getItem('jugador'));
  let tablaJugadores = $('#tablaRanking');
  for (let i = 0; i < infoJugador.length; i++) {
    let nombreInfo = "<td>" + infoJugador[i].nombre + "</td>";
    let nivelInfo = "<td>" + infoJugador[i].nivel + "</td>";
    let intentosInfo = "<td>" + infoJugador[i].intentos + "</td>";
    let fila = $('<tr class="fila"></tr>');
    fila.append(nombreInfo);
    fila.append(nivelInfo);
    fila.append(intentosInfo);
    tablaJugadores.append(fila);
  }
} 

function jugarDeNuevo(){ //reinicia el juego
  $('.volver-jugar').on('click', function () {
    $('.card').remove();
    $('#modal').addClass('oculto');
    $('#gana').addClass('oculto');
    $('#pierde').addClass('oculto');
    clicks = 0;
    aciertos = 0;
    dosCartas = [];
    location.reload();
  })
}

comienzo();
loginJugador();
shuffle(imagenes);
crearTablero();
jugar();
armarTabla();
jugarDeNuevo();