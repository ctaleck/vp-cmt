import { Component } from '@angular/core';
import { formatRating } from '@bg-hoard/store/util-formatters';
import { HttpClient } from '@angular/common/http';
// import { Game } from '@bg-hoard/util-interface';
import { getAllGames } from '../fake-api';

@Component({
  selector: 'bg-hoard-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  formatRating = formatRating;
  title = 'Board Game Hoard';
  // games = this.http.get<Game[]>('/api/games');
  games = getAllGames();
  constructor(private http: HttpClient) {}
}
