import { Component, ElementRef, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ContactserviceService } from '../Resource/contactservice.service';
import { ActivatedRoute } from '@angular/router';
import { Model } from '../Resource/model';
import { AngularFireStorage} from '@angular/fire/storage'
import { ViewChild} from '@angular/core';
import { finalize } from 'rxjs/operators'

declare var M;
@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})

export class RegistrationComponent implements OnInit {
  @ViewChild('filereftype') InputVar : ElementRef;
    displaySubmit="block"; // useful to display or hide Submit button whenver need
    displayUpdate="none"; // useful to display or hide update button whenver need
    data:any;  // get And Store data from information component
    idtype="";
    message="";
    color="";
    path:any;
    imageUrl='';
    public statechange=false;
    required = true;

  constructor(
    public contactservic:ContactserviceService,
    public router:ActivatedRoute,
    public af :AngularFireStorage
    
    ) { }


    //Initialize some requre things
  ngOnInit(): void {

    this.onreset();
    
    // to get data form information component
    this.router.queryParams.subscribe((res)=>{
      this.data = JSON.parse(atob(res.token))
      this.idtype=this.data.id;
      if(this.data.id!==''){
        this.Edit(this.data);
      }

    })
  }

    // for Submit form data
  onSubmit(form:NgForm){

    this.contactservic.insertData(form.value);
    this.message="Data Save Successfully";
    this.color="green";
    this.onreset();
    // this.uploadImage();



  }
  



// reset form
  onreset(form?:NgForm){
    if(form)
    form.reset();

    this.contactservic.selectModel = {

      id: "",
      Name:"",
      Email:"",
      Mob:"",
      imageUrl:""

}



  }

 

//file upload
upload($event){
  this.path = $event.target.files[0];
  console.log(this.path);
  console.log(this.path.name);
this.statechange=true;


}

uploadAndInsert(form:NgForm){

var filepath = "UploadFromAngular/image"+this.path.name;
const fileref=this.af.ref(filepath);
this.af.upload(filepath,this.path).snapshotChanges().pipe(
  finalize(()=>{
    fileref.getDownloadURL().subscribe((url)=>{
      this.imageUrl=url;
      console.log("this is link "+this.imageUrl);
      form.value.imageUrl=this.imageUrl;
      this.contactservic.insertData(form.value);
    this.message="Data Save Successfully";
    this.color="green";
    this.onreset();
    this.statechange=false;
    })
  })
).subscribe();
}


 // add existing record to the form 
 Edit(data:Model){

  this.contactservic.selectModel = data;
  this.displayUpdate="block";
  this.displaySubmit="none";
  this.required=false;


}

  updateAndSubmit(form){

    if(this.statechange==true){
      this.UpdateAndUpload(form);
      this.displayUpdate="none";
      this.displaySubmit="block";
      this.message="Data Update Successfully";
      this.color="purple";
      this.statechange=false;
      this.required=true;
    }else{
      this.updateData(form);
      this.displayUpdate="none";
      this.displaySubmit="block";
      this.message="Data Update Successfully";
      this.color="purple";
      this.statechange=false;
      this.required=true;
    }
  }

   //for Update existing data
   updateData(form:NgForm ){

    this.contactservic.updateData(form.value,this.idtype);
    this.onreset();


}

//Update Existing record..
UpdateAndUpload(form:NgForm){

  var filepath = "UploadFromAngular/image"+this.path.name;
  const fileref=this.af.ref(filepath);
  this.af.upload(filepath,this.path).snapshotChanges().pipe(
    finalize(()=>{
      fileref.getDownloadURL().subscribe((url)=>{
        this.imageUrl=url;
        form.value.imageUrl=this.imageUrl;
        this.contactservic.updateData(form.value,this.idtype);
        this.onreset();

      
      })
    })
  ).subscribe();
  }

 

}
