import { Component, OnInit, OnDestroy } from '@angular/core';
import { User } from '../cadastro/cadastro.model';
import { Router } from '@angular/router';
import { UsuarioService } from '../usuario.service'
import { DataService } from '../data.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UsuarioService]
})
export class LoginComponent implements OnInit, OnDestroy {

  email: string = '';
  senha: string = '';
  allUsers: User[] = [];
  bodyTag: HTMLBodyElement = document.getElementsByTagName('body')[0];
  toggleForm: boolean = true;

  constructor(private router: Router, private usuarioService: UsuarioService, private dataService: DataService) { }

  logar() {
    this.usuarioService.logar({ email: this.email, senha: this.senha }).subscribe(
      (data) => {
        console.log(data)
        this.dataService.saveLogged(data)
        this.router.navigateByUrl('/home')
      },
      (error) => console.log(error)
    )
  }

  ngOnInit() {
    this.bodyTag.classList.add('login-page');
    this.allUsers = JSON.parse(localStorage.getItem('users'));
  }

  ngOnDestroy() {
    this.bodyTag.classList.remove('login-page');
  }
}
