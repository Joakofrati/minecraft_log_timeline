export interface TimelineEvent {
  id: string;
  time: string;
  type: string;
  player: string;
  properties: Record<string, string>;
  originalLine: string;
  fileName: string;
}

export interface UploadedLog {
  file: File;
  playerName: string;
  events: TimelineEvent[];
  error?: string;
}
