import { Component, OnInit } from '@angular/core';
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
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { MailService } from '../../services/mail.service';
import { MailResponse } from '../../models/mail-response';

@Component({
  selector: 'contact',
  imports: [
    ReactiveFormsModule,
    MatFormField,
    MatInput,
    MatLabel,
    MatButton,
    RouterOutlet,
    NavbarComponent,
    MatError
  ],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent implements OnInit {
  contactForm: FormGroup = new FormGroup({});

  constructor(private formBuilder: FormBuilder, private mailService: MailService) { }

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
      this.mailService.sendMail(this.contactForm.value).subscribe((resp: MailResponse) => {
        console.log("Mail response", resp);
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
