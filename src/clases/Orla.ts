import { Alumno } from "./Alumno";
import { Profesor } from "./Profesor";

export class Orla {
    nombre: string;
    alumnos: any;
    profesores: any;
  
    constructor(nombre: string, alumnos: any, profesores: any) {
      this.nombre = nombre;
      this.alumnos = alumnos;
      this.profesores = profesores;
    }
  
    // Puedes agregar métodos adicionales según sea necesario
  }