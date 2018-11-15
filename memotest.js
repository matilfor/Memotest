const imagenes = [
  {nombre: "img1", id: 'img/alce.jpg'},
  {nombre: "img2", id: 'img/epelante.jpg'},
  {nombre: "img3", id: 'img/nena.jpg'},
  {nombre: "img4", id: 'img/peces.jpg'},
  {nombre: "img5", id: 'img/unichancho.jpg'},
  {nombre: "img6", id: 'img/zapas.jpg'},
  {nombre: "img7", id: 'img/alce.jpg'},
  {nombre: "img8", id: 'img/epelante.jpg'},
  {nombre: "img9", id: 'img/nena.jpg'},
  {nombre: "img10", id: 'img/peces.jpg'},
  {nombre: "img11", id: 'img/unichancho.jpg'},
  {nombre: "img12", id: 'img/zapas.jpg'},
]

function shuffle(a) {
  for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

shuffle(imagenes);

var divsCard = $('.card');

for (let i = 0; i < divsCard.length; i++) {
    let divDestapada = $('<div></div>').addClass('card-destapada');
    let imgDestapada = $('<img />').attr('src', imagenes[i]);
    divDestapada.append(imgDestapada);
    divsCard.eq(i).append(divDestapada);
  }

function validarNombre(){
    var nombre = $("#inputNombre").val();
    if (nombre === ""){
        $('.error').show();
    }
}