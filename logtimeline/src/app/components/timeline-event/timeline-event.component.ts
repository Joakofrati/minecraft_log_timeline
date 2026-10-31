import { Component, Input } from '@angular/core';
import { TimelineEvent } from '../../models/event.model';

@Component({
  selector: 'app-timeline-event',
  standalone: true,
  template: `
    <article class="event">
      <time>{{ event.time }}</time>
      <div>
        <h3>{{ event.type }} <span>{{ event.player }}</span></h3>
        <p class="properties">
          @for (property of propertyEntries; track property[0]) { <b>{{ property[0] }}:</b> {{ property[1] }} }
        </p>
        <p class="source">{{ event.fileName }}</p>
        <code>{{ event.originalLine }}</code>
      </div>
    </article>
  `,
  styles: [`.event { display: grid; grid-template-columns: 5rem 1fr; gap: 1rem; padding: 1rem 0; border-bottom: 1px solid #e2e8f0; } time { color: #2563eb; font-weight: 700; } h3 { margin: 0; text-transform: capitalize; } h3 span { color: #475569; font-size: .9rem; font-weight: 500; } p { margin: .4rem 0; } .properties { color: #334155; } .properties b { margin-left: .5rem; } .properties b:first-child { margin-left: 0; } .source { color: #64748b; font-size: .85rem; } code { display: block; overflow-wrap: anywhere; color: #475569; background: #f8fafc; padding: .4rem; }`],
})
export class TimelineEventComponent {
  @Input({ required: true }) event!: TimelineEvent;

  get propertyEntries(): [string, string][] {
    return Object.entries(this.event.properties);
  }
}
