import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { HighlightModule } from 'ngx-highlightjs';

@Component({
    selector: 'app-code',
    template: `
      <pre>
        <code [highlight]="code" [lineNumbers]="lineNumbers" [languages]="languages"></code>
      </pre>
  `,
    styleUrls: ['./code.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [HighlightModule]
})
export class CodeComponent {
  @Input() code!: string;
  @Input() languages!: string[];
  @Input() lineNumbers!: boolean;
}
