import {inject,bindable} from 'aurelia-framework';
import {ShowIsomorphismGateway} from './ShowIsomorphismGateway';


@inject(ShowIsomorphismGateway)
export class ShowIsomorphism {
  @bindable word;

  constructor(gateway) {
      this.gateway = gateway;
    }


  activate(params, config) {
      this.word = params.word;
      console.log("activate: " + params);
      return this.gateway.getIsomorphisms(params.word)
      .then(iso => {
        this.isomorphisms = iso;
         config.navModel.setTitle(params.word);
          console.log("iso: " + JSON.stringify(iso));
      })
    }
}
