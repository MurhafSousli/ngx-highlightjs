import { Component, inject, input, InputSignal, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { HighlightJS } from 'ngx-highlightjs';
import { Gist, HighlightPlusModule } from 'ngx-highlightjs/plus';
import { CodeComponent } from '../code/code.component';

@Component({
  selector: 'app-gist',
  templateUrl: './gist.component.html',
  styleUrl: './gist.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    MatIconModule,
    MatCardModule,
    MatTabsModule,
    MatButtonModule,
    MatProgressBarModule,
    HighlightPlusModule,
    CodeComponent
  ]
})
export class GistComponent {
  readonly hljs: HighlightJS = inject(HighlightJS);
  gist: Gist;
  readonly id: InputSignal<string> = input<string>();
}
