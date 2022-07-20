import { Component, OnInit } from '@angular/core';
import { bindCallback } from 'rxjs';
import { LocalStorageService } from './services/local-storage.service';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class appComponent implements OnInit {

  storageName: any;
  storageObject: any;
  obj: any;
  elt:any;
  imagescr: any;

 ngOnInit(): void {
   this.display();

   this.imagescr = "assets/images/mypic.jpg";
 }

  display()
  {
    this.storageName = localStorage.getItem('cv-data');
    this.storageObject = JSON.parse(this.storageName);
  }


}





