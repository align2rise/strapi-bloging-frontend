import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventsService } from '../../services/events.service';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-event-detail',
  imports: [CommonModule , HeaderComponent],
  templateUrl: './event-detail.component.html',
  styleUrl: './event-detail.component.scss'
})
export class EventDetailComponent {

  event: any;
  isLoading = true;
  error = '';

  constructor(
    private route: ActivatedRoute,
    private eventService: EventsService
  ) {}

  ngOnInit(): void {
    const documentId = this.route.snapshot.paramMap.get('documentId');
    if (documentId) {
      this.loadEvent(documentId);
    } else {
      this.isLoading = false;
      this.error = 'Invalid event ID';
    }
  }

  loadEvent(documentId: string): void {
    this.eventService.getEvents().subscribe({
      next: (res) => {
        this.event = res.data.find((event: any) => event.documentId === documentId);
        this.isLoading = false;
        if (!this.event) {
          this.error = 'Event not found';
        }
      },
      error: (err) => {
        console.error('Error fetching events:', err);
        this.isLoading = false;
        this.error = 'Failed to load event';
      }
    });
  }

  formatDate(dateString: string): string {
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString('en-US', options);
  }
}
