import { Injectable } from '@angular/core';
import { TimelineEvent } from '../models/event.model';

@Injectable({ providedIn: 'root' })
export class LogParserService {
  parse(content: string, fileName: string, associatedPlayer = ''): TimelineEvent[] {
    const events: TimelineEvent[] = [];

    content.split(/\r?\n/).forEach((line, lineIndex) => {
      const match = line.match(/\[(\d{2}:\d{2}:\d{2})\]\s+\[DP_EVENT\]\s+(.+)$/);
      if (!match) {
        return;
      }

      const values = this.parseProperties(match[2]);
      const type = values['type'];
      if (!type) {
        return;
      }

      const player = values['player'] || associatedPlayer.trim() || 'Sin jugador';
      const properties: Record<string, string> = { ...values };
      delete properties['type'];
      delete properties['player'];

      events.push({
        id: `${fileName}-${lineIndex}`,
        time: match[1],
        type,
        player,
        properties,
        originalLine: line,
        fileName,
      });
    });

    return events;
  }

  private parseProperties(value: string): Record<string, string> {
    const properties: Record<string, string> = {};
    const tokens = value.match(/[^\s=]+=(?:"[^"]*"|\S+)/g) ?? [];

    tokens.forEach((token) => {
      const separatorIndex = token.indexOf('=');
      const key = token.slice(0, separatorIndex);
      const propertyValue = token.slice(separatorIndex + 1).replace(/^"|"$/g, '');
      properties[key] = propertyValue;
    });

    return properties;
  }
}
