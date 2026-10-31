import { Component, computed, signal } from '@angular/core';
import { ExportService } from './services/export.service';
import { LogParserService } from './services/log-parser.service';
import { TimelineService } from './services/timeline.service';
import { TimelineEvent, UploadedLog } from './models/event.model';
import { FileUploadComponent } from './components/file-upload/file-upload.component';
import { FileListComponent } from './components/file-list/file-list.component';
import { FiltersComponent, TimelineFilters } from './components/filters/filters.component';
import { TimelineComponent } from './components/timeline/timeline.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FileUploadComponent, FileListComponent, FiltersComponent, TimelineComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  readonly logs = signal<UploadedLog[]>([]);
  readonly filters = signal<TimelineFilters>({ player: '', type: '', search: '' });
  readonly allEvents = computed<TimelineEvent[]>(() =>
    this.timelineService.combine(this.logs().flatMap((log) => log.events)),
  );
  readonly filteredEvents = computed<TimelineEvent[]>(() => {
    const currentFilters = this.filters();
    return this.timelineService.filter(
      this.allEvents(),
      currentFilters.player,
      currentFilters.type,
      currentFilters.search,
    );
  });
  readonly players = computed<string[]>(() => this.uniqueValues(this.allEvents().map((event) => event.player)));
  readonly types = computed<string[]>(() => this.uniqueValues(this.allEvents().map((event) => event.type)));
  readonly emptyMessage = computed(() => {
    if (this.logs().length === 0) {
      return 'Selecciona uno o varios archivos .log para comenzar.';
    }
    if (this.allEvents().length === 0) {
      return 'No se detectaron líneas [DP_EVENT] en los archivos seleccionados.';
    }
    return 'No se detectaron eventos con los filtros actuales.';
  });

  constructor(
    private readonly parser: LogParserService,
    private readonly timelineService: TimelineService,
    private readonly exportService: ExportService,
  ) {}

  async selectFiles(files: File[]): Promise<void> {
    const logs = await Promise.all(files.map(async (file): Promise<UploadedLog> => {
      try {
        const content = await file.text();
        return { file, playerName: '', events: this.parser.parse(content, file.name) };
      } catch {
        return { file, playerName: '', events: [], error: 'No se pudo leer este archivo.' };
      }
    }));
    this.logs.set(logs);
    this.filters.set({ player: '', type: '', search: '' });
  }

  async changePlayer(change: { fileName: string; playerName: string }): Promise<void> {
    const log = this.logs().find((item) => item.file.name === change.fileName);
    if (!log) {
      return;
    }
    const content = await log.file.text();
    const updatedLogs = this.logs().map((item) =>
      item === log
        ? { ...item, playerName: change.playerName, events: this.parser.parse(content, item.file.name, change.playerName) }
        : item,
    );
    this.logs.set(updatedLogs);
  }

  exportJson(): void {
    this.exportService.downloadJson(this.filteredEvents());
  }

  exportCsv(): void {
    this.exportService.downloadCsv(this.filteredEvents());
  }

  private uniqueValues(values: string[]): string[] {
    return [...new Set(values)].sort((first, second) => first.localeCompare(second));
  }
}
