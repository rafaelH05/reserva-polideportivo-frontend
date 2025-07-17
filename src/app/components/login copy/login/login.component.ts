import { Component, OnInit} from '@angular/core';
import { RouterModule } from '@angular/router';
import {FormsModule} from '@angular/forms';
import { UserService } from '../../../service/user.service';
import { Login } from '../../../Login';
import { HeaderComponent } from "../../header/header.component";
import { FooterComponent } from "../../footer/footer.component";
import { MessageService } from '../../../service/message.service';
import { MessageComponent } from "../../../message/message.component";



@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule, FormsModule, HeaderComponent, FooterComponent, MessageComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent{
  
  username : string = "";
  password : string = "";


  constructor(
    private userService: UserService,
    private messageService: MessageService
  ) {}
  login(){ 

    let user = new Login(this.username, this.password);

    this.userService.loginUser(user).subscribe(

      data => localStorage.setItem("token", data.token),
      error => {
        this.messageService.showError(error.status, error.message);
      }
    );
    if(localStorage.getItem("token") != null){
      window.location.href = "/homeLogin";
    }
  }

}
