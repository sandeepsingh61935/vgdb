import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { Game } from 'src/app/models';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit, OnDestroy {
  public gameRating!: number;
  public gameId!: number;
  public game!: Game;

  public routeSub!: Subscription;
  public gameSub!: Subscription;

  constructor(private activatedRoute: ActivatedRoute ,
    private httpService: HttpService)   { }

  ngOnInit(): void {
    this.routeSub = this.activatedRoute.
      params.
      subscribe((params: Params) => {
        this.gameId = params['id'];
        this.getGameDetails(this.gameId.toString());
      }
      );
  }

  getGameDetails(id: string): void {
    this.gameSub = this.httpService.
          getGame(id).
          subscribe((game: Game) => {
            this.game = game;
            setTimeout(() => {
              this.gameRating = this.game.metacritic;
            },1000);
          });
  }

  getColor(value: number) :string {
    if(value >75)
      return "green";
    else if(value > 50)
      return "orange";
    else
      return "red";
  }

  ngOnDestroy(): void {
    if(this.routeSub)
      this.routeSub.unsubscribe();
    if(this.gameSub)
      this.gameSub.unsubscribe();
  }
}
