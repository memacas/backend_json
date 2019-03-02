<?php
  //if (isset($_POST['filtros']))
    //print_r($_POST['filtros']);
  $contenido = file_get_contents("data-1.json");
  $listado_propiedades = json_decode($contenido, true);
  $retorno = array();
  $filtros = array();
  //Verifica que exista en el POST la variable de filtros
  if (isset($_POST['filtros'])){
    $filtros = (json_decode($_POST['filtros'], true));

    //Verifica que exista la variable de sesion de ciudades

    if (count($filtros) > 0){
    }

    $retorno['listado_propiedades'] = array();
    $retorno['listado_ciudades'] = array();
    $retorno['listado_tipo'] = array();
    $retorno['precios'] = array();

    foreach ($listado_propiedades as $key => $propiedad) {
      if (!in_array($propiedad['Ciudad'], $retorno['listado_ciudades'])) array_push($retorno['listado_ciudades'], $propiedad['Ciudad']);
      if (!in_array($propiedad['Tipo'], $retorno['listado_tipo'])) array_push($retorno['listado_tipo'], $propiedad['Tipo']);

      array_push($retorno['listado_propiedades'], $propiedad);

      $precio = str_replace (array("$", ","), array("", ""), $propiedad['Precio']);

      if (!isset($retorno['precios']['min'])){
        $retorno['precios']['min'] = $precio; $retorno['precios']['max'] = $precio;
      }else{
        if ($precio < $retorno['precios']['min']) $retorno['precios']['min'] = $precio;
        if ($precio > $retorno['precios']['max']) $retorno['precios']['max'] = $precio;
      }
    }

    sort($retorno['listado_ciudades']);
    sort($retorno['listado_tipo']);
  }

  echo json_encode($retorno);

?>
