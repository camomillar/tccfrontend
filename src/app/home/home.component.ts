import { Component, OnInit, OnDestroy } from '@angular/core';
import { ReportService } from './report.service'
import { DataService } from '../data.service';
import { Router } from '@angular/router';

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
  avatar: string;
  user

  constructor(private service: ReportService, private dataService: DataService, private router: Router) { }

  ngOnInit() {
    this.bodyTag.classList.add('background-feed');
    this.service.getReports().subscribe(
      (data) => {
        this.posts = data.reverse()
        this.calcRanking();
      }
    )
    this.user = this.dataService.getLogged()
    this.avatar = (Math.floor(Math.random()*5)+1)+'.png';
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
