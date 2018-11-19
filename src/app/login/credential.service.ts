import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http'
import { throwError } from 'rxjs'
import { User } from '../cadastro/cadastro.model'
import { map, catchError } from 'rxjs/operators'

@Injectable()
export class CredentialService {

  constructor(private http: Http) { }

  url: string = 'http://localhost:8080/api/usuarios/signin'

  logar(email, senha) {
    return this.http.post(this.url, { email, senha }).pipe(
      map((response: Response) =>  response.json()),
      catchError((error: Response) => throwError(error))
    )
  }
}
