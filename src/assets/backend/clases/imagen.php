<?php

require_once('AccesoDatos.php');

use Firebase\JWT\JWT as JWT;

class Imagen
{
    public $id;
    public $url;

    public function __construct($url = "") {
        $this->url = $url;
    }

    public function toJson() {
        return json_decode('{"url":"'.$this->url.'"}');
    }

    public function Agregar() {
        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
        $consulta = $objetoAccesoDato->RetornarConsulta("INSERT INTO fotos (link) VALUES (:link)");
        $consulta->bindValue(':link', $this->url, PDO::PARAM_STR);

        return $consulta->execute();
    }

}
