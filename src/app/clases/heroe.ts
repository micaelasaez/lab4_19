export class Heroe {
  private static lista: Array<Heroe> = [{
    id : '1',
    nombre : 'thor',
    sexo : 'ma', // ma fe sindefinir
    poder : 'rey del trueno',
    terreno : 'tierra' // aire agua fuego
  },
  {
    id : '2',
    nombre : 'captain marvel',
    sexo : 'fe',
    poder : 'energia',
    terreno : 'tierra'
  },
  {
    id : '3',
    nombre : 'aquaman',
    sexo : 'ma',
    poder : 'fuerza',
    terreno : 'agua'
  }];

  id: string;
  nombre: string;
  sexo: string;
  poder: string;
  terreno: string;

  public static GetData() {
    return Heroe.lista;
  }
  public static AddData(heroe: Heroe) {
    Heroe.lista.push(heroe);
  }
}
