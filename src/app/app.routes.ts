import { Routes } from '@angular/router';
import { BlogListComponent } from './components/blog-list/blog-list.component';
import { BlogDetailsComponent } from './components/blog-details/blog-details.component';
import { EventListComponent } from './components/event-list/event-list.component';
import { EventDetailComponent } from './components/event-detail/event-detail.component';
import { ArticleListComponent } from './components/article-list/article-list.component';
import { ArticleDetailComponent } from './components/article-detail/article-detail.component';

export const routes: Routes = [
   
    { path: 'blog', component: BlogListComponent },
    { path: 'blog/:id', component: BlogDetailsComponent },
    { path: 'events', component: EventListComponent },
    { path: 'events/:documentId', component: EventDetailComponent },
    { path: 'articles', component: ArticleListComponent },
    { path: 'articles/:documentId', component: ArticleDetailComponent },
    { path: '', redirectTo: '/blog', pathMatch: 'full' }
];
