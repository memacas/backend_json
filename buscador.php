<?php
  //if (isset($_POST['filtros']))
    //print_r($_POST['filtros']);
  $contenido = file_get_contents("data-1.json");
  $listado_propiedades = json_decode($contenido, true);
  $retorno = "";
  if (isset($_POST['filtros'])){
    $filtros = (json_decode($_POST['filtros'], true));
    //echo count($filtros);
    if (count($filtros) > 0){
      $retorno = $filtros;
      //foreach ($listado_propiedades as $key => $propiedad) {
        //($propiedad['Direccion']);

      //}
    }else{
      $retorno = $listado_propiedades;
    }
  }



  echo json_encode($retorno);

?>
