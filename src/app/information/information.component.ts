import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ContactserviceService } from '../Resource/contactservice.service';
import { Model } from '../Resource/model';

@Component({
  selector: 'app-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.css']
})
export class InformationComponent implements OnInit {

  constructor(
    public contactservice:ContactserviceService,
    public router:Router
    ) { }

  ngOnInit(): void {
    this.getData() // refresh list Automaticaly when page load 
  }


   // get Data method 
  getData(){
    this.contactservice.fetchData().subscribe((data)=>{
      
      this.contactservice.storeData =  data.map((document)=>{
        return {
          id:document.payload.doc.id,
          ...document.payload.doc.data() as {}
        } as Model
        

      })

      
    })
  }


  // this method is usefull for pass form data from information component to register component using router
  Edit(cont){

    this.router.navigate(['Registration'],{
      queryParams:{
        token:btoa((JSON.stringify(cont)) )
      }
    } )

  }

  // this is method for Delete Data 
  delete(id){

    if(confirm('Are You Sure! You Want To Delete It?')){
    this.contactservice.deleteData(id);
    }
  }


}
