export class Alumno {
  nombre: string;
  fechaNacimiento: Date;
  edad: number;
  grado: string;
  imgPath: string;
  id: string;

  constructor(nombre: string, fechaNacimiento: Date, edad: number, grado: string, imgPath: string, id: string) {
    this.nombre = nombre;
    this.fechaNacimiento = fechaNacimiento;
    this.edad = edad;
    this.grado = grado;
    this.imgPath = imgPath;
    this.id = id;
  }
}