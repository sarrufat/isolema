import {inject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';
import {Isomorphisms} from './model/Isomorphisms';


@inject(HttpClient)
export class ShowIsomorphismGateway {

  constructor(httpClient) {
    this.httpClient = httpClient;
    console.log(`httpClient = ${httpClient}`);
    this.httpClient.configure((config) => {
      config.withBaseUrl('/api/v1/isolema/isomorphisms/')
        .withDefaults({
          headers: {
            'Accept': 'application/json',
            'X-Requested-With': 'Fetch'
          }
        })
        .withInterceptor({
          request(request) {
            console.log(`Requesting ${request.method} ${request.url}`);
            return request; // you can return a modified Request, or you can short-circuit the request by returning a Response
          },
          response(response) {
            console.log(`Received ${response.status} ${response.url}`);
            return response; // you can return a modified Response
          }
        });
    });
  }
  getIsomorphisms(word) {
      return this.httpClient.fetch(`${word}`)
      .then(response => response.json())
      .then(Isomorphisms.fromObject);
  }
}
