import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../core/data-service/data-service.service';
import {HttpService as pdbRequester} from '../../core/http-pdb/http-pdb-requester.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})

export class FormComponent implements OnInit {
    private pdbFile: string;
    constructor(private _pdbRequester: pdbRequester, private _router: Router, public dataService: DataService) {}
    ngOnInit(){
      document.getElementById("principalHeader").focus();
    }
  requestProtein() {
      this._pdbRequester.requestTags(this.pdbFile).subscribe(
        (result) => {
          this.dataService.setProtein(result);
          this._router.navigate(['/proteinView']);
        
        },
        (error: HttpErrorResponse) => {
          const errEl = document.getElementById('messageError');
          errEl.style.visibility = 'visible';
          errEl.innerHTML = 'Um erro aconteceu. Verifique se o nome do identificador' +
                            ' da proteína está correto e/ou se você possui internet. Informações do erro:'
                            + error.message;
          errEl.focus();
        }
      );
  }
  backButtonVerify(e){
      if(e.keyCode == 9){
        if(!e.shiftKey){
        e.preventDefault();
        document.getElementById('principalHeader').focus();
        }
        }
    }
  }
