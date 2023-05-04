import { Component,OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AlertController } from '@ionic/angular';
import { AuthenticationService } from "../../shared/authentication-service";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  constructor(
    public authService: AuthenticationService,
    public router: Router,
    private alertController: AlertController,
    private formBuilder: FormBuilder
  ) {}

  loginForm!: FormGroup;
  isSubmitted = false;
  ngOnInit() {
    this.loginForm = this.formBuilder.group(
      {
        email: ['', Validators.compose([Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')])],
        password: ['', Validators.compose([
          Validators.minLength(5),
          Validators.required
        ])]
      }
    )
  }

  get errorControl() {
    return this.loginForm.controls;
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Alert',
      subHeader: '',
      message: 'Email is not verified',
      buttons: ['OK'],
    });
    await alert.present();
  }


  logIn(email: { value: string; }, password: { value: string; }) {
      this.isSubmitted=true;
      this.authService.SignIn(email.value,password.value)
        .then(() => {
          if(this.authService.isEmailVerified) {
            this.router.navigate(['cities']);  
            return 0;        
          } else {
            this.presentAlert();
            return false;
          }
        }).catch((error) => {
          window.alert(error.message)
        })
    
  }
}