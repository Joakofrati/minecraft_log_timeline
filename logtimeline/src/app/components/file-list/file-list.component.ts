import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UploadedLog } from '../../models/event.model';

@Component({
  selector: 'app-file-list',
  standalone: true,
  template: `
    <section class="panel">
      <h2>Archivos seleccionados</h2>
      @if (logs.length === 0) {
        <p class="muted">Todavía no has seleccionado archivos.</p>
      } @else {
        @for (log of logs; track log.file.name) {
          <div class="file-row">
            <div>
              <strong>{{ log.file.name }}</strong>
              <small>{{ log.events.length }} eventos detectados</small>
              @if (log.error) { <small class="error">{{ log.error }}</small> }
            </div>
            <label>Jugador asociado
              <input [value]="log.playerName" (input)="changePlayer(log.file.name, $event)" placeholder="Nombre opcional" />
            </label>
          </div>
        }
      }
    </section>
  `,
  styles: [`
    .file-row { display: flex; justify-content: space-between; gap: 1rem; align-items: center; padding: .75rem 0; border-top: 1px solid #e2e8f0; }
    strong, small { display: block; } small { color: #64748b; margin-top: .25rem; } label { display: grid; gap: .25rem; font-size: .85rem; } input { min-width: 12rem; }
    .error { color: #b91c1c; } @media (max-width: 650px) { .file-row { align-items: stretch; flex-direction: column; } }
  `],
})
export class FileListComponent {
  @Input() logs: UploadedLog[] = [];
  @Output() readonly playerChanged = new EventEmitter<{ fileName: string; playerName: string }>();

  changePlayer(fileName: string, event: Event): void {
    this.playerChanged.emit({ fileName, playerName: (event.target as HTMLInputElement).value });
  }
}
