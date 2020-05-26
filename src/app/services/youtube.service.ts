import { Injectable } from '@angular/core';
import { HttpClient,HttpParams } from '@angular/common/http';
import { YoutubeResponse } from '../models/youtube.models';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class YoutubeService {

  private youtubeUrl = 'https://www.googleapis.com/youtube/v3';
  private apiKey = 'AIzaSyCogZUzozpxO8tXG0Qp6w-UE68d5F_TjEc';
  private playList = 'UUuaPTYj15JSkETGnEseaFFg';
  private nextPageToken = '';

  constructor(private http: HttpClient) { 

  }

  getVideos(){

    const url = `${ this.youtubeUrl}/playlistItems`;
    const params = new HttpParams()
      .set('part','snippet')
      .set('playlistId',this.playList)
      .set('key',this.apiKey)
      .set('maxResults','10')
      .set('pageToken',this.nextPageToken)

    
      return this.http.get<YoutubeResponse>(url, {params})
              .pipe(
                map( resp => {
                  this.nextPageToken = resp.nextPageToken;
                  return resp.items;
                }),

                map(items =>{
                  return items.map(video =>video.snippet)
                })
              )
  }
}
