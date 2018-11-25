let cantIntentos = 0;
let cantClicks = 0;
let totalClicks = 0;
let primerCartaClickeada;
let primerCartaId;
let segundaCartaClickeada;
let segundaCartaId;
let matchs = 0;
let nivel;
let nombre;
let puntaje;

const niveles = 
  {facil: 18,
  intermedio: 12,
  experto: 9};

const imagenes = [
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

function comienzo(){
  $('.inicio').show();
  $('.error').hide();
  $('.main-container').hide();
  $('#game-over').hide();
  $('.images').removeClass('gris');
  //$('.buttonDifficulty').prop('disabled', false); que es esto?
  //isSelected = false; qué es esto?
  //$('#ranking').hide(); este será el modal
}

function loginJugador(){
  $("#facil").on("click", function() { 
    nombre = $('#name').val();
    nivel = 'facil';
      if (nombre){
        $('.inicio').hide();
        $('.main-container').show();
        $('.saludo').prepend('<p class="saludos">¡Hola ' + nombre +'!</p>')
        $('.nivel').prepend('<p class="niveles"> FACIL </p>')
        $('.num-intentos').text('18');
      } else {
        $('.error').show();
        return;
      }
  });
  $("#intermedio").on("click", function() { 
    nombre = $('#name').val();
    nivel = 'intermedio';
      if (nombre){
        $('.inicio').hide();
        $('.main-container').show();
        $('.saludo').prepend('<p class="saludos">¡Hola ' + nombre +'!</p>')
        $('.nivel').prepend('<p class="niveles"> INTERMEDIO </p>')
        $('.num-intentos').text('12');
      } else {
        $('.error').show();
        return;
      }
  });
  $("#experto").on("click", function() { 
    nombre = $('#name').val();
    nivel = 'experto';
      if (nombre){
        $('.inicio').hide();
        $('.main-container').show();
        $('.saludo').prepend('<p class="saludos">¡Hola ' + nombre +'!</p>')
        $('.nivel').prepend('<p class="niveles"> EXPERTO </p>')
        $('.num-intentos').text('9');
      } else {
        $('.error').show();
        return;
      }
  });
}

function shuffle(imagenes) {
  for (let i = imagenes.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [imagenes[i], imagenes[j]] = [imagenes[j], imagenes[i]];
  }
  return imagenes;
}

function crearTablero(){
  for (let i = 0; i < imagenes.length; i++){
    let divCard = $('<div></div>').addClass('card');
    let divCardFront = $('<div></div>').addClass('card-front');
    let imgCardFront = $('<img/>').attr('src', 'img/tapada.jpg');
    let divCardBack = $('<div></div>').addClass('card-back');
    let imgCardBack = $('<img/>').attr('src', imagenes[i].src);
    divCard.append(divCardFront).append(divCardBack); 
    divCardFront.append(imgCardFront);
    divCardBack.append(imgCardBack);
    divCardBack.data('id', imagenes[i].id);;
    $('.tablero').append(divCard);
  }
}

function jugar(){
  console.log('entro')
  primerCartaClickeada = null;
  segundaCartaClickeada = null;
  cantClicks = 0;
  $('.card').on('click', function(){
    cantClicks ++;
    if (cantClicks === 1) {
      primerCartaClickeada = $(this).attr('src');
      primerCartaId = $(this).data('id');
    } else {
      if (primerCartaClickeada !== $(this).data('id')) {
        segundaCartaClickeada = $(this).attr('src');
        segundaCartaId = $(this).data('id');
        cantClicks++;
        $('.contador-intentos').text('Intentos: Nº ' + totalClicks);
        if (primerCartaClickeada !== segundaCartaClickeada) {
          setTimeout(function() {
            primerCartaClickeada = $(`#${primerCartaId}`).attr('src', 'images/tapada.jpg');
            segundaCartaClickeada = $(`#${segundaCartaId}`).attr('src', 'images/tapada.jpg');
          }, 500)
        } else {
          if (primerCartaId !== segundaCartaId) {
            primerCartaClickeada = $(`#${primerCartaId}`).addClass('gris');
            segundaCartaClickeada = $(`#${segundaCartaId}`).addClass('gris');
            $('#' + primerCartaId).off('click');
            $('#' + segundaCartaId).off('click');
            matchs++
          }
        }
        cantClicks = 0;
      }
    }
    ganaPierde();
  })
  }

function ganaPierde(){
  console.log('entro');
  if (matchs < 6) {
    if (cantClicks == 18  && cantIntentos == 18) {
      $('.p-mensaje').html('Perdiste! 😢');
      $('#game-over').removeClass('hidden');
      //$('.buttonDifficulty').prop('disabled', false);
    } else if (cantClicks == 12 && cantIntentos == 12) {
      $('.p-mensaje').html('Perdiste! 😢');
      $('#game-over').removeClass('hidden');  
      //$('.buttonDifficulty').prop('disabled', false); 
    } else if (cantClicks == 9  && cantIntentos == 9) {
      $('.p-mensaje').html('Perdiste! 😢');
      $('#game-over').removeClass('hidden');
      //$('.buttonDifficulty').prop('disabled', false);
    }
  } else {
    if (matchs === 6) {
      $('.p-mensaje').html(`Ganaste 🎉 ! con ${totalClicks} intentos.`);
      $('#gameOver').removeClass('hidden');
      //$('.buttonDifficulty').prop('disabled', false);
    }   
  }
}

function jugarDeNuevo(){
  $('#volver-jugar').on('click', function () {
    cantIntentos = 0;
    cantClicks = 0;
    totalClicks = 0;
    primerCartaClickeada = "";
    primerCartaId = "";
    segundaCartaClickeada = "";
    segundaCartaId = "";
    matchs = 0;
    nombre = $('#name').val("");
  })
}

comienzo();
loginJugador();
shuffle(imagenes);
crearTablero();
jugar();
jugarDeNuevo();

//location.reload() para reiniciar el juego en los botones de los modal