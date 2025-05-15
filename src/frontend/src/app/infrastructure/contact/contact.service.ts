import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { MailResponse } from './mail-response';
import { ContactRequest } from './contact-request';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private http: HttpClient) {}

  sendMail(contactFormData: ContactRequest): Observable<MailResponse> {
    const url: string = environment.baseUrl + "/api/contact";
    return this.http.post<MailResponse>(url, contactFormData);
  }
}
