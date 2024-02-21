export class Profesor {
    nombre: string;
    fechaNacimiento: Date;
    edad: number;
    departamento: string;
    imgPath: string;
  
    constructor(nombre: string, fechaNacimiento: Date, edad: number, departamento: string, imgPath: string) {
      this.nombre = nombre;
      this.fechaNacimiento = fechaNacimiento;
      this.edad = edad;
      this.departamento = departamento;
      this.imgPath =imgPath;
    }
  
    // Puedes agregar métodos adicionales según sea necesario
  }