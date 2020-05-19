import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private db:AngularFirestore,public https:HttpClient,public common:CommonService) { }

  async addStudent(cred:{email:string,password:string},profileInfo){
    let status=false
    this.common.showLoader()
    setTimeout(()=>{
      this.common.stopLoader();
      if(!status){
        this.common.showToast("error","Error Occoured","User Might already Exist")
      }

    },10000)
    await this.https.post('https://us-central1-observationportal.cloudfunctions.net/createStudent' , {'email': cred.email , 'pass' : cred.password.toString()}).subscribe((res:any)=>{
      console.log(res)
      if(res.uid){
        console.log(res)
        this.db.collection("users").doc(res.uid.toString()).set({role:"student",archive:false,...profileInfo}).then(res=>{
          this.common.showToast("success","Successfully Added New Student","")
          status=true
          this.common.stopLoader()
        })
      }
    })
    
  }

  updateStudentProfile(uid,profileInfo){
    this.common.showLoader()
    return this.db.collection("users").doc(uid).update(profileInfo).then(res=>{
      this.common.showToast("success","operation successful","")
    }).catch(err=>{
      this.common.showToast("error",err,"")
    }).finally(()=>{
      this.common.stopLoader()
    })
  }

  getStudents(){
    return this.db.collection("users",ref=>ref.where("role","==","student")).snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as any;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }

  getUnArchivedStudents(){
    return this.db.collection("users",ref=>ref.where("role","==","student").where('archive','==',false)).snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as any;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }

  getStudent(uid){
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
