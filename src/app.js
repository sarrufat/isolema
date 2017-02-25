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
        redirect: 'searchword'
      },
      {
        route: 'searchword',
        name: 'searchword',
        moduleId: 'searchword',
        nav: true,
        title: 'Busca palabra'
      }
    ]);
    config.mapUnknownRoutes('not-found');
  }
}
