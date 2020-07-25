import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './navbar/navbar.component';
import { MatToolbarModule} from '@angular/material/toolbar'

import { HomeComponent } from './pages/home/home.component';
import { BookComponent } from './pages/book/book.component';
import { MaterialModule } from './material/material.module';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { UserService } from './shared/user.service';
import { AuthorsListComponent } from './pages/author/authors-list/authors-list.component';
import { CategoryComponent } from './pages/category/category.component';
import { CategoryFormComponent } from './pages/category/category-form/category-form.component';
import { SeriesComponent } from './pages/series/series.component';
import { SeriesFormComponent } from './pages/series/series-form/series-form.component';
import { LoginComponent } from './login/login.component';
import { AuthInterceptor } from './_guards/auth.interceptor';
import { CategoryDispalyComponent } from './pages/category/category-dispaly/category-dispaly.component';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { AuthorsComponent } from './pages/author/author.component';
import { EditorComponent } from './pages/editor/editor.component';
import { EditorEditComponent } from './pages/editor-edit/editor-edit.component';
import { SeriesService } from './shared/series.service';
import { CategoryService } from './shared/category.service';
import { AuthorService } from './shared/author.service';
import { SearchboxComponent } from './pages/searchbox/searchbox.component';
import { NgxEditorModule } from 'ngx-editor';
import { BookService } from './shared/book.service';
import { FilterPipe } from './pipe/search.pipe';
import {NgxPaginationModule} from 'ngx-pagination';

import { ExploreCreateComponent } from './pages/explore/explore-create/explore-create.component';
import { ExploreComponent } from './pages/explore/explore.component';
import { NgxSummernoteModule } from 'ngx-summernote';
import { OrderModule } from 'ngx-order-pipe';
import { SeriesUpdateComponent } from './pages/series/series-update/series-update.component';
import { CategoryChildComponent } from './pages/category/category-child/category-child.component';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { GallaryComponent } from './file-upload/gallary/gallary.component';
import { UserComponent } from './pages/user/user.component';
import { TimelineComponent } from './pages/editor-edit/timeline/timeline.component';
import { PieChartComponent } from './pages/editor-edit/pie-chart/pie-chart.component';
import { SubtimelineComponent } from './pages/editor-edit/subtimeline/subtimeline.component';
import { PieSubchartComponent } from './pages/editor-edit/pie-subchart/pie-subchart.component';
import { SubTopicComponent } from './pages/editor-edit/sub-topic/sub-topic.component';
import { SubSubTopicComponent } from './pages/editor-edit/sub-sub-topic/sub-sub-topic.component';
import { BookUpdateComponent } from './pages/book-update/book-update.component';
import { TimelineViewComponent } from './pages/editor-edit/timeline-view/timeline-view.component';
import { WebViewComponent } from './pages/editor-edit/web-view/web-view.component';
import { SubWebComponent } from './pages/editor-edit/sub-web/sub-web.component';
import { SubSubWebComponent } from './pages/editor-edit/sub-sub-web/sub-sub-web.component';
import { TopicComponent } from './pages/topic/topic.component';
import { SubTopicListComponent } from './pages/sub-topic-list/sub-topic-list.component';
import { SubSubTopicListComponent } from './pages/sub-sub-topic-list/sub-sub-topic-list.component';
import { SubpieListComponent } from './pages/subpie-list/subpie-list.component';
import { SubsubpieListComponent } from './pages/subsubpie-list/subsubpie-list.component';
import { PhotoUploadComponent } from './photo-upload/photo-upload.component';
import { ArUploaderComponent } from './ar-uploader/ar-uploader.component';
import { SubtimlineListComponent } from './pages/subtimline/subtimline.component';
import { SubsubtimlineComponent } from './pages/subsubtimline/subsubtimline.component';
import { WeblistComponent } from './pages/weblist/weblist.component';
import { SubsubweblistComponent } from './pages/subsubweblist/subsubweblist.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { CreateChapterComponent } from './create-chapter/create-chapter.component';
import { InstitutionComponent } from './pages/institution/institution.component';
import { InstitutionFormComponent } from './pages/institution/institution-form/institution-form.component';
import { InstitutionUpdateComponent } from './pages/institution/institution-update/institution-update.component';
import { AboutInstituionComponent } from './pages/institution/about-instituion/about-instituion.component';
import { UserFormComponent } from './pages/user/user-form/user-form.component';
import { UserUpdateComponent } from './pages/user/user-update/user-update.component';
import { TestingComponent } from './testing/testing.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    AuthorsComponent,
    BookComponent,
    BookUpdateComponent,
    AuthorsListComponent,
    CategoryComponent,
    CategoryFormComponent,
    SeriesComponent,
    SeriesFormComponent,
    LoginComponent,
    CategoryDispalyComponent,
    EditorComponent,
    EditorEditComponent,
    SearchboxComponent,
    FilterPipe,
    ExploreComponent,
    ExploreCreateComponent,
    SeriesUpdateComponent,
    CategoryChildComponent,
    FileUploadComponent,
    GallaryComponent,
    UserComponent,
    TimelineComponent,
    PieChartComponent,
    SubtimelineComponent,
    PieSubchartComponent,
    SubTopicComponent,
    SubSubTopicComponent,
    TimelineViewComponent,
    WebViewComponent,
    SubWebComponent,
    SubSubWebComponent,
    TopicComponent,
    SubtimlineListComponent,
    SubTopicListComponent,
    SubSubTopicListComponent,
    SubpieListComponent,
    SubsubpieListComponent,
    PhotoUploadComponent,
    ArUploaderComponent,
    SubsubtimlineComponent,
    WeblistComponent,
    SubsubweblistComponent,
    CreateChapterComponent,
    InstitutionComponent,
    InstitutionFormComponent,
    InstitutionUpdateComponent,
    AboutInstituionComponent,
    UserFormComponent,
    UserUpdateComponent,
    TestingComponent,
    
  ],
  imports: [
    BrowserModule,
    NgxSummernoteModule,
    FormsModule,
    OrderModule,
    NgxPaginationModule,
    NgxEditorModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularEditorModule,
    //Matrial Module
    MaterialModule,
    HttpClientModule,
    ToastrModule.forRoot({
      progressBar: true
    }),
  ],
  exports:[MaterialModule],
  providers: [UserService,{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  },SeriesService,CategoryService,AuthorService,BookService,
  {provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent],
  entryComponents: [
    CategoryFormComponent,
    SeriesFormComponent,
    SeriesUpdateComponent,
    GallaryComponent,
    InstitutionFormComponent,
    InstitutionUpdateComponent,
    UserFormComponent,
    UserUpdateComponent,
  ],
})
export class AppModule { }
