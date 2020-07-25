import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { BookComponent } from './pages/book/book.component';
import { AuthorsListComponent } from './pages/author/authors-list/authors-list.component';
import { CategoryComponent } from './pages/category/category.component';
import { SeriesComponent } from './pages/series/series.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './_guards/auth.guard';
import { AuthorsComponent } from './pages/author/author.component';
import { EditorComponent } from './pages/editor/editor.component';
import { EditorEditComponent } from './pages/editor-edit/editor-edit.component';
import { SearchboxComponent } from './pages/searchbox/searchbox.component';
import { ExploreComponent } from './pages/explore/explore.component';
import { ExploreCreateComponent } from './pages/explore/explore-create/explore-create.component';
import { CategoryChildComponent } from './pages/category/category-child/category-child.component';
import { UserComponent } from './pages/user/user.component';
import { SubTopicComponent } from './pages/editor-edit/sub-topic/sub-topic.component';
import { SubSubTopicComponent } from './pages/editor-edit/sub-sub-topic/sub-sub-topic.component';
import { PieChartComponent } from './pages/editor-edit/pie-chart/pie-chart.component';
import { PieSubchartComponent } from './pages/editor-edit/pie-subchart/pie-subchart.component';
import { TimelineComponent } from './pages/editor-edit/timeline/timeline.component';
import { SubtimelineComponent } from './pages/editor-edit/subtimeline/subtimeline.component';
import { SubWebComponent } from './pages/editor-edit/sub-web/sub-web.component';
import { SubSubWebComponent } from './pages/editor-edit/sub-sub-web/sub-sub-web.component';
import { TopicComponent } from './pages/topic/topic.component';
import { SubTopicListComponent } from './pages/sub-topic-list/sub-topic-list.component';
import { SubSubTopicListComponent } from './pages/sub-sub-topic-list/sub-sub-topic-list.component';
import { SubpieListComponent } from './pages/subpie-list/subpie-list.component';
import { SubsubpieListComponent } from './pages/subsubpie-list/subsubpie-list.component';
import { SubsubtimlineComponent } from './pages/subsubtimline/subsubtimline.component';
import { SubtimlineListComponent } from './pages/subtimline/subtimline.component';
import { WeblistComponent } from './pages/weblist/weblist.component';
import { SubsubweblistComponent } from './pages/subsubweblist/subsubweblist.component';
import { CreateChapterComponent } from './create-chapter/create-chapter.component';
import { InstitutionComponent } from './pages/institution/institution.component';
import { AboutInstituionComponent } from './pages/institution/about-instituion/about-instituion.component';
import { TestingComponent } from './testing/testing.component';

const routes: Routes = [
  { path: '', redirectTo:'/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent,canActivate:[AuthGuard]},
  { path: 'home/user', component: UserComponent,canActivate:[AuthGuard]},
  { path: 'home/category', component: CategoryComponent,canActivate:[AuthGuard]},
  { path: 'home/category/edit/:id', component: CategoryChildComponent,canActivate:[AuthGuard]},
  { path: 'home/book/create', component: BookComponent,canActivate:[AuthGuard]},
  { path: 'home/book/edit/:id', component: BookComponent,canActivate:[AuthGuard]},
  { path: 'home/author', component: AuthorsListComponent ,canActivate:[AuthGuard]},
  { path: 'home/author/create', component: AuthorsComponent,canActivate:[AuthGuard] },
  { path: 'home/author/edit/:id', component: AuthorsComponent,canActivate:[AuthGuard] },
  { path: 'home/series', component: SeriesComponent,canActivate:[AuthGuard]},
  { path: 'home/editor', component: EditorComponent,canActivate:[AuthGuard]},
  { path: 'edit/:id', component: EditorEditComponent,canActivate:[AuthGuard]},
  { path: 'search', component: SearchboxComponent,canActivate:[AuthGuard]},
  { path: 'home/Explore', component: ExploreComponent,canActivate:[AuthGuard]},
  { path: 'home/Institution', component: InstitutionComponent,canActivate:[AuthGuard]},
  { path: 'home/Explore/create', component: ExploreCreateComponent,canActivate:[AuthGuard]},
  { path: 'home/Explore/edit/:id', component: ExploreCreateComponent,canActivate:[AuthGuard]},
  { path: 'home/topic/sub-topic/create/:id', component: SubTopicComponent,canActivate:[AuthGuard]},
  { path: 'home/topic/sub-topic/sub-sub-topic/create/:id', component: SubSubTopicComponent,canActivate:[AuthGuard]},
  { path: 'home/topic/sub-topic/pie-chart/create/:id', component: PieChartComponent,canActivate:[AuthGuard]},
  { path: 'home/topic/sub-topic/timeline/create/:id', component: TimelineComponent,canActivate:[AuthGuard]},
  { path: 'home/topic/sub-sub-topic/pie-chart/create/:id', component: PieSubchartComponent,canActivate:[AuthGuard]},
  { path: 'home/topic/sub-sub-topic/timeline/create/:id', component: SubtimelineComponent,canActivate:[AuthGuard]},
  { path: 'home/topic/sub-topic/Web/create/:id', component: SubWebComponent,canActivate:[AuthGuard]},
  { path: 'home/topic/sub-sub-topic/Web/create/:id', component: SubSubWebComponent,canActivate:[AuthGuard]},
  { path: 'home/books/topic/:id', component: TopicComponent,canActivate:[AuthGuard]},
  { path: 'home/books/Sub-topic/:id', component: SubTopicListComponent,canActivate:[AuthGuard]},
  { path: 'home/books/Sub-Sub-topic/:id', component: SubSubTopicListComponent,canActivate:[AuthGuard]},
  { path: 'home/books/Sub-topic/pie/:id', component: SubpieListComponent,canActivate:[AuthGuard]},
  { path: 'home/books/Sub-Sub-topic/pie/:id', component: SubsubpieListComponent,canActivate:[AuthGuard]},
  { path: 'home/topic/sub-topic/timeline/list/:id', component:SubtimlineListComponent ,canActivate:[AuthGuard]},
  { path: 'home/topic/sub-sub-topic/timeline/list/:id', component: SubsubtimlineComponent,canActivate:[AuthGuard]},
  { path: 'home/topic/sub-topic/Web/list/:id', component: WeblistComponent,canActivate:[AuthGuard]},
  { path: 'home/topic/sub-sub-topic/Web/list/:id', component: SubsubweblistComponent,canActivate:[AuthGuard]},
  { path: 'home/book/chapter/create/:id', component: CreateChapterComponent,canActivate:[AuthGuard]},
  { path: 'home/Institution-about', component: AboutInstituionComponent,canActivate:[AuthGuard]},
  { path: 'home/test', component: TestingComponent,canActivate:[AuthGuard]},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
