import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EducatorService } from '../services/educator.service';
import { ObservationService } from '../services/observation.service';
import { CommonService } from '../services/common.service';

@Component({
  selector: 'app-map-educator',
  templateUrl: './map-educator.component.html',
  styleUrls: ['./map-educator.component.scss']
})
export class MapEducatorComponent implements OnInit {
  sid
  availableEducators=[]
  selectedEid
  constructor(public route:ActivatedRoute,public educatorService:EducatorService,public observation:ObservationService,public common:CommonService) { }

  ngOnInit(): void {
    this.sid=this.route.snapshot.params.sid;
    this.educatorService.getUnArchivedEducators().subscribe(res=>{
      this.availableEducators=res
    })
  }

  assignEducator(){
    console.log(this.sid,this.selectedEid)
    this.observation.addObserver(this.sid,this.selectedEid)
  }

}
