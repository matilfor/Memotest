let intentos = 0;
let clicks = 0;
let aciertos = 0;
let dosCartas = [];

const jugador = [];
const jugadorInfo = {
    nombre: '',
    nivel: '',
    intentos: 0
}

const niveles = [
  {nombre: 'FÁCIL', intentos: 18},
  {nombre:'INTERMEDIO', intentos: 14},
  {nombre: 'EXPERTO', intentos: 12}
];

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

const tapadaImg = {
  name: 'tapada',
  src: 'img/tapada.jpg'
};

function comienzo(){
  $('.inicio').show();
  $('.error').hide();
  $('.main-container').hide();
  $('#game-over').hide();
  $('.images').removeClass('gris');
  //$('#ranking').hide();
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
    let carta = $('<div class="card"></div>');
    let cartaTapadaDiv = $('<div class="cartaTapada"></div>');
    let cartaDestapadaDiv = $('<div class="cartaDestapada"></div>');
    let cartaTapadaImg = $('<img class="imgTapada" src="'+ tapadaImg.src + '">');
    let cartaDestapadaImg = $('<img class="imgDestapada" src="' + imagenes[i].src +'">');
    carta.append(cartaTapadaDiv);
    carta.append(cartaDestapadaDiv);
    cartaTapadaDiv.append(cartaTapadaImg);
    cartaDestapadaDiv.append(cartaDestapadaImg);
    $('.tablero').append(carta);
    cartaDestapadaDiv.data('name', imagenes[i].id);
  }
}

function jugar(){
  console.log('entro a jugar');
  intentos = 0;
  clicks = 0;
  aciertos = 0;
  dosCartas = [];
  $('.cartaDestapada').on('click', function(){
    console.log('entro al onclick');
    if (clicks <= (niveles.intentos * 2)){
      clicks++;
      $(this).addClass('visible')
      //$(this).parent().addClass('flip');
      dosCartas.push($(this));
      if (dosCartas.length === 2) {
          intentos++ ;
          if (dosCartas[0].data('src') === dosCartas[1].data('src') 
              && dosCartas[0].data('id') !== dosCartas[1].data('id')) {
              dosCartas[0].addClass('gris');
              dosCartas[1].addClass('gris');
              aciertos++;
              dosCartas = [];
          }
          else {
            setTimeout(function(){ 
              dosCartas[0].removeClass('visible')
              dosCartas[1].removeClass('visible')
              //dosCartas[0].parent().removeClass('flip')
              //dosCartas[1].parent().removeClass('flip')
              dosCartas = [];
            },800)
          }   
      }
  }
  $('.contador-intentos').text(intentos);
  })
  ganaPierde();
};

function ganaPierde(){
  console.log('entro a gana o pierde');
  if (aciertos === 6) {
    $('.p-mensaje').html(`Ganaste 🎉 ! con ${jugadorIntentos} intentos.`);
    $('#gameOver').show();
    jugadorInfo.intentos = jugadorIntentos;
    jugador.push(jugadorInfo);
    //storeUser(); para guardar en el local storage
  }
  if (clicks === (niveles.intentos * 2) && aciertos < 6){
    $('.p-mensaje').html('Perdiste! 😢');
    $('#game-over').show();
    //storeUser();
  }
  jugarDeNuevo();
}

function jugarDeNuevo(){
  $('#volver-jugar').on('click', function () {
    intentos = 0;
    clicks = 0;
    aciertos = 0;
    dosCartas = [];
    $('.card').remove();
  })
}

//function storeUser (){
  //var usersJSON = JSON.stringify(users);
  //localStorage.setItem('users', usersJSON);
  //usersJSON = localStorage.getItem('users');
  //users = JSON.parse(usersJSON);
//}

comienzo();
loginJugador();
shuffle(imagenes);
crearTablero();
jugar();

//location.reload() para reiniciar el juego en los botones de los modal