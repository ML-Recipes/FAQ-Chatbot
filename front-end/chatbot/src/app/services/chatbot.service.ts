import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConfig } from '../app-config';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ChatbotService {

  chatbotData$: Observable<any>;
  private chatbotDataSubject = new Subject<any>();

  constructor(private http: HttpClient, private appConfig: AppConfig) {
    this.chatbotData$ = this.chatbotDataSubject.asObservable();
  }

  get_index_list(dataset: any): Observable<any> {
    return this.http.get(this.appConfig.apiUrl + "/api/chatbot/search/" + dataset)
  }

  send_message(data: any) {
    return this.http.post(this.appConfig.apiUrl + "/api/chatbot/", data)
  }

}