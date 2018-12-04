import { Component, OnInit, OnDestroy } from '@angular/core';
import { ReportService } from './report.service'
import { DataService } from '../data.service';
import { Router } from '@angular/router';
import { $ } from 'jquery';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [ReportService]
})
export class HomeComponent implements OnInit {

  bodyTag: HTMLBodyElement = document.getElementsByTagName('body')[0];
  posts: Array<any> = []
  ranking = {}
  rankingPos = []
  showComment = {}
  comments = {}
  com = ""
  avatar: string;
  user
  tweetObj = {
    url: '',
    text: '',
    hashtags: ''
  }

  constructor(private service: ReportService, private dataService: DataService, private router: Router) { }

  ngOnInit() {
    this.bodyTag.classList.add('background-feed');
    this.getReports()
    this.user = this.dataService.getLogged()
    this.avatar = (Math.floor(Math.random()*5)+1)+'.png';
    this.tweetObj.url = "https://tccfront.herokuapp.com/";
    this.tweetObj.text = encodeURIComponent("Ranking de jogos onde mulheres mais sofrem assédio");
    this.tweetObj.hashtags ="GGreport"
  }

  getReports() {
    this.service.getReports().subscribe(
      (data) => {
        this.posts = data.reverse()
        this.calcRanking();
      }
    )
  }

  getComments(id) {
    this.service.getComments(id).subscribe(
      (data) => {
        this.comments[id] = data;
        console.log(this.comments)
      }
    )
  }

  addComment(id){
    let comment = {
      report: id,
      avatar: this.user.avatar,
      gamertag: this.user.gamertag,
      comentario: this.com
    }
    console.log(comment)
    this.service.addComment(comment).subscribe(
      (data) => {
        this.getComments(id);
        this.com ="";
      }
    )
  }

  toggleComment(id){
    this.showComment[id] = !this.showComment[id];
    if(this.showComment[id]){
      this.getComments(id);
    }
  }

  likeReport(id){
    this.service.likeReport(id).subscribe(
      (data) => {
        this.getReports()
      }
    )
  }

  calcRanking(){
    for(let el of this.posts) {
      if(this.ranking[el.jogo.toUpperCase()] === undefined) {
        this.ranking[el.jogo.toUpperCase()] = 0
      }
      this.ranking[el.jogo.toUpperCase()]++
    }
    let keys = Object.keys(this.ranking)
    let array = this.ranking
    keys.sort(function(a,b) {
      return array[a] - array[b]
    })
    this.rankingPos = keys.reverse()
  }

  logout() {
    this.dataService.clearStorage()
    this.router.navigateByUrl('/')
  }

  ngOnDestroy() {
    this.bodyTag.classList.remove('background-feed');
  }

}
