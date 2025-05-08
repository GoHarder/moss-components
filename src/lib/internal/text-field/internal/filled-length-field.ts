import '@material/web/field/filled-field.js';
import { literal } from 'lit/static-html.js';
import { LengthField } from './length-field.js';
// import { TextField } from '@material/web/textfield/internal/text-field.js';

/**
 * A filled text field component.
 */
export class FilledLengthField extends LengthField {
  protected readonly fieldTag = literal`md-filled-field`;
}
