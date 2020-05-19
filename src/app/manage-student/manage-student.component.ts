import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { StudentService } from '../services/student.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ObservationService } from '../services/observation.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-manage-student',
  templateUrl: './manage-student.component.html',
  styleUrls: ['./manage-student.component.scss']
})
export class ManageStudentComponent implements OnInit {
  students=[]
  constructor(public studentService:StudentService,private modalService: NgbModal,public observation:ObservationService,public route:ActivatedRoute,public auth:AuthService) { }

  ngOnInit(): void {
    if(this.route.snapshot.params.uid){
      this.getStudentsbyEid()
    }
    else{
      this.studentService.getStudents().subscribe(res=>{
        this.students=[]
        this.students=res
      })
    }
  }

  addStudent(educatorFrom:NgForm){
    let cred={email:educatorFrom.value.email,password:educatorFrom.value.password}
    //delete educatorFrom.value.email
    delete educatorFrom.value.password
    this.studentService.addStudent(cred,educatorFrom.value)
    this.modalService.dismissAll()
  }

  toggleArchive(uid,current_status){
    if(current_status){
      console.log("true")
      this.studentService.makeActive(uid)
      this.getStudentsbyEid()
    }
    else{
      this.studentService.archive(uid)
      this.getStudentsbyEid()
    }
  }


  
  
  openVerticallyCentered(content) {
    this.modalService.open(content, { centered: true });
  }

  getStudentsbyEid(){
    this.observation.getObserversByEid(this.route.snapshot.params.uid).subscribe(res=>{
      this.students=[]
      res.forEach(element=>{
        element.then(observationData=>{
          console.log(observationData)
          let studentdata=observationData.studentData
          let id=observationData.sid
          this.students.push({id,...studentdata})
          console.log(this.students)
        })
      })
    })
  }


}
