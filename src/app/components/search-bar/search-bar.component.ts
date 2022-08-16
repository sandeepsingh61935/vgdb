import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { APIResponse, Game } from 'src/app/models';
import { HttpService } from 'src/app/services/http.service';
import { environment as env } from 'src/environments/environment';
@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {
  @Output() searchEvent = new EventEmitter<string>();
  // inject router here to navigate to search results page
  public games: Game[] = [];
  public sort: string = "popularity";
  public search!: string;
  constructor(private router:Router,private httpService: HttpService) { }

  ngOnInit(): void {
  }
  onSubmit(form:NgForm) {
    this.search = form.value.search;
    this.router.navigate(['/search-results',this.search ]);
  }

  searchGames(search: string) {
    if(search) this.searchEvent.emit(search);
  }
}
