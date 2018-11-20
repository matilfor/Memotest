$('.main-container').hide();

let jugadores = []; //para guardar cada jugador en un array de objetos y que se vea en el ranking final

function loginJugador(){
  let nombre = $('#name').val();
  let nivel = $('.niveles').attr('text'); //sacar el texto dentro del p niveles?
  let intentos = 0;
  const jugador =  { //lo uso para el ranking. lo guardo acá o en otro lado? cómo lo guardo en el array jugadores?
    nombre: nombre,
    nivel: nivel,
    intentos: intentos
    }
  $("#facil").on("click", function() { 
      intentos = 18
      if (nombre){
        $('.main-container').show();
        $('.saludo').prepend('<p class="saludos">¡Hola ' + nombre +'!</p>')
        $('.nivel').prepend('<p class="niveles"> FACIL </p>')
        $('.num-intentos').text('18');
      } else {
        $('.error').show();
      }
  });
  $("#intermedio").on("click", function() { 
      intentos = 12
      if (nombre){
        $('.main-container').show();
        $('.saludo').prepend('<p class="saludos">¡Hola ' + nombre +'!</p>')
        $('.nivel').prepend('<p class="niveles"> INTERMEDIO </p>')
        $('.num-intentos').text('12');
      } else {
        $('.error').show();
      }
  });
 $("#experto").on("click", function() { 
      intentos = 9
      if (nombre){
        $('.main-container').show();
        $('.saludo').prepend('<p class="saludos">¡Hola ' + nombre +'!</p>')
        $('.nivel').prepend('<p class="niveles"> EXPERTO </p>')
        $('.num-intentos').text('9');
      } else {
        $('.error').show();
      }
  });
}

//como vuelvo a ingresar un nombre luego de que me muestre mensaje de error?
//no me toma bien el valor del input cuando ingreso más de una vez. tengo que actualizar para que vuelva a 0.

const imagenes = [
  {id: "img1", src: 'img/alce.jpg'},
  {id: "img2", src: 'img/epelante.jpg'},
  {id: "img3", src: 'img/nena.jpg'},
  {id: "img4", src: 'img/peces.jpg'},
  {id: "img5", src: 'img/unichancho.jpg'},
  {id: "img6", src: 'img/zapas.jpg'},
  {id: "img7", src: 'img/alce.jpg'},
  {id: "img8", src: 'img/epelante.jpg'},
  {id: "img9", src: 'img/nena.jpg'},
  {id: "img10", src: 'img/peces.jpg'},
  {id: "img11", src: 'img/unichancho.jpg'},
  {id: "img12", src: 'img/zapas.jpg'},
]

function shuffle(a) {
  for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function crearDivsDestapada(){
  for (let i = 0; i < imagenes.length; i++){
    let divCard = $('<div></div>').addClass('card');
    let divCardTapada = $('<div></div>').addClass('card-front');
    let imgDivCardTapada = $('<img/>').attr('src', 'img/tapada.jpg');
    let divCardDestapada = $('<div></div>').addClass('card-back');
    let imgDivCardDestapada = $('<img/>').attr('src', imagenes[i].src);
    divCardDestapada.append(imgDivCardDestapada);
    divCardTapada.append(imgDivCardTapada);
    divCard.append(divCardTapada).append(divCardDestapada);
    $('.tablero').append(divCard);
  }
}

//el click lo hago en el div contenedor de los dos divs front y back? o sea en el div card?
function jugar(){
  for (i=0; i < imagenes.length; i++){
    let card1 = null;
    let card2 = null;
    let clicks = 0;
    let totalClicks = 0;
    $('.card').on('click', function(){
      const imgsrc = $(this).children.attr('src');
      const idcard = $(this).children.attr('id');
      clicks = clicks + 1
      if (clicks == 1) {
      card1 = {src: imgsrc, id: idcard}
      }else if (clicks == 2){
      card2 = {src: imgsrc, id: idcard}
      $('.intentos').prepend('<p class="intento"> Intentos: ' + totalClicks + '</p>'); //no funciona
      if (card1.src == card2.src && card1.id == card2.id){
      //algo
      }else{
        card1, card2 = $(idcard).attr('src', 'images/tapada.jpg');
      }
      clicks = 0; 
      }
    });
  }
}

loginJugador();
shuffle(imagenes);
crearDivsDestapada();
jugar();

