import { Component,ElementRef, OnInit,ViewChild } from '@angular/core';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import * as htmlToImage from 'html-to-image';
import { toPng, toJpeg, toBlob, toPixelData, toSvg } from 'html-to-image';
import { AngularFirestore, AngularFirestoreDocument, docChanges } from '@angular/fire/compat/firestore';
import { color } from 'html2canvas/dist/types/css/types/color';

@Component({
  selector: 'app-template1',
  templateUrl: './template1.component.html',
  styleUrls: ['./template1.component.scss']
})

export class Template1Component implements OnInit {
  info! : any
  arrcomp : any[] = []
  arrcur : any[] = []
  arrcert : any[] = []
  arrexp : any[] = []
  arrlang : any[] = []
  arrlor : any[] = []
  arrlien : any[] = []
  i!:any

  @ViewChild('content', { static: false }) el!: ElementRef;
  userState: any;
  constructor(public afs: AngularFirestore) {
    this.userState = JSON.parse(localStorage.getItem('userinfo') || '{}');

    /**---------------------------------------loading compenent------------------------------------- */
    afs.collection('nusers').doc(this.userState.id).collection('competences').get()
    .subscribe(async (comp: { docs: any[]; }) => {
      if(comp.docs.length === 0)
      {
        afs.collection('nusers').doc(this.userState.id).collection('competences').doc('init')
        .set({id:"",})
      }

else{
  this.afs.collection('nusers').doc(this.userState.id).collection('competences').get()
  .subscribe((userinfo: { docs: any[]; }) =>{
      userinfo.docs.forEach((doc: { data: () => any; }) => {
       this.arrcomp.push(doc.data())
       console.log(this.arrcomp)
        })
      })
    }
  })

    /**-----------------------------------------loading cursus--------------------------------------- */
    afs.collection('nusers').doc(this.userState.id).collection('formations').get()
    .subscribe(async (comp: { docs: any[]; }) => {
      if(comp.docs.length === 0)
      {
        afs.collection('nusers').doc(this.userState.id).collection('formations').doc('init')
        .set({id:"",})
      }

else{
  this.afs.collection('nusers').doc(this.userState.id).collection('formations').get()
  .subscribe((userinfo: { docs: any[]; }) =>{
      userinfo.docs.forEach((doc: { data: () => any; }) => {
       this.arrcur.push(doc.data())
        })
      })
    }
  })

    /**---------------------------------------loading certification------------------------------------- */
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
       this.arrcert.push(doc.data())
        })
      })
    }
  })

    /**---------------------------------------loading experience------------------------------------- */
    afs.collection('nusers').doc(this.userState.id).collection('experiences').get()
    .subscribe(async (comp: { docs: any[]; }) => {
      if(comp.docs.length === 0)
      {
        afs.collection('nusers').doc(this.userState.id).collection('experiences').doc('init')
        .set({id:"",})
      }

else{
  this.afs.collection('nusers').doc(this.userState.id).collection('experiences').get()
  .subscribe((userinfo: { docs: any[]; }) =>{
      userinfo.docs.forEach((doc: { data: () => any; }) => {
       this.arrexp.push(doc.data())
        })
      })
    }
  })

    /**---------------------------------------loading language------------------------------------- */
    afs.collection('nusers').doc(this.userState.id).collection('langages').get()
    .subscribe(async (comp: { docs: any[]; }) => {
      if(comp.docs.length === 0)
      {
        afs.collection('nusers').doc(this.userState.id).collection('langages').doc('init')
        .set({id:"",})
      }

else{
  this.afs.collection('nusers').doc(this.userState.id).collection('langages').get()
  .subscribe((userinfo: { docs: any[]; }) =>{
      userinfo.docs.forEach((doc: { data: () => any; }) => {
       this.arrlang.push(doc.data())
        })
      })
    }
  })

    /**---------------------------------------loading lorsir------------------------------------- */
    afs.collection('nusers').doc(this.userState.id).collection('loisirs').get()
    .subscribe(async (comp: { docs: any[]; }) => {
      if(comp.docs.length === 0)
      {
        afs.collection('nusers').doc(this.userState.id).collection('loisirs').doc('init')
        .set({id:"",})
      }

else{
  this.afs.collection('nusers').doc(this.userState.id).collection('loisirs').get()
  .subscribe((userinfo: { docs: any[]; }) =>{
      userinfo.docs.forEach((doc: { data: () => any; }) => {
       this.arrlor.push(doc.data())
        })
      })
    }
  })

    /**---------------------------------------loading lien------------------------------------- */
    afs.collection('nusers').doc(this.userState.id).collection('liens').get()
    .subscribe(async (comp: { docs: any[]; }) => {
      if(comp.docs.length === 0)
      {
        afs.collection('nusers').doc(this.userState.id).collection('liens').doc('init')
        .set({id:"",})
      }

else{
  this.afs.collection('nusers').doc(this.userState.id).collection('liens').get()
  .subscribe((userinfo: { docs: any[]; }) =>{
      userinfo.docs.forEach((doc: { data: () => any; }) => {
       this.arrlien.push(doc.data())
        })
      })
    }
  })
  }

  ngOnInit(): void {
  }

  changefont(font: string)
  {
   const node = document.getElementById('TRUC') as HTMLInputElement
   node.style.fontFamily = font
  }

  changetheme(theme: string)
  {
    const node = document.getElementById('TRUC') as HTMLInputElement
    node.style.backgroundColor = theme
  }

  public captureScreen() {
    const filename = 'cv.pdf';
    const node = document.getElementById('TRUC') as HTMLInputElement
    htmlToImage.toPng(node)
    .then( (dataUrl) => {
    const img = new Image();
    img.src = dataUrl;
    const pdf = new jsPDF('p', 'mm', 'a4');
    pdf.setLineWidth(1);
    pdf.addImage(img, 'JPEG', 0, 0, 215, 300);
    pdf.save(filename);
  })
  .catch((error) => {
  console.error('oops, something went wrong!', error);
  });
}


}
