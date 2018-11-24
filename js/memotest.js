const jugadorData = { //para mostrar esta info en el ranking?
  nombre: '',
  nivel: '',
  intentos: 0,
}

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
  //$('#ranking').hide(); este será el modal
}

function loginJugador(){
  $("#facil").on("click", function() { 
    let nombre = $('#name').val();
    jugadorData.nombre = nombre;
    jugadorData.nivel = 'facil';
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
    let nombre = $('#name').val();
    jugadorData.nombre = nombre;
    jugadorData.nivel = 'intermedio';
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
    let nombre = $('#name').val();
    jugadorData.nombre = nombre;
    jugadorData.nivel = 'experto';
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

function shuffle(a) {
  for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function crearTablero(){
  for (let i = 0; i < imagenes.length; i++){
    let divCard = $('<div></div>').addClass('card');
    let divCardFront = $('<div></div>').addClass('card-front');
    let imgSrcCardFront = $('<img/>').attr('src', 'img/tapada.jpg');
    let divCardBack = $('<div></div>').addClass('card-back');
    let imgSrcCardBack = $('<img/>').attr('src', imagenes[i].src);
    divCardFront.append(imgSrcCardFront);
    divCardBack.append('<img id="' + imagenes[i].id + '" src="' + imagenes[i].src + '" />');
    divCard.append(divCardFront).append(divCardBack);
    $('.tablero').append(divCard);
  }
}

function jugar(niveles){
  console.log('entró a jugar');
  let card1 = null;
  let card2 = null;
  let clicks = 0;
  $('.card').on('click', function(){
    let numIntentos = niveles[jugadorData.nivel];
    const imgsrc = $(this).children('.card-back').children().attr('src'); 
    const idcard = $(this).children('.card-back').children().attr('id');
    if($(this).children().eq(0).hasClass('card-front')){
      $(this).children().eq(0).removeClass('card-front')
      $(this).children().eq(0).addClass('hidden')

    }else{
      $(this).children().eq(0).addClass('card-back')
      $(this).children().eq(0).removeClass('card-front')
      $(this).children().eq(0).addClass('hidden')
    }
    clicks ++;
    if (clicks == 1) {
      card1 = {src: imgsrc, id: idcard}
    }else if (clicks == 2){
      card2 = {src: imgsrc, id: idcard}
      numIntentos -- 
      $('.contador-intentos').text(numIntentos);
      console.log(card1, card2)
      if (card1.src == card2.src && card1.id != card2.id){
        console.log('Entro')
        //match = 1 - crear variable para contar los matchs
        //como hago para que se de vuelta luego de clickearla
        $('#' + card1.id).addClass('grayscale'); 
        $('#' + card2.id).addClass('grayscale');
      }else{
        card1, card2 = $(idcard).attr('src', 'images/tapada.jpg');
        setTimeout(function(){ 
          clicks = 0; 
        },500)
      }
    }
  });
  return;
}

//codigo para determinar si ganó o no. con otro if?
    //mostrarModal();

function mostrarModal(){ //como muestro el modal
  $('modal-container').hide();
  $('.volver-jugar').on('click', function(){
    $('.modal-container').show();
    $('.card').remove();
    comienzo();
});
}

comienzo();
loginJugador();
shuffle(imagenes);
crearTablero();
jugar(niveles);

//location.reload() para reiniciar el juego en los botones de los modal