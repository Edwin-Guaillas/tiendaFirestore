import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { nov } from '../interfaces/novedades';
import { menu } from '../interfaces/menu';

@Injectable({
    providedIn: 'root'
})
export class DataService {

    constructor(private http: HttpClient) { }

    getNoved() {
        return this.http.get<nov[]>('/assets/data/novedades.json');
    }
    getMenu() {
        return this.http.get<menu[]>('/assets/data/menu.json');
    }

}

