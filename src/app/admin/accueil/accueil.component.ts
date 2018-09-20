import { Component, OnInit } from '@angular/core';
import { AdminTopZone } from '../../shared/views_models/admin-top-zone';
import { Navs } from '../../shared/views_models/navs';
import { WidgetInfo } from '../../shared/views_models/widget-info';
import { Observable, Subject } from 'rxjs';
import { switchMap, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Messagerie } from '../../shared/models/messagerie/messagerie';
import { MessagerieService } from '../../core/services/messagerie/messagerie.service';
import {AbonnesService} from '../../core/services/abonnes/abonnes.service';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.scss']
})
export class AccueilComponent implements OnInit {
  top_zone: AdminTopZone = null;
  widget1: WidgetInfo = null;
  widget2: WidgetInfo = null;
  widget3: WidgetInfo = null;
  widget4: WidgetInfo = null;
  nonLu$: Observable<number>;
  nbVues$: Observable<number>;
  nbVueSubject$ = new Subject<number>(0);
  messages: Messagerie[] = [];
  dblk: Detailblock;
  idPersonne:number;
  nonLus: number = 0;
  nbVues: number = 0;

  constructor(private messagerieService:MessagerieService,
    private abonneService: AbonnesService) {
    this.nonLu$ = this.messagerieService.nonLusSubject$;
    this.nbVues$ = this.nbVueSubject$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(d => new Observable((observer) => {
        observer.next(d)
      }))
      );
    this.nonLu$.subscribe();
    this.nbVues$.subscribe();
  	this.top_zone = new AdminTopZone (
  		'Tableau de bord', 
  		'Tableau de bord',
  		[
  			new Navs('Accueil', '/admin'),
  		],
  		new Navs ('Tableau de bord', ''),
  		'home',
  	);

  	this.widget1 = new WidgetInfo (
  		'Nombre de visiteurs',
  		5,
  		'user',
  		'blue',
  		''
  	);
  	this.widget2 = new WidgetInfo (
  		'Nombre de messages reçus',
  		2,
  		'envelope',
  		'red',
  		''
  	);

    this.abonneService.getAbonnesByLog(localStorage.getItem('log'))
      .subscribe((res:any)=> {
          this.dblk = res.body;    
          this.nbVues = this.dblk[0].nombreVue;
          this.setNbVues(this.nbVues);
        this.idPersonne=this.dblk[0].membre.id;
        this.fetchBlocks();
      });
      
  }

  setNbVues(nb: number){
    this.nbVueSubject$.next(nb);
  }

  fetchBlocks() {
     this.messagerieService.getAllMessagesByAbonneId(+this.idPersonne)
    .subscribe(res => {
      this.messages = res.body;
    this.getNonLus(this.messages);
    });
  }

  getNonLus(msgs: Messagerie[]){
    let nonLus = 0;
    for(let m of msgs){
      if(m.message.statut){
        nonLus++;
      }
    }
    this.nonLus = nonLus;
    this.messagerieService.setNonLu(this.nonLus);
  }

  ngOnInit() {
  }

}
