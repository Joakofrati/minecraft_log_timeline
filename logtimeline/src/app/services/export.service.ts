import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { TimelineEvent } from '../models/event.model';

@Injectable({ providedIn: 'root' })
export class ExportService {
  constructor(@Inject(DOCUMENT) private readonly document: Document) {}

  downloadJson(events: TimelineEvent[]): void {
    const content = JSON.stringify(events, null, 2);
    this.download(content, 'minecraft-timeline.json', 'application/json');
  }

  downloadCsv(events: TimelineEvent[]): void {
    const headers = ['hora', 'tipo', 'jugador', 'archivo', 'propiedades', 'línea original'];
    const rows = events.map((event) => [
      event.time,
      event.type,
      event.player,
      event.fileName,
      JSON.stringify(event.properties),
      event.originalLine,
    ]);
    const csv = [headers, ...rows].map((row) => row.map((value) => this.escapeCsv(value)).join(',')).join('\r\n');
    this.download(`\ufeff${csv}`, 'minecraft-timeline.csv', 'text/csv;charset=utf-8');
  }

  private download(content: string, fileName: string, type: string): void {
    const link = this.document.createElement('a');
    link.href = URL.createObjectURL(new Blob([content], { type }));
    link.download = fileName;
    link.click();
    URL.revokeObjectURL(link.href);
  }

  private escapeCsv(value: string): string {
    return `"${value.replace(/"/g, '""')}"`;
  }
}
