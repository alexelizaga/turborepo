import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

interface Data {
  id: string; // use for anchor link scroll
  icon: string;
  title: string;
  md: string;
}

@Component({
  selector: 'my-terms-privacy',
  templateUrl: './terms-privacy.component.html',
  styleUrls: ['./terms-privacy.component.scss']
})
export class TermsPrivacyComponent  implements OnInit {
  
  // when user navigates to: /terms#cookies_policy
  // expanded will get the anchor link cookies_policy and expand the panel
  expanded = '';
  
  private mdFolder = 'assets/md/';
  
  sections: Data[] = [
    {
      id: 'cookies_policy',
      icon: 'privacy_tip',
      title: 'Política de Cookies',
      md: `${this.mdFolder}/cookies_policy.md`
    },
    {
      id: 'privacy_policy',
      icon: 'security',
      title: 'Política de privacidad', 
      md: `${this.mdFolder}/privacy_policy.md`,
    },
    {
      id: 'legal_warning',
      icon: 'gavel',
      title: 'Aviso legal',
      md: `${this.mdFolder}/legal_warning.md`
    },
    {
      
      id: 'user_data_deletion',
      icon: 'delete',
      title: 'Eliminación de datos de usuario', 
      md: `${this.mdFolder}/user_data_deletion.md`,
    }
  ];

  constructor(public activatedRoute: ActivatedRoute) {}
  
  ngOnInit(): void {  
    this.activatedRoute.fragment.subscribe(fragment => { this.expanded = fragment; });
  }

}
