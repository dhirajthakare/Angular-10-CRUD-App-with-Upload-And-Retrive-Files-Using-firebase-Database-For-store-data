import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Model } from './model';

@Injectable({
  providedIn: 'root'
})
export class ContactserviceService {

  selectModel : Model; // this is for initial Model
  storeData : Model[]; // this is usefuul for store data when we Fetch it From Server. 

  constructor(public firestore : AngularFirestore) { 

  }

  // insert Data Api
  insertData(obj:Model){
   
    return this.firestore.collection('Contact').add({...obj});
  }


  //Fetch Data Api 
  fetchData(){

    return this.firestore.collection('Contact').snapshotChanges()
  }


  // update Data Api 
  updateData(obj:Model,id){
   
    return this.firestore.doc('Contact/'+id).update({...obj});
  }


  // Delete Api
  deleteData(id){
    return this.firestore.doc('Contact/'+id).delete();

  }

}
