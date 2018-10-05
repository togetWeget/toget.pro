import { Component, OnInit, ViewChild } from '@angular/core';
import { AdminTopZone } from '../../../shared/views_models/admin-top-zone';
import { Navs } from '../../../shared/views_models/navs';
import { AdminCover } from '../../../shared/views_models/admin-cover';
import { Detailblock } from '../../../shared/models/detailblock';
import { Resultat } from '../../../shared/models/resultat';
import { Personne } from '../../../shared/models/personne/membres/personne';
import { Membre } from '../../../shared/models/personne/membres/membre';
import { AbonnesService } from '../../../core/services/abonnes/abonnes.service';
import {MembreService} from '../../../core/services/personne/membre/membre.service';
import { CoverSelectComponent } from '../cover-select/cover-select.component';
import { CoverProfilComponent } from '../../comp/cover-profil/cover-profil.component';
import { SaveFilesComponent } from '../../../core/comp/save-files/save-files.component';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';  
import { Observable, throwError, interval,
Subject, BehaviorSubject } from 'rxjs';
import { catchError, retry, tap, map,
debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-layout-compte',
  templateUrl: './layout-compte.component.html',
  styleUrls: ['./layout-compte.component.scss']
})
export class LayoutCompteComponent implements OnInit {
top_zone: AdminTopZone = null;
  detailblock: Detailblock;
  coverModel: AdminCover;
  membre: Membre;
  membre$ : Observable<Resultat<Membre>>;
  membreSubject$ = new BehaviorSubject<string>('');
  @ViewChild(CoverProfilComponent) cover: CoverProfilComponent;

  constructor(private abonneService: AbonnesService,
    private membreService: MembreService,public dialog: MatDialog) {
    // this.membre$ = this.membreService.getMembreByLogin(localStorage.getItem('log'));
    // this.membre$ = this.membreSubject$
    //   .debounceTime(500)
    //   .distinctUntilChanged()
    //   .switchMap(login => login ? this.membreService.getMembreByLogin(login) :  
    //     this.membreService.getMembreByLogin(localStorage.getItem('log')));
        
    this.membre$ = this.membreSubject$.pipe(
      debounceTime(500),
      // distinctUntilChanged(),
      switchMap(login => login ? this.membreService.getMembreByLogin(login) :  
        this.membreService.getMembreByLogin(localStorage.getItem('log')))
      );
    this.search(localStorage.getItem('log'));
    // console.log(this.membre$);
    this.top_zone = new AdminTopZone (
      '', 
      '',
      [
        new Navs('Accueil', '/admin'),
      ],
      new Navs ('Profil', ''),
      'home',
    );
    this.coverModel = new AdminCover();
  }

  handlImageChange(event){
    this.search(event);
  }

  ngOnInit() {    
    this.getDetailBlock();
  }

  search(login: string){
    this.membreSubject$.next(login);
  }

  getDetailBlock() {
    this.membre$.subscribe(
      (data: any)=> {
            this.membre = data.body;     
            this.top_zone.titre = this.membre.nomComplet;
            this.coverModel.titre = '';
            this.coverModel.coverPath = '/assets/profile-cover.jpg';
            this.coverModel.profilPath = this.membre.pathPhoto;
            this.coverModel.vues = '-1';
            this.coverModel.voirProfilLink = null;
            this.coverModel.modifLink = null;
            this.coverModel.vues = this.membre.nombreVue;
            // console.log(this.coverModel.profilPath);
            // this.cover.img_profil.nativeElement.style.backgroundImage = this.coverModel.profilPath;
            // this.cover.load
            }
    );
  }

  openModif() {
    const dialogRef = this.dialog.open(SaveFilesComponent, {
      maxWidth: '768px',
      maxHeight: '500px',
      data: {name: 'image_photo', multiple: false, filename: this.membre.login, url: `http://wegetback:8080/photoCouvertureMembre`}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.search(Date.now()+'');
      this.search(localStorage.getItem('log'));
    });
  }

  saveProfil() {
    const dialogRef = this.dialog.open(SaveFilesComponent, {
      maxWidth: '768px',
      maxHeight: '500px',
      data: {name: 'image_photo', multiple: false, filename: this.membre.login, url: `http://wegetback:8080/photoMembre`}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.search(Date.now()+'');
      this.search(localStorage.getItem('log'));
    });
  }

  handleClick(event) {
    switch (event) {
      case "img_cover":
        this.openModif();
        break;
      case "img_profil":
        this.saveProfil();
        break;
      
      default:
        // code...
        break;
    }
  }
}
