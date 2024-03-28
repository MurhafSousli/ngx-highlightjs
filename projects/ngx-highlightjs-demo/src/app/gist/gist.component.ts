import { Component, Input, inject, ChangeDetectionStrategy } from '@angular/core';
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
  styleUrls: ['./gist.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
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
  @Input() id: string;
}
