import { Component } from '@angular/core';
import { formatRating } from '@bg-hoard/store/util-formatters';
import { HttpClient } from '@angular/common/http';
import { Game } from '@bg-hoard/util-interface';
import { sendNotification } from '@bg-hoard/api/util-notifications';

@Component({
  selector: 'bg-hoard-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  formatRating = formatRating;
  title = 'Board Game Hoard';
  games = this.http.get<Game[]>('/api/games');
  sendNotification = (id: string) => sendNotification(id);
  constructor(private http: HttpClient) {}
}
