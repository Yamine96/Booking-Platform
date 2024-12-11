import * as $ from 'jquery';
import { Component, OnInit } from '@angular/core';
import { StorageService } from './auth/services/storage/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'hebergement-front';
  constructor(private router:Router) { }

  ngOnInit(): void {
    // Now you can use jQuery
    $(document).ready(function() {
      console.log('jQuery is ready!');
      $('#yourElement').text('Hello, jQuery!');
    });
  }

}
