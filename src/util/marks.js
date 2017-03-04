

export class Mask {

  static toHtml(word, mask) {
    let wa = Array.from(word);
    var retVal = '';
    for (let [idx, ch] of wa.entries()) {
      let m = mask.charAt(idx);
      if (m == '_') {
        retVal = retVal + ch;
      } else {
        retVal = retVal + '<span class="label-danger">' + ch + '</span>';
      }
    }
    return retVal;
  }
}
