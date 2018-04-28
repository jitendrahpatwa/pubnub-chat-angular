import { Component } from '@angular/core';
import { PubNubAngular } from 'pubnub-angular2';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  userId: string = "test-channel";
  newMessage: string;
  channelName: string;
  status = {};
  occupants = [];
  messages: any[];
  pubnub: PubNubAngular;
  constructor(pubnub: PubNubAngular) {
    this.channelName = 'SecretChat';

    pubnub.init({
      publishKey: 'pub-c-df5e8c32-64f3-4242-8116-704ff14549b8',
      subscribeKey: 'sub-c-7395a458-1791-11e6-b700-0619f8945a4f',
      uuid: this.userId,
      triggerEvent: true
    });

    pubnub.subscribe({ channels: [this.channelName], triggerEvents: true });

    pubnub.getStatus(this.channelName, (status) => {
	 // console.log(status);
      this.status = status;
    });

    this.messages = pubnub.getMessage(this.channelName);

    this.pubnub = pubnub;
  }

  publish(){
    this.pubnub.publish({ message: this.newMessage, channel: this.channelName }, () => {
      this.newMessage = '';
    });
  }
}
