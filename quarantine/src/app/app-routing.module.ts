
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { DataResolverService } from './resolver/data-resolver.service';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {

    path:'login',loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
   },
  {

   path:'login/:id',loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {

    path: 'signup',
    loadChildren: () => import('./pages/signup/signup.module').then( m => m.SignupPageModule)
  },
  {
    path: 'tabs',
    loadChildren: () => import('./pages/tabs/tabs.module').then( m => m.TabsPageModule)
  },
  {
    path: 'helpline',
    loadChildren: () => import('./pages/helpline/helpline.module').then( m => m.HelplinePageModule)
  },
  {
    path: 'notification',
    loadChildren: () => import('./pages/notification/notification.module').then( m => m.NotificationPageModule)
  },
  {
    path: 'can-help',
    loadChildren: () => import('./pages/can-help/can-help.module').then( m => m.CanHelpPageModule)
  },{
    
    path: 'help',
    loadChildren: () => import('./pages/help/help.module').then( m => m.HelpPageModule)
  },
  {
    path: 'chat/:id',
    resolve: {
      special: DataResolverService
    },
    loadChildren: () => import('./pages/chat/chat.module').then( m => m.ChatPageModule)
  },
  {
    path: 'need-help',
    loadChildren: () => import('./pages/need-help/need-help.module').then( m => m.NeedHelpPageModule)
  },
  {
    path: 'posts',
    loadChildren: () => import('./pages/posts/posts.module').then( m => m.PostsPageModule)
  },  {
    path: 'otp',
    loadChildren: () => import('./pages/otp/otp.module').then( m => m.OtpPageModule)
  }



];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
