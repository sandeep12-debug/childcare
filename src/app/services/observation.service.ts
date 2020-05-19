import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { CommonService } from './common.service';
import * as firebase from 'firebase';
import { StudentService } from './student.service';
import { EducatorService } from './educator.service';
@Injectable({
  providedIn: 'root'
})
export class ObservationService {

  constructor(public db:AngularFirestore,public common:CommonService,public student:StudentService,public educator:EducatorService) { }

  addObserver(sid,eid){
    this.common.showLoader()
    this.db.collection("observations",ref=>ref.where("eid","==",eid).where("sid","==",sid)).get().subscribe(res=>{
      if(!res.empty){
        this.common.showToast("error","Already Assigned","")
        this.common.stopLoader()
      }
      else{
        return this.db.collection("observations").add({sid,eid,archive:false}).then(res=>{
          this.common.showToast("success","Assigned Successfully","")
          this.common.goBack()
         
        }).catch(err=>{
          this.common.showToast("error",err,"")
        }).finally(()=>{
          this.common.stopLoader()
        })
      }
    })

  }

  archiveObserver(id){
    return this.db.collection("observations").doc(id).update({archive:true})
  }

  makeObservervationActive(id){
    return this.db.collection("observations").doc(id).update({archive:false})
  }

  getObserversBySid(sid){
    return this.db.collection("observations",ref=>ref.where("sid","==",sid)).snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as any;
        const id = a.payload.doc.id;
        return this.getEducatorData(data.eid).then(res=>{
          return res
        }).then(educatorData=>{
          return this.getStudentData(data.sid).then(studentData=>{
            return {studentData,educatorData,id,...data}
          })
        })
      }))
    )
  }

  getObserversByEid(eid){
    return this.db.collection("observations",ref=>ref.where("eid","==",eid)).snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as any;
     
        return this.getStudentData(data.sid).then(res=>{
          let studentData
          studentData=res
          let educatorData;
          return this.getEducatorData(data.eid).then(res=>{
          educatorData=res
          const id = a.payload.doc.id;
          return { id,studentData,educatorData, ...data };
        })
        })
        

      }))
    );
  }

  

  getStudentData(sid){
    return new Promise(resolve=>{
     this.db.collection("users").doc(sid).valueChanges()
       .subscribe(
          (data:any) => {
              resolve(data);
       })
    })
  }

  getEducatorData(eid){
    return new Promise(resolve=>{
    this.db.collection("users").doc(eid).valueChanges()
       .subscribe(
          (data:any) => {
            console.log(data)
              resolve(data);
       })
    })
  }
}
