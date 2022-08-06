import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { APIResponse, Game } from 'src/app/models';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public sort : string = "popularity";
  public games: Array<Game>= [];
  constructor(
    private httpService: HttpService,
    private activatedRoute: ActivatedRoute,
    ) { }
  ngOnInit(): void { 
    this.activatedRoute.params.subscribe((params:Params) => {
      if(params['search'])
        this.searchGames('metacrit',params['search']);
      else 
        this.searchGames('metacrit');
    });  
  }

  searchGames(sort: string, search?: any) {
    this.httpService.getGamelist(sort, search).subscribe((gameList :APIResponse<Game>) => {
      this.games = gameList.results;
      console.log(this.games)
    }
    );
  }

}
