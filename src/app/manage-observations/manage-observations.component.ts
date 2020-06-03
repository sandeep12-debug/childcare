import { Component, OnInit } from '@angular/core';
import {  ActivatedRoute } from '@angular/router';
import { ObservationService } from '../services/observation.service';
import { CommonService } from '../services/common.service';
import { AuthService } from '../services/auth.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-manage-observations',
  templateUrl: './manage-observations.component.html',
  styleUrls: ['./manage-observations.component.scss']
})
export class ManageObservationsComponent implements OnInit {
  oid;
  observationMessageList
  isEditMode=false
  selectedItem=null
  selectedFile=null
  name
  constructor(public router:ActivatedRoute,public observation:ObservationService,public common:CommonService,public auth:AuthService,private modalService: NgbModal,public storage:StorageService) { }

  ngOnInit(): void {
    this.oid=this.router.snapshot.params.oid
    this.name=this.router.snapshot.params.name
    this.observation.getAllObservations(this.oid).subscribe(res=>{
      console.log(res)
      this.observationMessageList=res
    })

  }

  addObservation(form){
    this.common.showLoader()
    this.observation.addObservation(this.oid,form.value).then(res=>{
      //this.common.showToast("success","Successfully Added Observation","")
      if(this.selectedFile){
        this.storage.upload(res.id,this.selectedFile).then(fileurl=>{
          this.observation.updateObservation(this.oid,res.id,{fileurl:fileurl})
          form.reset()
          this.modalService.dismissAll()
          this.common.showToast("success","Successfully Added Observation","")
          this.common.stopLoader()
        }).catch(err=>{
          console.log(err)
          this.common.stopLoader()
        })
      }
     
    }).catch(err=>{
      console.log(err)
      this.common.stopLoader()
    }).finally(()=>{
      this.selectedFile=null
    })
  }

  deleteObservation(){

  }

  editObservation(form){
    this.common.showLoader()
    this.observation.updateObservation(this.oid,this.selectedItem.id,form.value).then(res=>{
      if(this.selectedFile){
        this.storage.upload(this.selectedItem.id,this.selectedFile).then(fileurl=>{
          this.observation.updateObservation(this.oid,this.selectedItem.id,{fileurl:fileurl})
          form.reset()
          this.modalService.dismissAll()
          this.common.showToast("success","Successfully Updated Observation","")
          this.common.stopLoader()
        }).catch(err=>{
          console.log(err)
          this.common.stopLoader()
        })
      }
    }).finally(()=>{
      this.common.stopLoader()
      this.selectedFile=null
      this.modalService.dismissAll()
      form.reset()
    })
  }

  onEdit(id){
    this.selectedItem=id
  }

  cancelForm(){
    this.selectedItem=null
  }

  deleteObservationMessage(id){
    console.log("hello")
    this.observation.delObservation(this.oid,id)
  }

  openVerticallyCentered(content) {
    this.modalService.open(content, { centered: true });
  }


  openeditmodal(edit,item) {
    this.modalService.open(edit, { centered: true });
    this.onEdit(item)
  }

  selectFile(event){
    console.log(event)
    if(event.target.files[0]){
      console.log(event.target.files[0])
      this.selectedFile=event.target.files[0]
    }
  }

}
