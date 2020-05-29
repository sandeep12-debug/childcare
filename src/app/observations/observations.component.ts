import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ObservationService } from '../services/observation.service';
import { AuthService } from '../services/auth.service';
import { CommonService } from '../services/common.service';

@Component({
  selector: 'app-observations',
  templateUrl: './observations.component.html',
  styleUrls: ['./observations.component.scss']
})
export class ObservationsComponent implements OnInit {
  observations=[]
  loading=true
  constructor(public router:ActivatedRoute,public observation:ObservationService,public auth:AuthService,public common:CommonService) { }

  ngOnInit(): void {
    this.common.showLoader()
    this.loading=true
    if(this.router.snapshot.params.type=="e"){
      this.getObservationbyEid()
    }
    if(this.router.snapshot.params.type=="s"){
      this.getObservationbySid()
    }
  }

  getObservationbyEid(){
    this.observation.getObserversByEid(this.router.snapshot.params.id).subscribe(res=>{
      this.loading=false
      this.observations=[]
      res.forEach(element=>{
        element.then(observationData=>{
          console.log(observationData)
          this.observations.push(observationData)
        })
      })
      
      this.common.stopLoader()
      
    })
  }

  getObservationbySid(){
    this.observation.getObserversBySid(this.router.snapshot.params.id).subscribe(res=>{
      this.loading=false
      this.observations=[]
      res.forEach(element=>{
        element.then(observationData=>{
          console.log(observationData)
          this.observations.push(observationData)
        })
      })
      
      this.common.stopLoader()

    })
  }

}
