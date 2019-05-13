export class Data {
  /*
    DATA SERIA LA CLASE HEROE
    EL SERVICIO HEROE SE ENCARGA DEL ARRAY (AGREGAR, DAR, ETC)
  */

  id: string;
  nombre: string;
  sexo: string;
  poder: string;
  terreno: string;

  constructor(id: string, nombre: string, sexo: string, poder: string, terreno: string) {
    this.id = id;
    this.nombre = nombre;
    this.sexo = sexo;
    this.poder = poder;
    this.terreno = terreno;
  }
}
