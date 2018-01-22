import { Component,OnInit } from '@angular/core';
import { Hero } from './hero';
import { Router } from '@angular/router';
import { HeroService } from './hero.service';

@Component({
  selector: 'my-heroes',
  templateUrl:'./heroes.component.html',
  styleUrls: ['./heroes.component.css'],
})
export class HeroesComponent implements OnInit {
  heroes: Hero[]
  selectedHero: Hero
  constructor(
    private router: Router,
    private heroService: HeroService) {}
  onSelect(hero: Hero): void {
    this.selectedHero = hero;
  }
  getHeroes(): void {// 生命周期内执行方法
    this.heroService.getHeroes().then(heroes => {
      this.heroes = heroes
    });
  }
  ngOnInit(): void {// 生命周期
    this.getHeroes();
  }
  gotoDetail(): void {
    this.router.navigate(['/detail', this.selectedHero.id]);
  }
  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.heroService.create(name)
      .then(hero => {
        console.log(hero)
        this.heroes.push(hero);
        this.selectedHero = null;
      });
  }
  delete(hero: Hero): void {
    this.heroService
      .delete(hero.id)
      .then(() => {
        this.heroes = this.heroes.filter(h => h !== hero);
        if (this.selectedHero === hero) { this.selectedHero = null; }
      });
  }
}
