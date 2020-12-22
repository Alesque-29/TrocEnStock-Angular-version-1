import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-compte-suppression-effectuee',
  templateUrl: './compte-suppression-effectuee.component.html',
  styleUrls: ['./compte-suppression-effectuee.component.scss']
})
export class CompteSuppressionEffectueeComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
    setTimeout(
      () => {
        this.router.navigate(['']);
      }, 5000
    );
  }

}
