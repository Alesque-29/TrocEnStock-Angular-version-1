import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-compte-modification-effectuee',
  templateUrl: './compte-modification-effectuee.component.html',
  styleUrls: ['./compte-modification-effectuee.component.scss']
})
export class CompteModificationEffectueeComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
    setTimeout(
      () => {
        this.router.navigate(['']);
      }, 5000
    );
  }

}
