import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-coordinator',
  templateUrl: './coordinator.component.html',
  styleUrls: ['./coordinator.component.scss']
})
export class CoordinatorComponent implements OnInit {

  constructor(public auth:AuthService,public config: NgbDropdownConfig) { 
    config.placement = 'bottom-left';
    config.autoClose = true;
  }

  ngOnInit(): void {
    
  }

  logout(){
    
    this.auth.logOut()
  }
}
