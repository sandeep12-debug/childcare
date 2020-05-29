import { Component, OnInit } from '@angular/core';
import {  ActivatedRoute } from '@angular/router';
import { ObservationService } from '../services/observation.service';
import { CommonService } from '../services/common.service';
import { AuthService } from '../services/auth.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

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
  constructor(public router:ActivatedRoute,public observation:ObservationService,public common:CommonService,public auth:AuthService,private modalService: NgbModal) { }

  ngOnInit(): void {
    this.oid=this.router.snapshot.params.oid
    this.observation.getAllObservations(this.oid).subscribe(res=>{
      console.log(res)
      this.observationMessageList=res
    })

  }

  addObservation(form){
    this.observation.addObservation(this.oid,form.value.message).then(res=>{
      this.common.showToast("success","Successfully Added Observation","")
      form.reset()
      this.modalService.dismissAll()
    })
  }

  deleteObservation(){

  }

  editObservation(form){
    this.observation.updateObservation(this.oid,this.selectedItem.id,form.value.message).then(res=>{
      this.common.showToast("success","Successfully Updated Observation","")
      this.selectedItem=null
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

}
