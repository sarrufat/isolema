import {HttpClient} from 'aurelia-fetch-client';
import {inject, bindable} from 'aurelia-framework';

@inject(HttpClient)
export class SearchWord {
  @bindable word;
  constructor(httpClient) {
    this.httpClient = httpClient;
    console.log(`httpClient = ${httpClient}`);
    this.words = [];
    this.httpClient.configure((config) => {
      config.withBaseUrl('/api/v1/isolema/wordLike/')
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
  wordChanged(newValue, oldValue) {
    if (newValue.length > 3) {
      this.httpClient.fetch(`${newValue}`)
        .then(response => response.json())
        .then(json => {
          this.words = json.words;
          console.log(json);
        });
    }
    console.log(`wordChanged(${newValue}, ${oldValue})`);
  }
}
