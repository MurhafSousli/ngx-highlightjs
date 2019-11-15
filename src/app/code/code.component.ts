import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'app-code',
  template: `
<!--    <ng-scrollbar track="horizontal" appearance="standard" pointerEventsMethod="scrollbar">-->
      <pre>
        <code [highlight]="code" [lineNumbers]="lineNumbers" [languages]="languages"></code>
      </pre>
<!--    </ng-scrollbar>-->
  `,
  styleUrls: ['./code.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CodeComponent {
  @Input() code!: string;
  @Input() languages!: string[];
  @Input() lineNumbers!: boolean;
}
