
import { LitElement, html, css } from 'lit';
import {customElement, property, state} from 'lit/decorators.js';

declare global {
  interface HTMLElementTagNameMap {
    'boiler-el': BoilerEl;
  }
}

/**BoilerPlate Lit Element */
@customElement("boiler-el")
class BoilerEl extends LitElement {
  static styles = css`
  
  `



  // @property() duration = 60;
    @property({attribute: false})
    str = "a";
  // @state() private end: number | null = null;




  constructor() {
    super();
    // this.duration = 20;
    // this.str = "Hephaestin";
  }

  // updated(changedProperties) {
  //   if (changedProperties.has('duration')) {
  //     console.log('duration changed:', this.duration);
  //   }


  // }



  render() {
    return html`
        <h1>${this.str}</h1>
    `;
  }
}




