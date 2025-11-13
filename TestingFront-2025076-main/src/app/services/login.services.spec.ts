import { TestBed } from '@angular/core/testing';
import { LoginService } from './login.service.js';
// configurar el cliente HTTP
import { provideHttpClient } from "@angular/common/http";
// herramientas para SIMULAR las solicitudes HTTP
import { provideHttpClientTesting, HttpTestingController } from "@angular/common/http/testing";

describe ('pruebas de el servicio de login', () => {

let httpMock: HttpTestingController;
let service: LoginService;

const credencialMock =  {
  email: 'pepecadena@gmail.com',
password: '12345678'
};

const tokenMock = 'eyJhbGciOiJIUzI1Ni';

beforeEach(() => { 


    TestBed.configureTestingModule({
        providers: [provideHttpClient(), provideHttpClientTesting(), LoginService ]
     })

     httpMock = TestBed.inject(HttpTestingController);
service = TestBed.inject(LoginService)
})



it('debería iniciar sesión y retornar un token', () => {
    const apiUrl = "http://localhost:9000/iniciarSesion";
    const responseMock = {"mensaje": "Inicio de sesión exitoso"};

    service.login(credencialMock.email, credencialMock.password).subscribe( (res) => {
        expect(res).toEqual(responseMock);
    });

    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe('POST');
    req.flush(responseMock);
});


it('obtener token', () => {
    localStorage.setItem('token', tokenMock);5
    expect( service.getToken() ).toBe(tokenMock);
    
     });

it('verificar si esta logueado', () => {
    localStorage.setItem('token', tokenMock);
     expect( service.isLoggedIn() ).toBeTrue();
     });


it('verificar si se cierra sesion', () => {
    localStorage.setItem('token', tokenMock);
    service.logout();
    expect( localStorage.getItem('token') ).toBeNull();
    });
});