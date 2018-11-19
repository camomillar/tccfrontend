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
}
