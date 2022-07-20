import { Component, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { AngularFirestore, AngularFirestoreDocument, docChanges } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-certification',
  templateUrl: './certification.component.html',
  styleUrls: ['./certification.component.scss']
})
export class CertificationComponent implements OnInit {

  array:any[] = [];
  userState:any;
  closeResult!: string;
  user:any;
  comp:any;
  ucompid :any;
  constructor(private modalService: NgbModal,public afs: AngularFirestore,private firestore: AngularFirestore,public router: Router,public translate:TranslateService) {
    this.userState = JSON.parse(localStorage.getItem('userinfo') || '{}');
    this.comp = JSON.parse(localStorage.getItem('comp') || '{}');

    afs.collection('nusers').doc(this.userState.id).collection('certifications').get()
    .subscribe(async (comp: { docs: any[]; }) => {
      if(comp.docs.length === 0)
      {
        afs.collection('nusers').doc(this.userState.id).collection('certifications').doc('init')
        .set({id:"",})
      }

else{
  this.afs.collection('nusers').doc(this.userState.id).collection('certifications').get()
  .subscribe((userinfo: { docs: any[]; }) =>{
      userinfo.docs.forEach((doc: { data: () => any; }) => {
       this.array.push(doc.data())
        })
      })
    }
  })
  }


  ngOnInit(): void {
  }

  opentextera(content: any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  getDismissReason(reason: any) {
    throw new Error('Method not implemented.');
  }

  addcomp()
  {
    const title = document.getElementById('title') as HTMLInputElement
    const org = document.getElementById('org')  as HTMLInputElement
    const cat = document.getElementById('cathegory')  as HTMLInputElement

    if(title.value.length != 0 && org.value.length != 0)
    {
      let id = this.createId();
      this.afs.collection('nusers').doc(this.userState.id).collection('certifications').doc(id)
      .set({
        id:id,
        title:title.value,
        organisme:org.value,
        cathegorie:cat.value,
          })
    }else{
       alert(this.translate.instant("alerts.alert6"))
    }
  }

  createId(){
    // Alphanumeric characters
    const chars =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let autoId = '';
    for (let i = 0; i < 20; i++) {
      autoId += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    return autoId;
  }

  saveid(id:string)
  {
    this.ucompid = id
  }

  modifycomp()
  {
    const title = document.getElementById('title1') as HTMLInputElement
    const org = document.getElementById('org1')  as HTMLInputElement
    const cat = document.getElementById('cathegory1')  as HTMLInputElement
    console.log(this.ucompid)

   if(title.value)
   {
    this.afs.collection('nusers').doc(this.userState.id).collection('certifications').doc(this.ucompid).update({title:title.value})
   }

    if(org.value)
    {
      this.afs.collection('nusers').doc(this.userState.id).collection('certifications').doc(this.ucompid).update({organisme:org})
    }

    if(cat.value)
    {
      this.afs.collection('nusers').doc(this.userState.id).collection('certifications').doc(this.ucompid).update({cathegorie:cat.value})
    }

  }

  deletecomp()
  {
    this.afs.collection('nusers').doc(this.userState.id).collection('certifications').doc(this.ucompid).delete()
  }

  confirm() {
    if(confirm(this.translate.instant("alerts.alert7"))) {
      this.deletecomp()
    }
  }
}
