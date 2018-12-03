import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http'
import { throwError } from 'rxjs'
import { map, catchError } from 'rxjs/operators'

@Injectable()
export class ReportService {

  constructor(private http:Http) { }

  url:string = 'https://tccbackend.herokuapp.com/api/posts'

  getReports () {
    return this.http.get(this.url).pipe(
      map((response: Response) => response.json()),
      catchError((error: Response) => throwError(error))
    )
  }

  likeReport(id){
    return this.http.get(this.url+'/like/'+id).pipe(
      map((response: Response) => response.json()),
      catchError((error: Response) => throwError(error))
    )
  }

  addComment(comentario){
    return this.http.post('https://tccbackend.herokuapp.com/api/comentarios', comentario).pipe(
      map((response: Response) => response.json()),
      catchError((error: Response) => throwError(error))
    )
  }

  getComments(id){
    return this.http.get('https://tccbackend.herokuapp.com/api/comentarios/'+id).pipe(
      map((response: Response) => response.json()),
      catchError((error: Response) => throwError(error))
    )
  }
}
