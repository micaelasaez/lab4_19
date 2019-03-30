export class Data {
  lista = [{
    id : 1,
    nombre : 'thor',
    sexo : 'ma', // ma fe sindefinir
    poder : 'rey del trueno',
    terreno : 'tierra' // aire agua fuego
  },
  {
    id : 2,
    nombre : 'captain marvel',
    sexo : 'fe', // ma fe sindefinir
    poder : 'energia',
    terreno : 'tierra' // aire agua fuego
  },
  {
    id : 3,
    nombre : 'aquaman',
    sexo : 'ma', // ma fe sindefinir
    poder : 'fuerza',
    terreno : 'agua' // aire agua fuego
  }];

  public GetData() {
    return this.lista;
  }
}
