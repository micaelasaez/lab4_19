<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: X-Requested-With, Content-Type, Accept, Origin, Authorization, text/plain, application/x-www-form-urlencoded');
use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

require_once "./vendor/autoload.php";
require_once "./clases/Usuario.php";
require_once './clases/MWparaCORS.php';
require_once "./clases/imagen.php";
// require_once "./clases/MW.php";

use Firebase\JWT\JWT as JWT;

$config['displayErrorDetails'] = true;
$config['addContentLengthHeader'] = false;
/*
* POST-----> Agrega empleado (dni, clave, nombre, puesto) -> json (exito:bool, mensaje:string, empleado:json)
    MIDDLEWARE Verifica que el dni NO exista. Si existe, no permite agregar
*GET------> Lista a los empleados -> json (exito:bool, mensaje:string, listado:json[])
    MIDDLEWARE Si es 'jefe', muestra TODOS los campos.
	   Si es 'empleado', muestra dni y nombre (de empleados)
	   Si no tiene JWT, muestra la cantidad de registros que tiene la tabla de la base de datos
*PUT------> Modifica empleado -> json (exito:bool, mensaje:string, empleadoModificado:json)
    MIDDLEWARE Si no posee JWT, NO permite.
*DELETE---> Elimina empleado (por id en url) -> json (exito:bool, mensaje:string, empleadoEliminado:json)
    MIDDLEWARE Si no posee JWT, NO permite.

(/login)
*POST-----> Loguea empleado (dni, clave) -> json (exito:bool, mensaje:string, empleado:json)
    MIDDLEWARE Verifica que exista el empleado en base de datos (dni, clave)
    -> si existe, crea JWT (dni, nombre y puesto). Retorna (empleadoJWT:JWT)
 */
$app = new Slim\App(["settings" => $config]);
$app->post('[/imagen]', function ($request, $response)
{
  return $response->withJson('en imagen por post assets', 200);

});
$app->get('[/imagen]', function ($request, $response) {
  return $response->withJson('en imagen por get assets', 200);
});


/*
$app->post('[/]', function ($request, $response)
{
        $datos = $request->getParsedbody();

        $dni = $datos["dni"];
        $nombre = $datos["nombre"];
        $clave = $datos["clave"];
        $puesto = $datos["puesto"];

        $rta = array(
            "exito"=>"false",
            "mensaje"=>"",
            "empleado"=>""
        );

        $usuario = new Usuario($dni, $nombre, $clave, $puesto);
        $respuesta = $usuario->Agregar();

        if ($respuesta) {
            $rta["mensaje"] = ' Registro insertado exitosamente ';
            $rta["empleado"] = $usuario->toJson();
            $rta["exito"] = "true";
            $codigo = 200;
        } else {
            $rta["mensaje"] = ' "Error, no registro en base de datos" ';
            $codigo = 409;
        }

        return $response->withJson($rta, $codigo);

})->add(\Usuario::class."::VerificarDni");

$app->put('[/]', function ($request, $response)
{
        $id = $request->getHeader("id")[0];
        $nombre = $request->getHeader("nombre")[0];
        $dni = $request->getHeader("dni")[0];
        $clave = $request->getHeader("clave")[0];
        $puesto = $request->getHeader("puesto")[0];

        $usuario = new Usuario($dni, $nombre, $clave, $puesto);
        $respuesta = $usuario->Modificar($id);

        $rta = array(
            "exito"=>"false",
            "mensaje"=>"",
            "empleadoModificado"=>""
        );

        if ($respuesta) {
            $rta["mensaje"] = ' Empleado modificado correctamente! ';
            $rta["empleadoModificado"] = $usuario->toJson();
            $rta["exito"] = "true";
            $codigo = 200;
        }
        else {
            $rta["mensaje"] = ' Error ';
            $codigo = 409;
        }

        return $response->withJson($rta, $codigo);

})->add(\Usuario::class."::VerificarToken");
$app->get('[/]', function ($request, $response)
{

        $rta = array(
            "exito"=>"false",
            "mensaje"=>"Listado de empleados para jefe:",
            "listado"=>""
        );
        $listado = Usuario::TraerTodo();
        if ($listado != null)
        {
            $rta["listado"] = $listado;
            $rta["exito"] = "true";
            $codigo = 200;
        }
        else {
            $rta["mensaje"] = ' Error ';
            $codigo = 409;
        }

        return $response->withJson($rta, $codigo);

})->add(\Usuario::class."::VerificarPuesto");
$app->delete('/{id}[/]', function ($request, $response, $args)
{
    $id = $args['id'];

    $empl = Usuario::TraerPorIdObj($id);
    $json = $empl->toJson();
        $rta = array(
            "exito"=>"false",
            "mensaje"=>"",
            "empleadoEliminado"=>""
        );

        $respuesta = Usuario::Borrar($id);
        if ($respuesta ) {
            $rta["mensaje"] = ' Empleado eliminado correctamente! ';
            $rta["empleadoEliminado"] = $json;
            $rta["exito"] = "true";
            $codigo = 200;
        }
        else {
            $rta["mensaje"] = ' Error ';
            $codigo = 409;
        }

        return $response->withJson($rta, $codigo);

})->add(\Usuario::class."::VerificarToken");
$app->group('/login', function ()
    {
        $this->post('[/]', function ($request, $response)
        {
            $datos = $request->getParsedbody();
            $clave = $datos["pass"];
            $email = $datos["email"];

            $rta = array(
                "exito"=>"true",
                "mensaje"=>"Registrado!",
                "empleado"=>"",
                "empleadoJWT"=>""
            );
            // $objeto = Usuario::TraerPorDniObj($dni);
            $time = time();
            $payload = array(
                "data" => [
                        "email" => $email,
                        "pass" => $clave ],
                "iat" => $time,
                "exp" => $time + (1 * 60)

                // ,"puesto" => $objeto->puesto

            );
            $token = JWT::encode($payload, "clave");

            // $rta["empleado"] = $objeto->toJson();
            $rta["empleado"] = $payload;
            $rta["empleadoJWT"] = $token;

            $newResponse = $response->withJson( $rta ,200);

            $newResponse
            ->withHeader('Access-Control-Allow-Origin', 'http://localhost')
            ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization, text/plain, application/x-www-form-urlencoded')
            ->withHeader('Access-Control-Allow-Methods',  'POST');

            return $response->withJson( $rta ,200);

        })/* ->add(function ($req, $res, $next) {
            $response = $next($req, $res);
           return $response
                    ->withHeader('Access-Control-Allow-Origin', '*')
                    ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
                    return $next($req, $res);
                    ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
        }) ;
    });*/

$app->run();

?>
