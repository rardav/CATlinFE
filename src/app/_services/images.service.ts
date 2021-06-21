import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Image } from '../_models/image';

@Injectable({
  providedIn: 'root'
})
export class ImagesService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getImage(id: number) {
    return this.http.get<Image>(this.baseUrl + 'images/id/' + id);
  }

  getImageId(url: string) {
    return this.http.get<number>(this.baseUrl + 'images/url/' + url + '/id');
  }

  insertImage(image: Image) {
    return this.http.post<Image>(this.baseUrl + 'images', image); 
  }
}
