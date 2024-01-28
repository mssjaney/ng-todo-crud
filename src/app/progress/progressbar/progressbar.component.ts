import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-progressbar',
  templateUrl: './progressbar.component.html',
  styleUrls: ['./progressbar.component.scss']
})
export class ProgressbarComponent {
  @Input() progress!: {[key: string]: number};

  public statuses: string[] = ['completed', 'deleted', 'postponed'];

  getProgressPercentage(status: string): number {
    return this.progress[status] || 0;
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'completed':
        return 'progress-bar bg-success';
      case 'deleted':
        return 'progress-bar bg-danger';
      case 'postponed':
        return 'progress-bar bg-warning';
      default:
        return 'progress-bar';
    }
  }
}
