import { Component,ElementRef, OnInit,ViewChild } from '@angular/core';
import { AppComponent } from '../app.component';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import jsPDF from 'jspdf';
import { Router } from '@angular/router';
import { Template1Component } from './template/template1/template1.component';
import { Template2Component } from './template/template2/template2.component';

@Component({
  selector: 'app-all-cv',
  templateUrl: './all-cv.component.html',
  styleUrls: ['./all-cv.component.scss']
})
export class AllCvComponent implements OnInit {

  t!:any;
  @ViewChild('content', { static: false }) el!: ElementRef;
  constructor(public service :AppComponent,public afs :AngularFirestore,public router: Router) { }

  ngOnInit(): void {
  }

  changefont(font:string)
  {
    let temp1 = new Template1Component(this.afs)
     temp1.changefont(font)

     let temp2 = new Template2Component(this.afs)
     temp2.changefont(font)

  }

  changetheme(theme:string)
  {
    let temp1 = new Template1Component(this.afs)
    temp1.changetheme(theme)
  }
}
