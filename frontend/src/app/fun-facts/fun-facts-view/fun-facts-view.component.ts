import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FunFactsService } from '../fun-facts.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-fun-facts-view',
  standalone: true,
  imports: [
    CommonModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './fun-facts-view.component.html',
  styleUrl: './fun-facts-view.component.css'
})
export class FunFactsViewComponent {

  constructor(private funFactsService: FunFactsService) {}
  
  isDogActivated: boolean = false;
  isDogLoading: boolean = false;
  dogFunFact: string = '';
  isCatActivated: boolean = false;
  isCatLoading: boolean = false;
  catFunFact: string = '';

  handleDogClick() {
    if(!this.isDogActivated)
      this.loadNextDogFact();
  }

  loadNextDogFact() {
    this.isDogLoading = true;

    this.funFactsService.getDogFact().subscribe(
      (funFact: string) => {
        this.dogFunFact = funFact;
        if(this.dogFunFact.length > 500) {
          console.log("Text too long to fit on the card, getting a new fun fact...")
          this.loadNextDogFact();
        } else {
          this.isDogActivated = true;
          this.isDogLoading = false;
        }
      }
    )
  }

  handleCatClick() {
    if(!this.isCatActivated) 
      this.loadNextCatFact();
  }

  loadNextCatFact() {
    this.isCatLoading = true;

    this.funFactsService.getCatFact().subscribe(
      (funFact: string) => {
        this.catFunFact = funFact;
        if(this.catFunFact.length > 500) {
          console.log("Text too long to fit on the card, getting a new fun fact...")
          this.loadNextCatFact();
        } else {
          this.isCatActivated = true;
          this.isCatLoading = false;
        }
      }
    )
  }


  loadNextDogFunFact() {

  }
}
