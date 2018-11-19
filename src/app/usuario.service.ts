import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http'
import { map, catchError } from 'rxjs/operators'
import { throwError } from 'rxjs'

@Injectable()
export class UsuarioService {

  constructor(private http: Http) { }

  url:string = 'https://tccbackend.herokuapp.com/api/usuarios'

  saveUsuario(usuario) {
    return this.http.post(this.url, usuario).pipe(
      map((response: Response) => response.json()),
      catchError((error: Response) => throwError(error))
    )
  }

  logar(user) {
    return this.http.post(`${this.url}/signin`, user).pipe(
      map((response: Response) => response.json()),
      catchError((error: Error) => throwError(error))
    )
  }
}
