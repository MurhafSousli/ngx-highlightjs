import { Component, input, InputSignal, ChangeDetectionStrategy } from '@angular/core';
import { HighlightModule } from 'ngx-highlightjs';
import { HighlightLineNumbers } from 'ngx-highlightjs/line-numbers';
import { NgScrollbar } from 'ngx-scrollbar';

@Component({
  selector: 'app-code',
  imports: [HighlightModule, HighlightLineNumbers, NgScrollbar],
  template: `
    <ng-scrollbar appearance="compact">
      <pre>
        <code [highlightAuto]="code()" lineNumbers></code>
      </pre>
    </ng-scrollbar>
  `,
  styleUrl: './code.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CodeComponent {
  readonly code: InputSignal<string> = input<string>();
}
