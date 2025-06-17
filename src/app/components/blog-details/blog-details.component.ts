import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { BlogService } from '../../services/blog.service';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-blog-details',
  imports: [CommonModule , RouterModule , HeaderComponent],
  templateUrl: './blog-details.component.html',
  styleUrl: './blog-details.component.scss'
})
export class BlogDetailsComponent {

 
  blog: any;
  isLoading = true;
  error = '';

  constructor(
    private route: ActivatedRoute,
    private blogService: BlogService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.blogService.getBlogs().subscribe({
        next: (res) => {
          // Use documentId instead of id to match your API response
          this.blog = res.data.find((blog: any) => blog.documentId === id);
          console.error('fetching blogs:', this.blog);
          this.isLoading = false;
          
          if (!this.blog) {
            this.error = 'Blog post not found';
          }
        },
        error: (err) => {
          console.error('Error fetching blogs:', err);
          this.isLoading = false;
          this.error = 'Failed to load blog post';
        }
      });
    } else {
      this.isLoading = false;
      this.error = 'Invalid blog ID';
    }
  }

  formatContent(content: any[]): any[] {
    if (!content) return [];
    return content.filter(block => 
      block.type === 'paragraph' && block.children[0].text.trim() !== ''
    );
  }
}

