import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Home } from '@mono/frontend/tissi';

@Component({
  imports: [RouterModule, Home],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected title = 'recipes';
}
