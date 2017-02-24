
import { HttpClient } from 'aurelia-fetch-client';
import { bindable, autoinject } from 'aurelia-framework';

@autoinject
export class SearchWord {
    @bindable
    word: string = '123';
    private httpClient: HttpClient;
    words: any = [ ];

    constructor(httpClient: HttpClient) {
        this.httpClient = httpClient;
        //    this.httpClient = new HttpClient();
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
    public wordChanged(newValue: string, oldValue: string) {
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
