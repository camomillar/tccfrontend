export class User {
  id: string;
  avatar: string;
  email: string;
  gamertag: string;
  senha: string;

  constructor(id:string = '', avatar:string = '', email:string ='', gamertag:string = '', senha:string = ''){
      this.id = id;
      this.avatar = avatar;
      this.email = email;
      this.gamertag = gamertag;
      this.senha = senha;
  }
}
