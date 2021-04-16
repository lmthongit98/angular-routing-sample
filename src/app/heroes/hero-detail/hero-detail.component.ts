import { Hero } from './../hero';
import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { HeroService } from '../hero.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {
  hero$!: Observable<Hero | undefined>;


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: HeroService
  ) {}


  ngOnInit() {

    this.hero$ = this.route.paramMap.pipe(
      switchMap((params) =>{
        console.log(params)
        return this.service.getHero(params.get('id')!);
      })
    );

    // this.route.paramMap.subscribe((params: ParamMap) => {
    //   this.hero$  = this.service.getHero(params.get('id')!)
    // })

    // this.hero$ = this.service.getHero(this.route.snapshot.params['id']);

  }

  gotoHeroes(hero: Hero) {
    const heroId = hero ? hero.id : null;
    // Pass along the hero id if available
    // so that the HeroList component can select that hero.
    // Include a junk 'foo' property for fun.
    this.router.navigate(['/superheroes', { id: heroId, foo: 'foo' }]);
  }

  NextorPre(isNext:Boolean){
    let lastId = 0;
    let firstId = 0;
    this.service.getHeroes().subscribe(heros => {
      lastId = heros[heros.length-1].id;
      firstId = heros[0].id;
    })
    let currentId = +this.route.snapshot.params['id'];
    if(isNext){
      if(currentId< lastId){
        this.router.navigate(['/hero', currentId+1])
      }else{
        alert("last");
      }
    }else{
      if(currentId >  firstId){
        this.router.navigate(['/hero', currentId - 1])
      }else{
        alert("last");
      }
    }
  }


}
