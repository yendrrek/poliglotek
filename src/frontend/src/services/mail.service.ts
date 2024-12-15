import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';
import { MailResponse } from '../models/mail-response';
import { ContactFormData } from '../models/contact-form-data';

@Injectable({
  providedIn: 'root'
})
export class MailService {

  constructor(private http: HttpClient) { }

  sendMail(contactFormData: ContactFormData): Observable<MailResponse> {
    const url: string = environment.baseUrl + "/mail";
    return this.http.post<MailResponse>(url, contactFormData);
  }
}
