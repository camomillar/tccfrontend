import { Component, OnInit, Input } from '@angular/core';
import { User } from './cadastro.model'
import { Router } from '@angular/router'
import { UsuarioService } from '../usuario.service'

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css'],
  providers: [UsuarioService]
})
export class CadastroComponent implements OnInit {

  email: string = '';
  gamertag: string = '';
  password: string = '';
  passwordConfirm: string = '';
  avatar: string = '';
  users: User[] = [];

  constructor(private router: Router, private service: UsuarioService) { }

  ngOnInit() {

  }

  cadastrar() {
    let user = new User('', this.avatar, this.email, this.gamertag, this.password);
    this.service.saveUsuario(user).subscribe(
      (data) => {
        console.log(data)
      },
      (error) => {
        console.log(error)
      }
    )

    /*if (!(localStorage.getItem('users'))) {
      this.users.push(user);
      localStorage.setItem('users', JSON.stringify(this.users));
      this.router.navigateByUrl('login')
    } else {
      this.users = JSON.parse(localStorage.getItem('users'));
      user = new User('', this.avatar, this.email, this.gamertag, this.password);
      this.users.push(user);
      localStorage.setItem('users', JSON.stringify(this.users));
      this.router.navigateByUrl('login')
    }*/
  }

  

}
