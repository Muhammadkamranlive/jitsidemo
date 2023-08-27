import { Component, OnInit, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DOCUMENT } from '@angular/common';

import { ZoomMtg } from '@zoomus/websdk';

ZoomMtg.setZoomJSLib('https://source.zoom.us/2.15.2/lib', '/av');

ZoomMtg.preLoadWasm();
ZoomMtg.prepareWebSDK();
// loads language files, also passes any error messages to the ui
ZoomMtg.i18n.load('en-US');
ZoomMtg.i18n.reload('en-US');

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  authEndpoint = ''
  sdkKey = 'dqHfBDRdSleDOtjebE9hFQ'
  meetingNumber = '89194215156'
  passWord = 'tqSx12'
  role = 1
  userName = 'Muhammad 2110979'
  userEmail = 'muhammadkamranntu@gmail.com'
  registrantToken = ''
  zakToken = ''
  leaveUrl = 'http://localhost:50680'

  constructor(public httpClient: HttpClient, @Inject(DOCUMENT) document) {

  }

  ngOnInit() {

  }

  getSignature() {
    this.startMeeting("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJNdWhhbW1hZDFAZ21haWwuY29tIiwianRpIjoiMzgyZDJiYTEtNGNkZS00N2JjLTkwYjQtYzFiOThmNTA1OTlhIiwiZW1haWwiOiJNdWhhbW1hZDFAZ21haWwuY29tIiwidWlkIjoiZDJhOTAxM2EtMjc0MC00OTA3LThkZGYtNTJiYzAyZDdhZjQ1IiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiU3R1ZGVudCIsImV4cCI6MTY5MzEzODQ4MiwiaXNzIjoicHJvZWpjdGFwaSIsImF1ZCI6InByb2VqY3RhcGljbGllbnQifQ.8PbFZwq0ubBXNnSQTyhakW7G7lh0PZgKiiVv7NzFoeI")
    // this.httpClient.post(this.authEndpoint, {
	  //   meetingNumber: this.meetingNumber,
	  //   role: this.role
    // }).toPromise().then((data: any) => {
    //   if(data.signature) {
    //     console.log(data.signature)
    //     this.startMeeting(data.signature)
    //   } else {
    //     console.log(data)
    //   }
    // }).catch((error) => {
    //   console.log(error)
    // })
  }

  startMeeting(signature) {

    document.getElementById('zmmtg-root').style.display = 'block'

    ZoomMtg.init({
      leaveUrl: this.leaveUrl,
      success: (success) => {
        console.log(success)
        ZoomMtg.join({
          signature: signature,
          sdkKey: this.sdkKey,
          meetingNumber: this.meetingNumber,
          passWord: this.passWord,
          userName: this.userName,
          userEmail: this.userEmail,
          tk: this.registrantToken,
          zak: this.zakToken,
          success: (success) => {
            console.log(success)
          },
          error: (error) => {
            console.log(error)
          }
        })
      },
      error: (error) => {
        console.log(error)
      }
    })
  }
}
