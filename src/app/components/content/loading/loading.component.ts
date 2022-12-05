import {Component, OnInit} from '@angular/core';
import {ThemePalette} from "@angular/material/core";

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnInit {
  color: ThemePalette = 'primary';

  constructor() {
  }

  ngOnInit(): void {
  }

}
