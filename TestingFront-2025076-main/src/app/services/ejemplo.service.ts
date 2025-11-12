import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EjemploService {

  suma(a: number, b: number): number {
    return a + b;
  }

}
