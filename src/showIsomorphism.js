import {
  inject,
  bindable
} from 'aurelia-framework';
import {
  ShowIsomorphismGateway
} from './ShowIsomorphismGateway';
import {
  Mask
} from './util/marks';


@inject(ShowIsomorphismGateway)
export class ShowIsomorphism {
  @bindable word;
  @bindable title;
  @bindable navFrom;

  constructor(gateway) {
    this.gateway = gateway;
  }


  activate(params, config) {
    this.word = params.word;
    this.navFrom = params.navFrom;
    console.log("activate: " + params);
    return this.gateway.getIsomorphisms(params.word)
      .then(iso => {
        var resmapped = iso.result.map((iso) => {
          iso.spellingMark = Mask.toHtml(iso.word, iso.mask);
          return iso;
        });
        this.isomorphisms = iso;
        this.isomorphisms.result = resmapped;
        if (iso.result.length > 0)
          this.title = this.word + ' → ' + iso.result[0].isocode;
        // config.navModel.setTitle(params.word);
        console.log("iso: " + JSON.stringify(iso));
      })
  }
}
