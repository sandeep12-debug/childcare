import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { CommonService } from './common.service';
@Injectable({
  providedIn: 'root'
})
export class EducatorService {

  constructor(private db:AngularFirestore,public https:HttpClient,public common:CommonService) { }
  //https://us-central1-observationportal.cloudfunctions.net/createStudent
  addEducator(cred:{email:string,password:string},profileInfo){
    let status=false
    this.common.showLoader()
    setTimeout(()=>{
      this.common.stopLoader();
      if(!status){
        this.common.showToast("error","Error Occoured","User Might already Exist")
      }

    },12000)  
    return this.https.post('https://us-central1-observationportal.cloudfunctions.net/createEducator' , {'email': cred.email , 'pass' : cred.password.toString()}).subscribe((res:any)=>{
      if(res.uid){
        console.log(res)
        this.db.collection("users").doc(res.uid.toString()).set({role:"educator",archive:false,...profileInfo}).then(res=>{
          this.common.showToast("success","Successfully Added New Educator","")
          status=true
        })
      }
      this.common.stopLoader()
    })
  }

  updateEducatorProfile(uid,profileInfo){
    this.common.showLoader()
    return this.db.collection("users").doc(uid).update(profileInfo).then(res=>{
      this.common.showToast("success","operation successful","")
    }).catch(err=>{
      this.common.showToast("error",err,"")
    }).finally(()=>{
      this.common.stopLoader()
    })
  }

  getEducators(){
    return this.db.collection("users",ref=>ref.where("role","==","educator")).snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as any;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }

  getUnArchivedEducators(){
    return this.db.collection("users",ref=>ref.where("role","==","educator").where('archive','==',false)).snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as any;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }

  getEducator(uid){
    return this.db.collection("users").doc(uid).valueChanges()
  }

  archive(uid){
    this.common.showLoader()
    this.db.collection("users").doc(uid).update({archive:true}).then(res=>{
      this.common.showToast("success","operation successful","")
    }).catch(err=>{
      this.common.showToast("error",err,"")
    }).finally(()=>{
      this.common.stopLoader()
    })
  }

  makeActive(uid){
    this.common.showLoader()
    this.db.collection("users").doc(uid).update({archive:false}).then(res=>{
      this.common.showToast("success","operation successful","")
    }).catch(err=>{
      this.common.showToast("error",err,"")
    }).finally(()=>{
      this.common.stopLoader()
    })
  }

}
