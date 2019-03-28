import {
   Component,
   OnInit,
   AfterViewInit
} from '@angular/core';
import {
   DataParserService
} from '../../core/data-parser/data-parser.service';
import {
   Router
} from '@angular/router';
import * as Highcharts from 'highcharts';
import highcharts3D from 'highcharts/highcharts-3d.src';
import {
   TalkerService
} from '../../core/talker/talker.service';
import {
   Aminoacid
} from '../../interfaces/aminoacid';
highcharts3D(Highcharts);
@Component({
   selector: 'app-protein-viewer',
   styleUrls: ["./protein.css"],
   template: ` 
           <br><a tabindex = '0'class="btn bg-primary text-white" (click)="enterNavigator()" (keydown) = "keyVerifier($event)">
               Iniciar navegação
            </a>
               <highcharts-chart
               [Highcharts] = "highcharts" 
               [options] = "chartOptions" 
               style = "width: 100%; height: 120vh; display: block;">
               </highcharts-chart>
            `
})

export class ProteinViewerComponent implements OnInit, AfterViewInit {
   constructor(private _parserService: DataParserService, private _router: Router) {}
   private aminoData = this._parserService.parseAminoData();
   private firstTab: number;
   highcharts = Highcharts;
   chartOptions = {
      chart: {
         type: 'scatter',
         marginBottom: 100,
         marginRight: 50,
         options3d: {
            enabled: true,
            alpha: 10,
            beta: 30,
            depth: 250,
            viewDistance: 5,
            frame: {
               bottom: {
                  size: 1,
                  color: 'rgba(0, 0, 0, 0.02)'
               },
               back: {
                  size: 1,
                  color: 'rgba(0, 0, 0, 0.04)'
               },
               side: {
                  size: 1,
                  color: 'rgba(0, 0, 0, 0.06)'
               }
            }
         }
      },
      title: {
         text: '3D Scatter Plot'
      },
      xAxis: {
         min: 0,
         max: 100
      },
      yAxis: {
         min: 0,
         max: 100
      },
      zAxis: {
         min: 0,
         ax: 100
      },
      series: [{
         data: this.getData()
      }]
   };
   ngOnInit() {
      if (this.aminoData === undefined)
         this._router.navigate(['/menu']);
   }
   ngAfterViewInit() {
      let plotPoints = document.getElementsByClassName('highcharts-series-group')[0].children[1].children;
      const objectsPoints = this.highcharts.charts[0].series[0].points;
      for (let x = 0; x < plotPoints.length; x++) {
         plotPoints[x].addEventListener("keydown", (e) => {
            let auxIndex = Number(plotPoints[x].getAttribute("tabindex")) - 1;
            this.event(e, objectsPoints[auxIndex]);
         });
      }
   }
   getData() {
      return this.aminoData;
   }
   enterNavigator() {
      let aux = document.getElementsByClassName('highcharts-series-group')[0].children[1].children;
      if (this.firstTab !== undefined)
         (aux[this.firstTab] as HTMLElement).focus();
      for (let index = 0; index != aux.length; index++)
         if (aux[index].getAttribute("tabindex") == '1') {
            (aux[index] as HTMLElement).focus();
            this.firstTab = index;
            break;
         }
   }
   keyVerifier(event: KeyboardEvent) {
      if (event.keyCode == 13)
         this.enterNavigator();
   }
   event(event, data) {
      if (event.keyCode === 32 || event.keyCode === 13) // Spacekey
         this.talkGenInfo(data);
      if(event.keyCode == 9)
         this.talkTransition(event,data);
   }
   talkGenInfo(data: Aminoacid) {
      let message = 'Posição atual: ' + this.getAminoName(data.name);
      if (data._isFirst) {
         message += '. Primeiro resíduo';
      } else if (data._isLast) {
         message += '. Último resíduo';
      }
      if (data._isFirstHelix) {
         message += '. Início de Hélice';
      } else if (data._isLastHelix) {
         message += '. Fim de Hélice';
      } else if (data._isHelix) {
         message += '. Dentro de Hélice';
      }
      if (data._isFirstSheet) {
         message += '. Início de Fita';
      } else if (data._isLastSheet) {
         message += '. Fim de Fita';
      } else if (data._isSheet) {
         message += '. Dentro de Fita';
      }
      return TalkerService.speak(message);
   }
   talkTransition(key: KeyboardEvent, data: any) {
      let message : string;
      if(key.keyCode == 9){
         if(key.shiftKey)
            message = data['_downSound'];
         else
            message = data['_upSound'];
      }
         return TalkerService.speak(message)
   }
   getAminoName(AminoName) {
      switch (AminoName) {
         case 'PHE':
            return 'Fenilalanina';
         case 'ALA':
            return 'Alanina';
         case 'MET':
            return 'Metionina';
         case 'LYS':
            return 'Lisina';
         case 'GLU':
            return 'Glutamina';
         case 'PRO':
            return 'Prolina';
         case 'SER':
            return 'Serina';
         case 'LEU':
            return 'Leucina';
         case 'ILE':
            return 'Isoleucina';
         case 'THR':
            return 'Treonina';
         case 'CYS':
            return 'Cisteína';
         case 'TYR':
            return 'Tirosina';
         case 'ASN':
            return 'Asparagina';
         case 'GLN':
            return 'Glutamina';
         case 'GLU':
            return 'Ácido Glutâmico';
         case 'ARG':
            return 'Arginina';
         case 'HYS':
            return 'Histidina';
         case 'TRP':
            return 'Triptofano';
         case 'ASP':
            return 'Ácido Aspártico';
         case 'GLY':
            return 'Glicina';
      }
   }
}