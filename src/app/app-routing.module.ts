import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './home/home.component';
import { AboutMeComponent } from './home/about-me/about-me.component';
import { CompetencesComponent } from './home/competences/competences.component';
import { CursusComponent } from './home/cursus/cursus.component';
import { ExperiencesComponent } from './home/experiences/experiences.component';

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'home', component: HomeComponent},
  {path: 'aboutme', component: AboutMeComponent},
  {path: 'comp', component: CompetencesComponent},
  {path: 'cur', component: CursusComponent},
  {path: 'exp', component: ExperiencesComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
