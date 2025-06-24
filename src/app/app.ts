import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Menubar } from "./Components/menubar/menubar";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Menubar],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'Freelancing Project';
}
