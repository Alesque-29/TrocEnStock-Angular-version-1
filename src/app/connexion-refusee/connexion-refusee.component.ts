import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-connexion-refusee',
  templateUrl: './connexion-refusee.component.html',
  styleUrls: ['./connexion-refusee.component.scss']
})
export class ConnexionRefuseeComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
    setTimeout(
      () => {
        this.router.navigate(['']);
      }, 5000
    );
  }

}
