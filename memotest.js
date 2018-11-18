$('.main-container').hide();

let jugadores = []; //para guardar cada jugador en un array de objetos y que se vea en el ranking final


function jugar(){
  let nombre = $('#name').val();
  let nivel = $();//tomo el valor de cada botón? con su id? cómo?
  let intentos = $();//de dónde saco este valor?
  const jugador =  {
    nombre: nombre,
    nivel: nivel,
    intentos: intentos
    }

  $("#facil").on("click", function() { 
      nivel = 18
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
      nivel = 12
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
      nivel = 9
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
//como evito tener que hacer un funcion para cada boton para mostrar el nivel y cantidad de intentos?

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

shuffle(imagenes);

function crearDivsDestapada(){
  for (let i = 0; i < imagenes.length; i++){
    let divCard = $('<div></div>').addClass('card');
    let divCardTapada = $('<div></div>').addClass('card-tapada');
    let imgDivCardTapada = $('<img/>').attr('src', 'img/tapada.jpg');
    let divCardDestapada = $('<div></div>').addClass('card-destapada');
    let imgDivCardDestapada = $('<img/>').attr('src', imagenes[i].src);
    divCardDestapada.append(imgDivCardDestapada);
    divCardTapada.append(imgDivCardTapada);
    divCard.append(divCardTapada).append(divCardDestapada);
    $('.tablero').append(divCard);
  }
}

let clicks = 0;

jugar();
crearDivsDestapada();

