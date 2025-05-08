import '@material/web/field/outlined-field.js';
import { customElement } from 'lit/decorators.js';
import { literal } from 'lit/static-html.js';
import { styles as outlinedStyles } from '@material/web/textfield/internal/outlined-styles.js';
import { styles as sharedStyles } from '@material/web/textfield/internal/shared-styles.js';
import { OutlinedLengthField } from './internal/outlined-length-field.js';

// MARK: Types
// ------------------------------------------------
import { type CSSResultOrNative } from 'lit';

declare global {
  interface HTMLElementTagNameMap {
    'md-outlined-length-field': MdOutlinedLengthField;
  }
}

// MARK: Main
// ------------------------------------------------
@customElement('md-outlined-length-field')
export class MdOutlinedLengthField extends OutlinedLengthField {
  static override styles: CSSResultOrNative[] = [sharedStyles, outlinedStyles];
  protected override readonly fieldTag = literal`md-outlined-field`;
}
