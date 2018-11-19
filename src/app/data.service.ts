import { Injectable } from '@angular/core';

@Injectable()
export class DataService {

  constructor() { }

  saveLogged(user){
    var jsonUser = JSON.stringify(user)
    localStorage.setItem('user', jsonUser)
  }

  getLogged(){
    return JSON.parse(localStorage.getItem('user'))
  }

  clearStorage() {
    localStorage.clear()
  }
}
