export class Alumno {
    nombre: string;
    fechaNacimiento: Date;
    edad: number;
    grado: string;
    imgPath: string;
  
    constructor(nombre: string, fechaNacimiento: Date, edad: number, grado: string, imgPath: string) {
      this.nombre = nombre;
      this.fechaNacimiento = fechaNacimiento;
      this.edad = edad;
      this.grado = grado;
      this.imgPath =imgPath;
    }
  
    // Puedes agregar métodos adicionales según sea necesario
  }