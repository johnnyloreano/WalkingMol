import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TalkerService {
  static speak(message:string) : void{
      // Good to go
      const msg = new SpeechSynthesisUtterance(message);
      msg.volume = 0.8;
      msg.pitch = 1.0;
      msg.rate = 1.0;
      msg.voice = speechSynthesis.getVoices()[14]
      msg.lang = "pt-BR";
      speechSynthesis.speak(msg);
      console.log(message);
  }
}