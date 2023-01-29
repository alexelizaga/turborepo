import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'my-unverified',
  templateUrl: './unverified.component.html',
  styleUrls: ['./unverified.component.scss']
})
export class UnverifiedComponent implements OnInit {

  constructor(public authService: AuthService) { }

  ngOnInit(): void {
  }

}
