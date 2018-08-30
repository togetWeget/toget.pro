import { Component, OnInit, ViewChild,
	ElementRef, Input } from '@angular/core';
import {FormBuilder, FormGroup, FormControl,
Validators } from '@angular/forms';
import { Detailblock } from '../../../shared/models/detailblock';
import { Resultat } from '../../../shared/models/resultat';
import { Personne } from '../../../shared/models/personne/membres/personne';
import { Membre } from '../../../shared/models/personne/membres/membre';
import { AbonnesService } from '../../../core/services/abonnes/abonnes.service';
import {MembreService} from '../../../core/services/personne/membre/membre.service';
import {OutilsService} from '../../../core/services/outils.service';

@Component({
  selector: 'app-details-compte-admin',
  templateUrl: './details-compte.component.html',
  styleUrls: ['./details-compte.component.scss']
})
export class DetailsCompteComponent implements OnInit {
  @ViewChild('photo') photo: ElementRef;
  membre = new Membre();
  defaultProfil: any = '/assets/placeholder-image.jpg';
  detailsForm: FormGroup;
  detailblock: Detailblock;
  detailblocks: Detailblock[];
  static me: DetailsCompteComponent;

  constructor(private fb: FormBuilder, 
    private membreService: MembreService, 
    public outils: OutilsService) {
    DetailsCompteComponent.me = this;
  }

  ngOnInit() {
    this.photo.nativeElement.style.backgroundImage = 'url(' + this.getProfilSrc() + ')';
    this.photo.nativeElement.style.backgroundSize = 'cover';
    this.photo.nativeElement.style.backgroundPosition = 'center';
    this.initForm();
    this.getDetailBlock();
  }

  getProfilSrc(): any {
    return (this.membre.pathPhoto !== null && 
      this.membre.pathPhoto !== undefined && 
      this.membre.pathPhoto !== '') ? 
    this.membre.pathPhoto : 
    this.defaultProfil;
  }

  initForm() {
    this.detailsForm = this.fb.group({
      id: [{value: this.membre.id}],
      version: [{value: this.membre.version}],
       cni: [{value: this.membre.cni}],
       titre: [{value: this.membre.titre}],
      nom: [{value: this.membre.nom, disabled: false}],
      prenom: [{value: this.membre.prenom, disabled: false}],
       password: [{value: this.membre.password}],
      repassword: [{value: this.membre.repassword}],
      actived: [{value: this.membre.actived}],
      nomComplet: [{value: this.membre.nomComplet}],
       pathPhoto: [{value: this.membre.pathPhoto}],
       nombreVue: [{value: this.membre.nombreVue}],
      groupSanguin: [{value: this.membre.groupSanguin}],
      dateNaissance: [{value: this.membre.dateNaissance}],
      genre: [{value: this.membre.genre}],
      type: [{value: this.membre.type}],
       description: [{value: this.membre.description}]
    });
  }

  getDetailBlock() {
    this.membreService.getMembreByLogin(localStorage.getItem('log'))
    .subscribe((data: any)=> {
      this.membre = data.body;     
      this.initForm();
      this.photo.nativeElement.style.backgroundImage = 'url(' + this.getProfilSrc() + ')';
    });
  }

  updateDetails() {
  console.log(this.detailsForm.value)
    this.membreService.modifierMembre(this.detailsForm.value)
    .subscribe((data: any) => {
      console.log('MODIFIER MEMBRE SUCCESS', data);
    });
  }
}
