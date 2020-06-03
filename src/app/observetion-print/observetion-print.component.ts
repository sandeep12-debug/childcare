import { Component, OnInit, ElementRef ,ViewChild} from '@angular/core';  
import * as jspdf from 'jspdf';  
import html2canvas from '@trainiac/html2canvas';  
import { ActivatedRoute } from '@angular/router';
import { ObservationService } from '../services/observation.service';

@Component({
  selector: 'app-observetion-print',
  templateUrl: './observetion-print.component.html',
  styleUrls: ['./observetion-print.component.scss']
})
export class ObservetionPrintComponent implements OnInit {
  ngOnInit(){
    this.getObservationDetails()
  }
  oid
  mid
  item
  name
  constructor(public route:ActivatedRoute,public observation:ObservationService){
    this.oid=this.route.snapshot.paramMap.get('oid')
    this.mid=this.route.snapshot.paramMap.get('mid')
    console.log(this.oid)
    console.log(this.mid)
  }
  public captureScreen()  
  {  
    var data = document.getElementById('contentToConvert');  
    html2canvas(data).then(canvas => {  
      // Few necessary setting options  
      var imgWidth = 208;   
      var pageHeight = 295;    
      var imgHeight = canvas.height * imgWidth / canvas.width;  
      var heightLeft = imgHeight;  
  
      const contentDataURL = canvas.toDataURL('image/png')  
      let pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF  
      var position = 0;  
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)  
      pdf.save('MYPdf.pdf'); // Generated PDF   
    });  
  }  

  getObservationDetails(){
    this.observation.common.showLoader()
    this.observation.getObservationMessage(this.oid,this.mid).subscribe(res=>{
      console.log(res)
      this.item=res
      this.getStudentData()
    })
  }

  getStudentData(){
    this.observation.getObservation(this.oid).subscribe((res:any)=>{
      this.observation.getStudentData(res.sid).then((data:any)=>{
        this.name=data.name
        this.observation.common.stopLoader()
      })
    })
  }

}
