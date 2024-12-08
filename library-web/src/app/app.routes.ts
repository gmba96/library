import { Routes } from '@angular/router';
import { HomePageComponent } from './components/home/home-page/home-page.component';
import { ChoicePageComponent } from './components/choice-page/choice-page.component';
import { SearchPageComponent } from '../app/components/search-page/search-page.component';
import { VisualisationPageComponent } from './components/visualisation-page/visualisation-page.component';
import { AddPageComponent } from './components/add-page/add-page.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    {
        path: 'home',
        component: HomePageComponent
    },
    {
        path: 'home/choice',
        component: ChoicePageComponent
    },
    {
        path: "home/choice/search",
        component: SearchPageComponent
    },
    {
        path: "home/choice/add",
        component: AddPageComponent
    },
    {
        path: "home/choice/visualize",
        component: VisualisationPageComponent
    },
    {
        path: '**',
        redirectTo: '/home',
        pathMatch: 'full'
    }
];
