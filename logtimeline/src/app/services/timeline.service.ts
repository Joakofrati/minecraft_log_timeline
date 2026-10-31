import { Injectable } from '@angular/core';
import { TimelineEvent } from '../models/event.model';

@Injectable({ providedIn: 'root' })
export class TimelineService {
  combine(events: TimelineEvent[]): TimelineEvent[] {
    return [...events].sort((first, second) => this.timeToSeconds(first.time) - this.timeToSeconds(second.time));
  }

  filter(events: TimelineEvent[], player: string, type: string, search: string): TimelineEvent[] {
    const normalizedSearch = search.trim().toLowerCase();
    return events.filter((event) => {
      const matchesPlayer = !player || event.player === player;
      const matchesType = !type || event.type === type;
      const matchesSearch =
        !normalizedSearch ||
        `${event.originalLine} ${event.fileName}`.toLowerCase().includes(normalizedSearch);
      return matchesPlayer && matchesType && matchesSearch;
    });
  }

  private timeToSeconds(time: string): number {
    const [hours, minutes, seconds] = time.split(':').map(Number);
    return hours * 3600 + minutes * 60 + seconds;
  }
}
