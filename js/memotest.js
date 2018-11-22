const jugadorData = {
  nombre: '',
  nivel: '',
  intentos: 0,
}

const niveles = [
  {nivel: 'FACIL', intentos: 18},
  {nivel:'INTERMEDIO', intentos: 12},
  {nivel: 'EXPERTO', intentos: 9}
];

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
    jugadorData.nivel = niveles[0].nombre;
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
    jugadorData.nivel = niveles[1].nombre;
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
    jugadorData.nivel = niveles[2].nombre;
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
    let imgDivCardFront = $('<img/>').attr('src', 'img/tapada.jpg');
    let divCardBack = $('<div></div>').addClass('card-back');
    let imgDivCardBack = $('<img/>').attr('src', imagenes[i].src);
    divCardBack.append(imgDivCardBack);
    divCardFront.append(imgDivCardFront);
    divCard.append(divCardFront).append(divCardBack);
    $('.tablero').append(divCard);
  }
}

function jugar(niveles){
    let card1 = null;
    let card2 = null;
    let clicks = 0;
    //let totalClicks = []; es necesario usar arrays o puedo con dos variables?
    let numIntentos = niveles.intentos;
    $('.card').on('click', function(){
      const imgsrc = $(this).children.attr('src');
      const idcard = $(this).children.attr('id');
      clicks ++;
      if (clicks == 1) {
      card1 = {src: imgsrc, id: idcard}
      }else if (clicks == 2){
      card2 = {src: imgsrc, id: idcard}
      numIntentos -- //como hago para muestre intentos de manera incremental
      $('.contador-intentos').text(numIntentos);
      if (card1.src == card2.src && card1.id == card2.id){
      card1.addClass('grayscale');
      card2.addClass('grayscale');
      }else{
        card1, card2 = $(idcard).attr('src', 'images/tapada.jpg');
        setTimeout(function(){ 
          clicks = 0; 
        },500)
      }
      }
    });
  }


comienzo();
loginJugador();
shuffle(imagenes);
crearTablero();
jugar();

