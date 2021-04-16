import { switchMap } from 'rxjs/operators';
import { CrisisService } from './../crisis.service';
import { Crisis } from './../crisis';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-crisis-center-list',
  templateUrl: './crisis-center-list.component.html',
  styleUrls: ['./crisis-center-list.component.css']
})
export class CrisisCenterListComponent implements OnInit {

  crises$!: Observable<Crisis[]>;
  selectedId!: number;

  constructor(
    private service: CrisisService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.crises$ = this.route.paramMap.pipe(
      switchMap(params => {
        this.selectedId = +params.get('id')!;
        return this.service.getCrises();
      })
    );
  }

}
