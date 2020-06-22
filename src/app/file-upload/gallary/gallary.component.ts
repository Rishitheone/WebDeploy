import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ImageUploadService } from 'src/app/shared/image-upload.service';

@Component({
  selector: 'app-gallary',
  templateUrl: './gallary.component.html',
  styleUrls: ['./gallary.component.scss']
})
export class GallaryComponent implements OnInit {
  images:any=[]
  videos:any=[]
  gifs:any=[]
  ar:any=[]
  imageUrl:string = "";
  res:string = "";
  constructor( public dialogRef: MatDialogRef<GallaryComponent>, private imageUpload: ImageUploadService) { }

  ngOnInit() {
    this.imageUpload.getAllImage().subscribe(
      data=>{
        const array1 = data.data;
          var test2: any = [];
          array1.forEach(element => {
             test2.push(element.url);
          });
        this.images=test2;
      },
      err=>console.log(err)
    )
    this.imageUpload.getAllVideo().subscribe(
      data=>{
        const array1 = data.data;
          var test2: any = [];
          array1.forEach(element => {
             test2.push(element.url);
          });
        this.videos=test2;
      },
      err=>console.log(err)
    )
    this.imageUpload.getAllGifs().subscribe(
      data=>{
        const array1 = data.data;
          var test2: any = [];
          array1.forEach(element => {
             test2.push(element.url);
          });
        this.gifs=test2;
      },
      err=>console.log(err)
    )
    this.imageUpload.getAllar().subscribe(
      data=>{
        const array1 = data.data;
          var test2: any = [];
          array1.forEach(element => {
             test2.push(element.url);
          });
        this.ar=test2;
      },
      err=>console.log(err)
    )
  }


  onNoClick(): void {
    this.dialogRef.close();
  }
  getImg(item){
    console.log(item)
    this.imageUrl = item;
    this.res = item;
  }
  onClear(){
    this.imageUrl = "";
  }
  
}
