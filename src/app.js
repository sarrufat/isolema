import {
  Router,
  RouterConfiguration
} from 'aurelia-router';

export class App {

  configureRouter(config: RouterConfiguration, router: Router) {
    this.router = router;
    config.title = 'Isomorfismos';
    config.map([{
        route: '',
        redirect: 'home'
      },
      {
        route: 'home',
        name: 'home',
        moduleId: 'home',
        nav: true,
        title: 'Inicio'
      },
      {
        route: 'searchword',
        name: 'searchword',
        moduleId: 'searchword',
        nav: true,
        title: 'Buscar'
      },
      {
        route: 'showIsomorphism',
        name: 'showIsomorphism',
        moduleId: 'showIsomorphism',
        nav: false,
        title: 'Isomorfismos'
      }
    ]);
    config.mapUnknownRoutes('not-found');
  }
}
