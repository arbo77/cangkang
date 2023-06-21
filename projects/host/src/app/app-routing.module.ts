import { loadRemoteModule } from '@angular-architects/module-federation';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const fallBack = import('./not-found/not-found.module').then(
  (m) => m.NotFoundModule
);

const mfes: any[] = JSON.parse(localStorage.getItem('mfe') || '[]');

const routes: Routes = [];

mfes.forEach((mfe) => {
  routes.push({
    path: mfe.path,
    loadChildren: () =>
      loadRemoteModule({
        type: 'module',
        remoteEntry: mfe.host,
        exposedModule: './Module',
      })
        .then((m) => m.WelcomeModule)
        .catch(() => fallBack),
  });
});
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
