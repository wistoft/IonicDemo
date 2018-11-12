import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';

import { File } from '@ionic-native/file';

type FolderDefinition =   { name: string
                          , baseUrl: string
                          , folder: string
                          };

@Component({
  selector: 'page-file',
  templateUrl: 'file.html',
})
export class FilePage {

  
   //view

    showDetails = false;
    viewFiles :string[] = [];
    viewDirPath = "";
    viewDirURL = "";
    viewDirInternalURL = "";

  //more
    
    selectedFolder = 0;	//default selected.



    folders: FolderDefinition[];

    currentFolder:  FolderDefinition;


  constructor(public platform: Platform, private file: File) {
    
    this.platform.ready().then(() => {

      //folders to show
        
        this.folders =	[ {name:"App storage dir"             , baseUrl: this.file.applicationStorageDirectory      , folder: ""}
                        , {name:"App dir"                     , baseUrl: this.file.applicationDirectory             , folder: ""}
                        , {name:"App dir cdvfile://"          , baseUrl: "cdvfile://localhost/assets/"              , folder: ""}
                        , {name:"www/assets"                  , baseUrl: this.file.applicationDirectory             , folder: "www/assets/"}
                        , {name:"www/assets cdvfile://"       , baseUrl: "cdvfile://localhost/assets/"              , folder: "www/assets/"}
                        , {name:"Internal data"               , baseUrl: this.file.dataDirectory                    , folder: ""}
                        , {name:"Internal data cdvfile://"    , baseUrl: "cdvfile://localhost/files/"               , folder: ""}
                        , {name:"Internal cache"              , baseUrl: this.file.cacheDirectory                   , folder: ""}
                        , {name:"External data"               , baseUrl: this.file.externalDataDirectory            , folder: ""}            //android only
                        , {name:"Temp dir"                    , baseUrl: this.file.tempDirectory                    , folder: ""}            //ios only
                        ]
        

    });

  }

  showFolder(){
    
    //folder to show
    
      this.currentFolder = this.folders[this.selectedFolder];
    
    //clear
    
      this.viewFiles = [];
      this.viewDirPath = "";
      this.viewDirURL = "";
      this.viewDirInternalURL = "";

    //fetch them
      
      this.file.listDir(this.currentFolder.baseUrl, this.currentFolder.folder)
        .then(list => {
          
          for (const file of list){
            this.viewFiles.push(file.name);
          }

        })
        .catch(error => {
          console.log(JSON.stringify(error));
        })
        ;

    //show url transforms

        this.file.resolveDirectoryUrl(this.currentFolder.baseUrl + this.currentFolder.folder).then(dirEntry => {

          this.viewDirPath = dirEntry.fullPath;
          this.viewDirURL = dirEntry.toURL();
          this.viewDirInternalURL = dirEntry.toInternalURL();

        })
        .catch((error) => {
            
          console.log("Error resolving: ", error);
      
        })
        ;
  }

}
