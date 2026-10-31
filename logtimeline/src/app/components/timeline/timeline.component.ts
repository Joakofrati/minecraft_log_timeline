import { Component, Input } from '@angular/core';
import { TimelineEvent } from '../../models/event.model';
import { TimelineEventComponent } from '../timeline-event/timeline-event.component';

@Component({
  selector: 'app-timeline',
  standalone: true,
  imports: [TimelineEventComponent],
  template: `
    <section class="panel">
      <h2>Timeline global <small>{{ events.length }} eventos</small></h2>
      @if (events.length === 0) {
        <p class="muted">{{ emptyMessage }}</p>
      } @else {
        @for (event of events; track event.id) { <app-timeline-event [event]="event" /> }
      }
    </section>
  `,
  styles: [`h2 { display: flex; justify-content: space-between; } h2 small { color: #64748b; font-size: .9rem; font-weight: 500; }`],
})
export class TimelineComponent {
  @Input() events: TimelineEvent[] = [];
  @Input() emptyMessage = 'No se detectaron eventos con los filtros actuales.';
}
