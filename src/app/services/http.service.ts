import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, map, Observable, pipe } from 'rxjs';
import { environment as env } from 'src/environments/environment';
import { APIResponse, Game } from '../models';
@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private http: HttpClient) {}

  getGamelist(order: string, search?: string): Observable<APIResponse<Game>> {
    let params = new HttpParams().set('ordering', order);
    if (search)
      params = new HttpParams().set('ordering', order).set('search', search);
    return this.http.get<APIResponse<Game>>(`${env.BASE_URL}/games`, {
      params,
    });
  }

  getGame(gameId: string): Observable<Game> {
    const gameInfoRequest = this.http.get(`${env.BASE_URL}/games/${gameId}`);
    const gameScreenshotsRequest = this.http.get(
      `${env.BASE_URL}/games/${gameId}/screenshots`
    );
    const gameTrailersRequest = this.http.get(
      `${env.BASE_URL}/games/${gameId}/movies`
    );
    return forkJoin({
      gameInfoRequest,
      gameScreenshotsRequest,
      gameTrailersRequest,
    }).pipe(
      map((responses: any) => {
        let game = responses['gameInfoRequest'];
        game.screenshots = responses['gameScreenshotsRequest']?.results;
        game.trailers = responses['gameTrailersRequest']?.results;
        console.log(game);
        return game;
      })
    );
  }
}
