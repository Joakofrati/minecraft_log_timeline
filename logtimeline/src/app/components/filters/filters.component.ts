import { Component, EventEmitter, Input, Output } from '@angular/core';

export interface TimelineFilters {
  player: string;
  type: string;
  search: string;
}

@Component({
  selector: 'app-filters',
  standalone: true,
  template: `
    <section class="panel filters">
      <label>Jugador
        <select [value]="filters.player" (change)="update('player', $event)">
          <option value="">Todos</option>
          @for (player of players; track player) { <option [value]="player">{{ player }}</option> }
        </select>
      </label>
      <label>Tipo de evento
        <select [value]="filters.type" (change)="update('type', $event)">
          <option value="">Todos</option>
          @for (type of types; track type) { <option [value]="type">{{ type }}</option> }
        </select>
      </label>
      <label class="search">Buscar
        <input [value]="filters.search" (input)="update('search', $event)" placeholder="Texto del log..." />
      </label>
    </section>
  `,
  styles: [`.filters { display: flex; gap: 1rem; flex-wrap: wrap; } label { display: grid; gap: .3rem; font-size: .85rem; } .search { flex: 1; min-width: 12rem; }`],
})
export class FiltersComponent {
  @Input() players: string[] = [];
  @Input() types: string[] = [];
  @Input() filters: TimelineFilters = { player: '', type: '', search: '' };
  @Output() readonly filtersChanged = new EventEmitter<TimelineFilters>();

  update(key: keyof TimelineFilters, event: Event): void {
    this.filtersChanged.emit({ ...this.filters, [key]: (event.target as HTMLInputElement).value });
  }
}
