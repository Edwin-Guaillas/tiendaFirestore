
import { nov } from '../../interfaces/novedades';
import { Observable } from 'rxjs';
import { DataService } from '../../services/data.service';
import { Component, OnInit } from '@angular/core';
import { menu } from '../../interfaces/menu';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  novedades: Observable<nov[]>;
  menu: Observable<menu[]>;
  constructor(private dat: DataService) { }

  ngOnInit() {
    this.novedades = this.dat.getNoved();
    this.menu = this.dat.getMenu();
  }

}
