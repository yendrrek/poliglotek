import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { RouterOutlet } from '@angular/router';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators
} from '@angular/forms';
import { Observable, throwError } from 'rxjs';
import { ContactService } from '../../services/contact.service';
import { MailResponse } from '../../models/mail-response';

@Component({
  selector: 'contact',
  imports: [
    ReactiveFormsModule,
    RouterOutlet
  ],
  template: `
    <div class="contact-form">
      <div>Będziemy wdzięczni za wszelkie uwagi i sugestie</div>
      <div>poliglotek.translator [małpa] gmail [kropka] com</div>
    </div>
    <router-outlet></router-outlet>
  `,
  styleUrl: './contact.component.scss'
})
export class ContactComponent implements OnInit {

  contactForm: FormGroup = new FormGroup({});

  constructor(private formBuilder: FormBuilder, private mailService: ContactService) { }

  ngOnInit(): void {
    const polishCharacters: string = "ąćęłńóśźżĄĆĘŁŃÓŚŹŻ";
    const acceptedCharacters: RegExp = new RegExp(`^[a-zA-Z0-9\\s${polishCharacters}.,!?'"-]*$`);
    this.contactForm = this.formBuilder.group({
      senderName: [
        '',
        [
          Validators.required,
          Validators.maxLength(50),
          this.validateCharacters(acceptedCharacters)
        ]
      ],
      senderEmail: [
        '',
        [
          Validators.required,
          Validators.email,
          Validators.maxLength(254)
        ]
      ],
      message: [
        '',
        [
          Validators.required,
          this.validateCharacters(acceptedCharacters)
        ]
      ]
    });
  }

  get senderName() {
    return this.contactForm.get('senderName');
  }

  get senderEmail() {
    return this.contactForm.get('senderEmail');
  }

  get message() {
    return this.contactForm.get('message');
  }

  sendMessage(): void {
    if (this.contactForm.valid) {
      console.log("Contact form", this.contactForm.value);
      this.mailService.sendMail(this.contactForm.value).subscribe({
        next: (resp: MailResponse): void => {
          console.log("Mail response", resp);
        },
        error: (err: HttpErrorResponse): Observable<never> => {
          return throwError((): Error => new Error(err.message));
        }
      });
    }
  }

  private validateCharacters(acceptedCharacters: RegExp): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const isForbiddenCharacter: boolean = !acceptedCharacters.test(control.value);
      return isForbiddenCharacter ? { forbiddenInput: { value: control.value } } : null;
    };
  }
}
