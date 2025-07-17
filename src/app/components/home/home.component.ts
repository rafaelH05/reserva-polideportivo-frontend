import { Component, OnInit } from '@angular/core';
import { User } from '../../user';
import { UserService } from '../../service/user.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from "../footer/footer.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderComponent, FooterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  users : User [] = [];
  userUnic! : User;
  
  constructor(private userService : UserService) {}

  ngOnInit(): void {
    this.listUsers();
    this.userById();
  }

  listUsers(){
    this.userService.getUserList().subscribe(
      data => {
        this.users = data
        console.log(this.users);
      }
    );  
  }

  borrar(i? : number){
    this.deleteUser(i);
    
  }

  userById(){
    this.userService.getUserId().subscribe(
      data => {
        this.userUnic = data
      }
    );
  }

  deleteUser(i? : number){
    
    this.userService.deleteUser(i).subscribe(
      () => this.listUsers()
    );
  }

}
