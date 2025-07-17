import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { User } from '../../user';
import { UserService } from '../../service/user.service';
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from "../footer/footer.component";
import { MessageService } from '../../service/message.service';
import { MessageComponent } from '../../message/message.component';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterModule, FormsModule, HeaderComponent, FooterComponent, MessageComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  first_name: string = "";
  username: string = "";
  last_name: string = "";
  telephone: string = "";
  email: string = "";
  password: string = "";

  constructor(
    private messageService: MessageService,
    private userService: UserService
  ) {}


  register() {

    let user = new User(this.first_name, this.last_name, this.telephone, this.email, this.username, this.password, false);

    this.userService.createUser(user).subscribe(
      data => {
        localStorage.setItem("token", data.token);
        window.location.href = "/homeLogin";
      },
      error => {
        this.messageService.showError(error.status, error.error);
      }
    );
  }

}
