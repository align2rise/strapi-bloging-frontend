import { Component } from '@angular/core';
import { BlogService } from '../../services/blog.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TruncatePipe } from '../../shared/pipes/truncate.pipe';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-blog-list',
  imports: [CommonModule , RouterModule , HeaderComponent],
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.scss']
})
export class BlogListComponent {
  blogs: any[] = [];
  isLoading = true;
  constructor(private blogService: BlogService) {}

  ngOnInit(): void {
    this.blogService.getBlogs().subscribe({
      next: (res) => {
        this.blogs = res.data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching blogs:', err);
        this.isLoading = false;
      }
    });
  }

  getFirstParagraph(content: any[]): string {
    for (const block of content) {
      if (block.type === 'paragraph' && block.children[0].text.trim() !== '') {
        return block.children[0].text;
      }
    }
    return '';
  }
}