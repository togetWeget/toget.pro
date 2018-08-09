import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';
import * as $ from 'jquery';


@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss', '../layout/layout.component.scss'],
  animations: [
    trigger('menuShow', [
      state('open', style({
        transform: 'rotateX(0deg)'
      })),
      state('close',   style({
        transform: 'rotateX(90deg)'
      })),
      transition('open => close', animate('100ms ease-in')),
      transition('close => open', animate('100ms ease-out'))
    ])
  ]

})
export class ToolbarComponent implements OnInit {
  @Input() toggle_btn: any;
  modal_toggle = 0;
  menu_state: string;

  constructor(private router: Router, private dialog: MatDialog) { }
  
   ngOnInit() {
    $(document).ready(() => {
      $('.toolbar .toggle button').click(() => {
        $('.toolbar nav').toggleClass('toggle-visibility');
      });
    });
  }

  scrollTo (target) {
    $(document).scrollTop($(target).offset().top);
  }

  isAuthenticated () {
    let token = null;
    token = localStorage.getItem('togetToken');
    return (token === null || token === undefined) ? false : true;
  }

  toggleModal () {
    this.modal_toggle = this.modal_toggle + 1;
  }

  toggleMenu () {
    this.menu_state = (this.menu_state === 'close') ? 'open' : 'close';
  }

  connexion () {
    this.router.navigate(['/admin']);
  }

  gotoAdmin () {
    this.router.navigate(['/admin']);
  }

  inscription () {
    this.router.navigate(['site/register']);
  }

}