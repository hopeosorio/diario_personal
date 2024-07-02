import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { EntryListComponent } from './pages/entry-list/entry-list.component';
import { EntryDetailComponent } from './pages/entry-detail/entry-detail.component';
import { EntryEditComponent } from './pages/entry-edit/entry-edit.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'entries', component: EntryListComponent },
  { path: 'entries/:id', component: EntryDetailComponent },
  { path: 'entries/:id/edit', component: EntryEditComponent },
  { path: 'new-entry', component: EntryEditComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
