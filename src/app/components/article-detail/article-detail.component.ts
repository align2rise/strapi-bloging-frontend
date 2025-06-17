import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArticleService } from '../../services/article.service';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-article-detail',
  imports: [CommonModule , HeaderComponent],
  templateUrl: './article-detail.component.html',
  styleUrl: './article-detail.component.scss'
})
export class ArticleDetailComponent {

  article: any;
  isLoading = true;
  error = '';

  constructor(
    private route: ActivatedRoute,
    private articleService: ArticleService
  ) {}

  ngOnInit(): void {
    const documentId = this.route.snapshot.paramMap.get('documentId');
    if (documentId) {
      this.loadArticle(documentId);
    } else {
      this.isLoading = false;
      this.error = 'Invalid article ID';
    }
  }

  loadArticle(documentId: string): void {
    this.articleService.getArticles().subscribe({
      next: (res) => {
        this.article = res.data.find((article: any) => article.documentId === documentId);
        this.isLoading = false;
        if (!this.article) {
          this.error = 'Article not found';
        }
      },
      error: (err) => {
        console.error('Error fetching articles:', err);
        this.isLoading = false;
        this.error = 'Failed to load article';
      }
    });
  }

  formatDate(dateString: string): string {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    };
    return new Date(dateString).toLocaleDateString('en-US', options);
  }

  formatContent(content: string): string[] {
    return content.split('\n\n').filter(paragraph => paragraph.trim() !== '');
  }
}
