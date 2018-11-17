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
    let imgDivCardTapada = $('<img />').attr('src', 'img/tapada.jpg');
    let divCardDestapada = $('<div></div>').addClass('card-destapada');
    let imgDivCardDestapada = $('<img/>').attr('src', imagenes[i].src);
    divCardDestapada.append(imgDivCardDestapada);
    divCardTapada.append(imgDivCardTapada);
    divCard.append(divCardTapada).append(divCardDestapada);
    $('.tablero').append(divCard);
  }
}
crearDivsDestapada();