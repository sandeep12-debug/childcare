import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { StudentService } from '../services/student.service';
import { ObservationService } from '../services/observation.service';
import { CommonService } from '../services/common.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-update-student-profile',
  templateUrl: './update-student-profile.component.html',
  styleUrls: ['./update-student-profile.component.scss']
})
export class UpdateStudentProfileComponent implements OnInit {
  uid;
  profileInfo;
  assignedEducators=[]
  constructor(public route:ActivatedRoute,public profileService:StudentService,public observtion:ObservationService,public common:CommonService,public auth:AuthService) { }

  ngOnInit(): void {
    this.uid=this.route.snapshot.params.uid;
    console.log(this.uid)
    this.profileService.getStudent(this.uid).subscribe(res=>{
      this.profileInfo=res
    })
    this.getObservationsDocs()
  }

  update(formData:NgForm){
    this.profileService.updateStudentProfile(this.uid,formData.value)
  }

  getObservationsDocs(){
    this.assignedEducators=[]
    this.observtion.getObserversBySid(this.uid).subscribe((res)=>{
      res.forEach(element=>{
        element.then(data=>{
          this.assignedEducators.push(data)
          console.log(this.assignedEducators)
        })
      })
    })
  }
}
