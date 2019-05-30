<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept, text/plain, application/x-www-form-urlencoded");
use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

/* INSERT INTO `autos`( `id`, `modelo`, `marca`, `precio`, `cantidadPuertas`, `RutaDeFoto` ) VALUES( 1, 'Camaro', 'Chevrolet', 20000, 'cinco', 'aux.png' ),( 2, 'Duna', 'Fiat', 25000, 'tres', 'aux.png' ),( 3, '207', 'Renaut', 30000, 'cinco', 'aux.png' ) */

require_once './vendor/autoload.php';


$config['displayErrorDetails'] = true;
$config['addContentLengthHeader'] = false;
$app = new \Slim\App(["settings" => $config]);

$app->post('[/]', function (Request $request, Response $response) {
    $auxResponse = new stdClass();
    $auxResponse->respuesta = "Error. No hay fotos";
    $archivos = $request->getUploadedFiles();
    $path = '';

    if (isset($archivos['fotos'])) {
        $destino = "fotos/";
        $path = $archivos['fotos']->getClientFilename();
        $archivos['fotos']->moveTo($destino . $path);
        $auxResponse->respuesta = "Subida completa.";
    }

    return $response->withJson($auxResponse, 200);
});

$app->get('[/]', function (Request $request, Response $response) {
    $fileList = glob('fotos/*.{jpg,gif,png}', GLOB_BRACE);
    usort($fileList, function ($a, $b) {
        return filemtime($a) - filemtime($b);
    });
    $auxResponse = array();

    foreach ($fileList as $foto) {
        array_push($auxResponse, 'http://localhost/lab_IV/clase06/src/backend/' . $foto);
        // echo $foto;
    }
    return $response->withJson($auxResponse, 200);
});
$app->run();
