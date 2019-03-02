<?php
  //Lee el archivo de datos
  $contenido = file_get_contents("data-1.json");
  $listado_propiedades = json_decode($contenido, true);
  $retorno = array();
  $filtros = array();
  //Verifica que exista en el POST la variable de filtros
  if (isset($_POST['filtros'])){
    $filtros = (json_decode($_POST['filtros'], true));

    //Verifica que exista la variable de sesion de ciudades

    //Se inicializan las variasbles que se van a retornar
    $retorno['listado_propiedades'] = array();
    $retorno['listado_ciudades'] = array();
    $retorno['listado_tipo'] = array();
    $retorno['precios'] = array();
    $retorno['filtros'] = array();

    //Recorre todas las propiedades del archivo JSON
    foreach ($listado_propiedades as $key => $propiedad) {
      //Boolean para agregar una propiedad por defecto a la lista de retorno
      $addProp = true;
      //Limpia el precio para compararlo
      $precio = (double)str_replace (array("$", ","), array("", ""), $propiedad['Precio']);

      //Crea los listados de los filtros de la columna de busqueda
      if (!in_array($propiedad['Ciudad'], $retorno['listado_ciudades'])) array_push($retorno['listado_ciudades'], $propiedad['Ciudad']);
      if (!in_array($propiedad['Tipo'], $retorno['listado_tipo'])) array_push($retorno['listado_tipo'], $propiedad['Tipo']);

      //Crea el filtro de precios minimo y maximo
      if (!isset($retorno['precios']['min'])){
        $retorno['precios']['min'] = $precio; $retorno['precios']['max'] = $precio;
      }else{
        if ($precio < $retorno['precios']['min']) $retorno['precios']['min'] = $precio;
        if ($precio > $retorno['precios']['max']) $retorno['precios']['max'] = $precio;
      }

      $retorno['filtros']['precioMinSeleccionado'] = $retorno['precios']['min'];
      $retorno['filtros']['precioMaxSeleccionado'] = $retorno['precios']['max'];

      //Si existen filtros...
      if (count($filtros) > 0){
        //Si existe filtro ciudad
        if (isset($filtros['ciudad'])){
          if ($filtros['ciudad'] != $propiedad['Ciudad']) $addProp = false;
          $retorno['filtros']['ciudadSeleccionada'] = $filtros['ciudad'];
        }

        //Si existe filtro tipo
        if (isset($filtros['tipo'])){
          $retorno['filtros']['tipoSeleccionado'] = $filtros['tipo'];
          if ($addProp) if ($filtros['tipo'] != $propiedad['Tipo']) $addProp = false;
        }

        //Si existe filtro de precios
        if (isset($filtros['precioMin']) && isset($filtros['precioMax'])){
          $retorno['filtros']['precioMinSeleccionado'] = (double)$filtros['precioMin'];
          $retorno['filtros']['precioMaxSeleccionado'] = (double)$filtros['precioMax'];
          if ($addProp){
            if ($precio >= (double)$filtros['precioMin'] && $precio <= (double)$filtros['precioMax']) $addProp = true;
            else $addProp = false;
          }
        }
      }

      //Si la propiedad cumple con los filtros o si no hay filtros se agrega a la lista de retorno
      if ($addProp) array_push($retorno['listado_propiedades'], $propiedad);
    }

    //Se ordenan las listas de filtros por alfabetico
    sort($retorno['listado_ciudades']);
    sort($retorno['listado_tipo']);
  }

  //Retorna el resultado
  echo json_encode($retorno);

?>
