import { Component } from '@angular/core';
import { ArticleService } from '../../services/article.service';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-article-list',
  imports: [CommonModule , HeaderComponent , RouterModule],
  templateUrl: './article-list.component.html',
  styleUrl: './article-list.component.scss'
})
export class ArticleListComponent {

  articles: any[] = [];
  isLoading = true;

  constructor(private articleService: ArticleService) {}

  ngOnInit(): void {
    this.loadArticles();
  }

  loadArticles(): void {
    this.articleService.getArticles().subscribe({
      next: (res) => {
        this.articles = res.data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching articles:', err);
        this.isLoading = false;
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

  getFirstParagraph(content: string): string {
    const firstParagraph = content.split('\n\n')[0];
    return firstParagraph || content.substring(0, 150) + '...';
  }
}
