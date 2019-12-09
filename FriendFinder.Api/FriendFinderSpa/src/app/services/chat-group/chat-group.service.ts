import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { AuthService } from '../user/auth/auth.service';
import { ChatGroup } from 'src/app/models/chat-group/chat-group';
import { tap, shareReplay, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ChatGroupService {

  private chatGroupUrl = 'api/chatgroup/';

  constructor(
    private http: HttpClient,
    private authService: AuthService) { }


  getChatGroups(): Observable<ChatGroup[]> {
    const headers = new HttpHeaders
      ({
        "Authorization": "Bearer " + this.authService.getToken,
        'Content-Type': 'application/json'
      });

    return this.http.get<ChatGroup[]>(this.chatGroupUrl + "getchatgroups", { headers: headers })
      .pipe(
        tap(),
        shareReplay(1),
        catchError(this.handleError)
      );
  }

  private handleError(err: any) {
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      errorMessage = `Backend returned code ${err.status}: ${err.body.error}`;
    }
    console.error(err);
    return throwError(errorMessage);
  }

}
