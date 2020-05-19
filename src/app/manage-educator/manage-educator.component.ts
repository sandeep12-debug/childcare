import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { EducatorService } from '../services/educator.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-manage-educator',
  templateUrl: './manage-educator.component.html',
  styleUrls: ['./manage-educator.component.scss']
})
export class ManageEducatorComponent implements OnInit {
  educators=[]
  constructor(public educatorService:EducatorService,private modalService: NgbModal) { }

  ngOnInit(): void {
    this.educatorService.getEducators().subscribe(res=>{
      this.educators=res
      console.log(this.educators)
    })

 
  }

  addEducator(educatorFrom:NgForm){
    let cred={email:educatorFrom.value.email,password:educatorFrom.value.password}
    //delete educatorFrom.value.email
    delete educatorFrom.value.password
    this.educatorService.addEducator(cred,educatorFrom.value)
    this.modalService.dismissAll()
  }

  toggleArchive(uid,current_status){
    if(current_status){
      console.log("true")
      this.educatorService.makeActive(uid)
    }
    else{
      this.educatorService.archive(uid)
    }
  }


  
  openVerticallyCentered(content) {
    this.modalService.open(content, { centered: true });
  }


}
