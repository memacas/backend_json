/*
  Creación de una función personalizada para jQuery que detecta cuando se detiene el scroll en la página
*/
$.fn.scrollEnd = function(callback, timeout) {
  $(this).scroll(function(){
    var $this = $(this);
    if ($this.data('scrollTimeout')) {
      clearTimeout($this.data('scrollTimeout'));
    }
    $this.data('scrollTimeout', setTimeout(callback,timeout));
  });
};
/*
  Función que inicializa el elemento Slider
*/

function inicializarSlider(){
  $("#rangoPrecio").ionRangeSlider({
    type: "double",
    grid: false,
    min: 0,
    max: 100000,
    from: 200,
    to: 80000,
    prefix: "$"
  });
}
/*
  Función que reproduce el video de fondo al hacer scroll, y deteiene la reproducción al detener el scroll
*/
function playVideoOnScroll(){
  var ultimoScroll = 0,
      intervalRewind;
  var video = document.getElementById('vidFondo');
  $(window)
    .scroll((event)=>{
      var scrollActual = $(window).scrollTop();
      if (scrollActual > ultimoScroll){
       video.play();
     } else {
        //this.rewind(1.0, video, intervalRewind);
        video.play();
     }
     ultimoScroll = scrollActual;
    })
    .scrollEnd(()=>{
      video.pause();
    }, 10)
}

inicializarSlider();
//playVideoOnScroll();

let infoData = {};

function leerArchivo(leerParam){
  filtros = {}
  $.ajax({
    url: "buscador.php",
    dataType: "json",
    data: {'filtros': JSON.stringify(filtros)},
    type: 'post',
    success: (response) => {
      infoData = (response);
      mostrarResultados();
    },
    error: (response) => {console.log(response)}
  })
}

function mostrarResultados() {
  //console.log(infoData);
  $('.resultadoBusqueda').html("");
  $.each(infoData, (key, propiedad) => {
    let divPropiedad = `<div class="row card itemMostrado">
                          <div class="col l4">
                            foto
                          </div>
                          <div class="col l8">
                            <div class="row">
                              <div class="col l12">
                                <div><strong>Dirección: </strong>${propiedad.Direccion}</div>
                                <div><strong>Ciudad: </strong>${propiedad.Ciudad}</div>
                                <div><strong>Teléfono: </strong>${propiedad.Telefono}</div>
                                <div><strong>Código postal: </strong>${propiedad.Codigo_Postal}</div>
                                <div><strong>Tipo: </strong>${propiedad.Tipo}</div>
                                <div><strong>Precio: </strong><span class="precioTexto">${propiedad.Precio}</span></div>
                              </div>
                            </div>
                            <div class="row">
                              <div class="col l12 right-align">
                                <h5>VER MÁS</h5>
                              </div>
                            </div>
                          </div>
                        </div>`;
    $('.resultadoBusqueda').append(divPropiedad);
    //console.log(divPropiedad);
    //return false;
  })
}

$(document).ready(() => {
  $('select').formSelect();
  leerArchivo({});
 });
