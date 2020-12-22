import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-vente-suppression-effectuee',
  templateUrl: './vente-suppression-effectuee.component.html',
  styleUrls: ['./vente-suppression-effectuee.component.scss']
})
export class VenteSuppressionEffectueeComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
    setTimeout(
      () => {
        this.router.navigate(['']);
      }, 5000
    );
  }

}
