import { Component, OnInit } from '@angular/core';

import { UploadEvent, UploadFile, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-file-reader',
  templateUrl: './file-reader.component.html',
  styleUrls: ['./file-reader.component.css']
})
export class FileReaderComponent implements OnInit {
  public files: UploadFile[] = [];
  public imgSRC: any;
  public urls = [];
  public guardada = false;
  public nophoto = false;
  public lenght: number;

  constructor(private http: HttpClient) { }

  ngOnInit() {
  }

  public dropped(event: UploadEvent) {
    this.files = event.files;
    this.urls = [];
    this.guardada = false;
    this.nophoto = false;
    // this.lenght = 0;
    for (const droppedFile of event.files) {
      // Is it a file?
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        const reader = new FileReader();
        fileEntry.file((file: File) => {
          // Here you can access the real file
          console.log(droppedFile.relativePath);
          console.log(file);
          if (file.type !== 'image/jpg' && file.type !== 'image/jpeg' && file.type !== 'image/png') {
            this.nophoto = true;
          } else {
            reader.readAsDataURL(file);
            reader.onload = () => {
              this.imgSRC = reader.result;
              this.urls.push(this.imgSRC);
              const formData = new FormData();
              // formData.append('name', droppedFile.relativePath);
              formData.append('logo', file, droppedFile.relativePath);
              this.http.post('http://localhost/backend/imagen', formData).subscribe(data => {
                console.log(data);
                this.guardada = true;
              });
            };
          }

        });
      } else {
        // It was a directory (empty directories are added, otherwise only files)
        const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
        console.log(droppedFile.relativePath, fileEntry);
      }
    }
  }

  public fileOver(event) {
    console.log(event);
  }

  public fileLeave(event) {
    console.log(event);
  }
}
