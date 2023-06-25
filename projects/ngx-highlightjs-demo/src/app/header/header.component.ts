import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FlexModule } from '@angular/flex-layout/flex';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [FlexModule]
})
export class HeaderComponent {
}
