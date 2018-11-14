const imagenes = [
  'img/alce.jpg',
  'img/epelante.jpg',
  'img/nena.jpg',
  'img/peces.jpg',
  'img/unichancho.jpg',
  'img/zapas.jpg',
]

//imagenes.shuffle();
imagenes.shuffle = function () {
    var k, t, len;
    len = this.length;
    if (len < 2) {
      return this;
    }
    while (len) {
      k = Math.floor(Math.random() * len--);
      t = this[k];
      while (k < len) {
        this[k] = this[++k];
      }
      this[k] = t;
    }
    return this;
  };

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