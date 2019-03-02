let infoData = {};

function leerArchivo(leerParam){
  //Inicializa los filtros
  filtros = leerParam
  $.ajax({
    url: "buscador.php",
    dataType: "json",
    data: {'filtros': JSON.stringify(filtros)},
    type: 'post',
    cache: false,
    success: (response) => {
      infoData = (response);
      //Muestra el listado de propiedades que retorno con los filtros ya aplicados
      mostrarResultados();
    },
    error: (response) => {console.log(response)}
  })
}

function mostrarResultados() {
  //Elimina los resultados previos
  $('.resultadoBusqueda').html("");

  //Limpia los listados de filtros
  $('#selectCiudad option').slice(1).remove();
  $('#selectTipo option').slice(1).remove();
  $('select').material_select();

  //Se crean los filtros de ciudad y tipo
  $.each(infoData['listado_ciudades'], (key, ciudad) => {$('#selectCiudad').append(`<option value="${ciudad}">${ciudad}</option>`);});
  try{
      $('#selectCiudad').val(infoData['filtros']['ciudadSeleccionada']);
  }
  catch{
    $('#selectCiudad').val("");
  }

  $.each(infoData['listado_tipo'], (key, tipo) => {$('#selectTipo').append(`<option value="${tipo}">${tipo}</option>`);});
  try{
      $('#selectTipo').val(infoData['filtros']['tipoSeleccionado']);
  }
  catch{
    $('#selectTipo').val("");
  }

  $('select').material_select();

  //Se actualizan precios del filtro de busqueda
  $("#rangoPrecio").data("ionRangeSlider").update({
    min: 0,
    max: infoData['precios']['max'],
    from: infoData['filtros']['precioMinSeleccionado'],
    to: infoData['filtros']['precioMaxSeleccionado']
  })

  //Se recorren las propiedades para mostrarlas
  $.each(infoData['listado_propiedades'], (key, propiedad) => {
    let divPropiedad = `<div class="row card itemMostrado">
                          <div class="col l4">
                            <img src="img/home.jpg">
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
                                <h5><a href="">VER MÁS</a></h5>
                              </div>
                            </div>
                          </div>
                        </div>`;
    $('.resultadoBusqueda').append(divPropiedad);
  })
}

$(document).ready(() => {
  //Carga el listado por defecto
  leerArchivo({});

  $("#mostrarTodos").click((e)=>{
    e.preventDefault();
    leerArchivo({});
  })

  $("#submitButton").click((e)=>{
    e.preventDefault();
    let parametros = {};
    //Inicializa parametros para buscar propiedades con filtros
    if ($('#selectCiudad').val() != null) parametros['ciudad'] = $('#selectCiudad').val();
    if ($('#selectTipo').val() != null) parametros['tipo'] = $('#selectTipo').val();
    parametros['precioMin'] = $("#rangoPrecio").data("from");
    parametros['precioMax'] = $("#rangoPrecio").data("to");
    leerArchivo(parametros);
  })

 });
