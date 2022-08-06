import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { APIResponse, Game } from 'src/app/models';
import { HttpService } from 'src/app/services/http.service';
import { environment as env } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit ,OnDestroy{
  public sort: string = "popularity";
  public games: Array<Game> = [];
  public routeSubsription: Subscription | undefined;
  public gameSubsription: Subscription | undefined;

  constructor(
    private httpService: HttpService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) { }
  ngOnInit(): void {
    this.routeSubsription = this.activatedRoute.
      params.
      subscribe((params: Params) => {
        if (params['search'])
          this.searchGames('metacrit', params['search']);
        else
          this.searchGames('metacrit');
      });
  }

  searchGames(sort: string, search?: any) {
    this.gameSubsription = this.httpService.
      getGamelist(sort, search).
      subscribe((gameList: APIResponse<Game>) => {
        this.games = gameList.results;
        for(let game of this.games) {
          game.background_image = !game.background_image ? `${env.PLACEHOLDER_URL}` : game.background_image;
        }
      }
      );
  }

  openGameDetails(id: number): void {
    this.router.navigate(['/details', id]);
  }
  ngOnDestroy(): void {
    if(this.gameSubsription)
      this.gameSubsription.unsubscribe();
    if(this.routeSubsription)
      this.routeSubsription.unsubscribe();
  }
}
