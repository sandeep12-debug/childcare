import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.scss']
})
export class ParentComponent implements OnInit {

  constructor(public auth:AuthService) { }

  ngOnInit(): void {
  }

  logout(){
    this.auth.logOut()
  }

}
