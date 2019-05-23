<?php

require_once('AccesoDatos.php');

use Firebase\JWT\JWT as JWT;

class Usuario
{
    public $id;
    public $clave;
    public $nombre;
    public $puesto;
    public $dni;

    public function __construct($dni = 0, $nombre = "", $clave = "", $puesto = "") {

        $this->dni = $dni;
        $this->clave = $clave;
        $this->nombre = $nombre;
        $this->puesto = $puesto;
    }

    public function toJson() {
        return json_decode('{"dni":"'.$this->dni.'","clave":"'.$this->clave.'","nombre":"'.$this->nombre.'","puesto":"'.$this->puesto.'"}');
    }



    public static function Verificar($request, $response, $next)
    {
        $arrayDeParametros = $request->getParsedBody();
        $dni = $arrayDeParametros["dni"];
        $clave = $arrayDeParametros["clave"];
        return $next($request, $response);
        /* try {
            $objeto = Usuario::TraerPorDniObj($dni);

            if($objeto != NULL)
            {
                if($objeto->clave == $clave)
                {
                    return $next($request, $response);
                }
            }
            $rta = array(
                "exito"=>"false",
                "mensaje"=>"No registrado en bd!",
                "empleado"=>"",
                "empleadoJWT"=>""
            );
            return $response->withJson($rta, 409);
        }
        catch(Exception $e) {
            throw $e;
        } */
    }


    public static function VerificarDni($request, $response, $next)
    {
        $arrayDeParametros = $request->getParsedBody();
        $dni = $arrayDeParametros["dni"];

        try {
            $objeto = Usuario::TraerPorDniObj($dni);

            if($objeto == NULL)
            {
                return $next($request, $response);
            }
            $rta = array(
                "exito"=>"false",
                "mensaje"=>"Dni repetido!",
                "empleado"=>"",
            );
            return $response->withJson($rta, 409);
        }
        catch(Exception $e) {
            throw $e;
        }
    }


    public static function VerificarPuesto($request, $response, $next)
    {
        if($request->getHeader("jwt")[0] == null)
        {
            $rta = array(
                "exito"=>"true",
                "mensaje"=>"No posee JWT!",
                "listado"=>"",
            );
            $cantidad = count(Usuario::TraerTodo());
            $rta["listado"] = $cantidad;
            return $response->withJson($rta, 409);
        }
        else
        {
            try
            {
                $token = $request->getHeader("jwt")[0];
                $cantidad = Usuario::TraerTodoObj();
                $todo = JWT::decode($token, "clave", ["HS256"]);
                if($todo->puesto == "empleado")
                {
                    $rta = array(
                        "exito"=>"true",
                        "mensaje"=>"Listado para puesto empleado: ",
                        "listado"=>"",
                    );
                    $arrayObj = array();
                    foreach($cantidad as $key)
                    {
                        $obj = json_decode('{"dni":'.$key->dni.',"nombre":'.$key->nombre.'}');
                        array_push($arrayObj, $obj);
                    }
                    $rta["listado"] = $arrayObj;
                    return $response->withJson($rta , 200);
                }
                return $next($request,$response);
            }
            catch(Exception $e) {
                $json = '{ "status" : "Error" }';
                return $response->withJson(json_decode($json), 409);
            }
        }
    }

    public static function verificarToken($request, $response, $next)
    {
        $token = ($request->getHeader("jwt")[0]);

        try {
            $todo = JWT::decode($token, "clave", ["HS256"]);
            return $next($request,$response);
        }
        catch(Exception $e) {
            $rta = array(
                "exito"=>"false",
                "mensaje"=>"No posee token!"
            );

            return $response->withJson($rta, 409);
        }
    }

    public function Agregar() {
        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
        $consulta = $objetoAccesoDato->RetornarConsulta("INSERT INTO usuarios (dni, clave, nombre, puesto) VALUES (:dni, :clave, :nombre, :puesto)");
        $consulta->bindValue(':dni',$this->dni, PDO::PARAM_INT);
        $consulta->bindValue(':clave',$this->clave, PDO::PARAM_STR);
        $consulta->bindValue(':nombre',$this->nombre, PDO::PARAM_STR);
        $consulta->bindValue(':puesto',$this->puesto, PDO::PARAM_STR);

        return $consulta->execute();
    }

    public static function Borrar($id) {
        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
		$consulta = $objetoAccesoDato->RetornarConsulta("DELETE FROM usuarios WHERE id = :id");
        $consulta->bindValue(':id', $id, PDO::PARAM_INT);
        $consulta->execute();

		return $consulta->rowCount();
    }

    public function Modificar($id) {
        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
        $consulta = $objetoAccesoDato->RetornarConsulta("UPDATE usuarios SET dni=:dni, nombre=:nombre, clave=:clave, puesto=:puesto
        WHERE id = :id");
        $consulta->bindValue(':dni',$this->dni, PDO::PARAM_INT);
        $consulta->bindValue(':nombre',$this->nombre, PDO::PARAM_STR);
        $consulta->bindValue(':clave',$this->clave, PDO::PARAM_STR);
        $consulta->bindValue(':puesto',$this->puesto, PDO::PARAM_STR);
        $consulta->bindValue(':id',$id, PDO::PARAM_INT);
        return $consulta->execute();
    }

    public static function TraerPorId($id) {
        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
        $consulta = $objetoAccesoDato->RetornarConsulta("SELECT * FROM usuarios WHERE id = :id");
        $consulta->bindValue(':id',$id, PDO::PARAM_STR);
        $consulta->execute();

        return $consulta->fetch(PDO::FETCH_ASSOC);
    }

    public static function TraerPorIdObj($id) {
        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
        $consulta = $objetoAccesoDato->RetornarConsulta("SELECT * FROM usuarios WHERE id = :id");
        $consulta->bindValue(':id',$id, PDO::PARAM_STR);
        $consulta->execute();
        $obj = NULL;

        while($fila = $consulta->fetch()){
            $obj = new Usuario($fila[1], $fila[2], $fila[3], $fila[4]);
        }

        return $obj;
    }
    public static function TraerPorDniObj($dni) {
        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
        $consulta = $objetoAccesoDato->RetornarConsulta("SELECT * FROM usuarios WHERE dni = :dni");
        $consulta->bindValue(':dni',$dni, PDO::PARAM_INT);
        $consulta->execute();
        $obj = NULL;

        while($fila = $consulta->fetch()){
            $obj = new Usuario($fila[1], $fila[2], $fila[3], $fila[4]);
        }

        return $obj;
    }

    public static function TraerTodo() {
        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
        $consulta = $objetoAccesoDato->RetornarConsulta("SELECT * FROM usuarios");
        $consulta->execute();

        return $consulta->fetchAll(PDO::FETCH_ASSOC);
    }

    public static function TraerTodoObj() {
        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
        $consulta = $objetoAccesoDato->RetornarConsulta("SELECT * FROM usuarios");
        $consulta->execute();
        $arrayObj = array();

        while($fila = $consulta->fetch()){
            $obj = new Usuario($fila[0], $fila[1], $fila[2], $fila[3], $fila[4], $fila[5], $fila[6]);
            array_push($arrayObj, $obj);
        }

        return $arrayObj;
    }
}
