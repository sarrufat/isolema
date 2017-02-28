import {HttpClient} from 'aurelia-fetch-client';
import {inject, bindable} from 'aurelia-framework';

@inject(HttpClient)
export class SearchWord {
  @bindable word;
  @bindable words;
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
      let subWord = newValue.toLowerCase();
      this.httpClient.fetch(`${subWord}`)
        .then(response => response.json())
        .then(json => {
          this.words = json.words.map( (aword) => {
            let slen = subWord.length;
            let pos = aword.saoWord.search(subWord);
            let prefix = aword.word.slice(0, pos);
            let middle = aword.word.slice(pos, pos+slen)
            let postix = aword.word.slice(pos+slen,  aword.word.length);
            return { prefix: prefix, middle: middle, postix: postix, isoCount: aword.isoCount}
          });
          console.log(this.words);
        });
    }
    console.log(`wordChanged(${newValue}, ${oldValue})`);
  }
}
