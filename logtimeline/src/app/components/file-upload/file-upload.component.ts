import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-file-upload',
  standalone: true,
  template: `
    <label class="upload-button">
      Seleccionar archivos .log
      <input type="file" accept=".log,text/plain" multiple (change)="onFilesSelected($event)" />
    </label>
    <p class="hint">Los archivos se procesan exclusivamente en este navegador.</p>
  `,
  styles: [`
    .upload-button { display: inline-block; cursor: pointer; background: #2563eb; color: white; padding: .7rem 1rem; border-radius: .5rem; font-weight: 700; }
    input { display: none; }
    .hint { color: #64748b; font-size: .9rem; }
  `],
})
export class FileUploadComponent {
  @Output() readonly filesSelected = new EventEmitter<File[]>();

  onFilesSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const files = input.files ? Array.from(input.files) : [];
    this.filesSelected.emit(files.filter((file) => file.name.toLowerCase().endsWith('.log')));
    input.value = '';
  }
}
