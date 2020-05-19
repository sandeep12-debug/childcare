import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-educator',
  templateUrl: './educator.component.html',
  styleUrls: ['./educator.component.scss']
})
export class EducatorComponent implements OnInit {

  constructor(public auth:AuthService) { }

  ngOnInit(): void {
  }

  logout(){
    this.auth.logOut()
  }

}
