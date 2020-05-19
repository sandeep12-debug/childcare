import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EducatorService } from '../services/educator.service';
import { NgForm } from '@angular/forms';
import { ObservationService } from '../services/observation.service';
import { CommonService } from '../services/common.service';

@Component({
  selector: 'app-update-educator-profile',
  templateUrl: './update-educator-profile.component.html',
  styleUrls: ['./update-educator-profile.component.scss']
})
export class UpdateEducatorProfileComponent implements OnInit {
  uid;
  profileInfo;
  assignedStudents=[]
  constructor(public route:ActivatedRoute,public profileService:EducatorService,public observation:ObservationService,public common:CommonService) { }

  ngOnInit(): void {
    this.uid=this.route.snapshot.params.uid;
    console.log(this.uid)
    this.profileService.getEducator(this.uid).subscribe(res=>{
      this.profileInfo=res
    })
    this.getObservationsDocs()
  }

  update(formData:NgForm){
    this.profileService.updateEducatorProfile(this.uid,formData.value)
  }

  getObservationsDocs(){
    this.assignedStudents=[]
    this.observation.getObserversByEid(this.uid).subscribe((res)=>{
      res.forEach(element=>{
        element.then(data=>{
          this.assignedStudents.push(data)
          console.log(this.assignedStudents)
        })
      })
    })
  }

}
