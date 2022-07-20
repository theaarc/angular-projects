import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { QRCodeModule } from 'angular2-qrcode';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { AngularFireStorage } from '@angular/fire/compat/storage';
 import * as firebase from 'firebase/app';
 import { getStorage, ref } from "firebase/storage";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  userState: any;
  userinfo: any;
  closeResult!: string;

  private basePath = '/uploads';

  constructor(private modalService: NgbModal,public service :AppComponent,public afs :AngularFirestore) {
    this.userState = JSON.parse(localStorage.getItem('userinfo') || '{}');
  }

  ngOnInit(): void {
  }

  data = [{
    'name': 'John Doe',
    'profile': 'Software Developer',
    'email': 'john@doe.com',
    'hobby': 'coding'
  }]
  dataToString = JSON.stringify(this.data);

  changetoinput()
  {
    const el = document.getElementById('toggle');

    const btn = document.getElementById('input');

    if (el != null && btn != null) {
          el.style.display = 'none';
          btn.style.display = 'block';
    }
  }

  setvalfrominput()
  {
    const input = document.getElementById('nameinput') as HTMLInputElement
    const btn = document.getElementById('input');
    const el = document.getElementById('toggle');

    if(input.value.length == 0)
    {
      if (el != null && btn != null)
      {
        el.style.display = 'block';
        btn.style.display = 'none'
      }
    }
    else{
      var text = input.value;

      if (el != null && btn != null) {
          btn.style.display = 'none';
          el.style.display = 'block';
          el.innerHTML = text;

          this.userState.nom = text;
          localStorage.setItem('userinfo', JSON.stringify(this.userState));
          this.afs.collection('nusers').doc(this.userState.id).collection('informations').doc(this.userState.id).update({ nom: text});
       }
    }
  }

  savephot()
  {
    const file = document.getElementById('file') as HTMLInputElement
    alert(file.value)
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
}
