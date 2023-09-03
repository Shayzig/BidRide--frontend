import { Component, inject } from '@angular/core'
import { FormBuilder, FormGroup, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { User } from 'src/app/models/user.model'
import { UserService } from 'src/app/services/user.service'
import { CustomValidators } from 'src/app/validators/custom-validators'
import { ActivatedRoute } from '@angular/router'

@Component({
  selector: 'login-signup',
  templateUrl: './login-signup.component.html',
  styleUrls: ['./login-signup.component.scss']
})
export class LoginSignupComponent {
  private route = inject(ActivatedRoute)
  private userService = inject(UserService)
  private router = inject(Router)

  validateForm!: UntypedFormGroup;

  constructor(private fb: UntypedFormBuilder) { }

  status: string = ""
  user!: User

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]],
      isAdmin: [false],
      moves: [[]]
    });

    this.route.queryParams.subscribe(params => {
      const isLogin = params['isLogin']
      if (isLogin === 'true') {
        this.status = 'Login'
      } else {
        this.status = 'Signup'
      }
    })
  }

  isLogin = true

  submitForm(user?: any): void {
    if (this.validateForm.valid) {
      const user = { ...this.user, ...this.validateForm.value }
      this.userService.login(user).subscribe({
        next: () => this.router.navigateByUrl('/'),
        error: err => {
          console.log('Error:', err)
        }
      })
    } else {
      Object.values(this.validateForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  quickLogin(username: any) {
    const user = {
      username
    }
    this.userService.login(user).subscribe({
      next: () => this.router.navigateByUrl('/'),
      error: err => {
        console.log('Error:', err)
      }
    })
  }


  // constructor() {
  //   this.form = this.fb.group({
  //     name: ['', [Validators.required], [CustomValidators.nameTaken]],
  //     username: [''],
  //     isAdmin: [false],
  //     moves: [[]]
  //   })



  // }

  // private fb = inject(FormBuilder)
  // private userService = inject(UserService)
  // private router = inject(Router)
  // private route = inject(ActivatedRoute)

  // status: string = ""
  // user!: User
  // form!: FormGroup

  // onSignup() {
  //   const user = { ...this.user, ...this.form.value }
  //   this.userService.login(user).subscribe({
  //     next: () => this.router.navigateByUrl('/'),
  //     error: err => {
  //       console.log('Error:', err)
  //     }
  //   })
  // }
}
