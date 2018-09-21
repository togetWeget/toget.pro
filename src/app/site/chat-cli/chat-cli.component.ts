import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import {ChatLiasonService} from '../../core/services/chat-liason/chat-liason.service';

@Component({
  selector: 'app-chat-cli',
  templateUrl: './chat-cli.component.html',
  styleUrls: ['./chat-cli.component.scss']
})

export class ChatCliComponent implements OnInit {
	public chatactive : boolean;
	public memebreall : any = [];
  constructor(public chatact: ChatLiasonService) { }

  ngOnInit() {
  this.memebrealls();
	   if( this.chatact.checkchange){
			this.chatact.checkchange = true;
	   }else{
			this.chatact.checkchange = false;
	   }
	   
	   console.log('val : ' + this.chatact.checkchange);
  }
  
  change(){
		  if( this.chatact.checkchange == true){
			  
				this.chatact.checkchange = false;
		  }else{
				this.chatact.checkchange = true;
		  }
		  
		  console.log('val : ' + this.chatact.checkchange);
	  }
	ifactivechat(): boolean{
			let token = localStorage.getItem('togetToken');
			let tokenLog = localStorage.getItem('log');
			let tokenfirebase = localStorage.getItem('firebase:host:toget-2b431.firebaseio.com');
			
			if(token && tokenLog && tokenfirebase){
					return true;
				}else{
					return false;
				}
	}
	
	activatechat(){
	const h = $("#qnimate").is(":visible");
	if(h == false){
		this.chatact.chatactivate = true;	
		let setinterv = setInterval(()=>{
			if(this.chatact.chatactivate == false){
				this.chatact.chatactivate = true;
				}else{
				clearInterval(setinterv);
				}
			},700);
		if(this.chatact.chatactivate == true){
				$("#qnimate").animate({width: 'toggle'});
			}
			
	}
	}
	
	desactivatechat(){
	
	const h = $("#qnimate").is(":visible");
	
		if(h == true){
			this.chatact.chatactivate = false;
			let setinterv = setInterval(()=>{
				if(this.chatact.chatactivate == true){
					this.chatact.chatactivate = false;
					}else{
					clearInterval(setinterv);
					}
				},500);
				if(this.chatact.chatactivate == false){
						$("#qnimate").animate({width: 'toggle'});
					}
		}
	}
	
	
	search(){
		$(".search").slideToggle();
		}
	
	memebrealls(){
	let u = this;
		let mem = this.chatact.getinfoMembre().done(function(data) {
			u.memebreall = data.body;
			console.log(data);
		  })
		  .fail(function() {
			console.log( "error" );
		  })
		  .always(function() {
			console.log( "complete" );
		  });
		
		}
}
