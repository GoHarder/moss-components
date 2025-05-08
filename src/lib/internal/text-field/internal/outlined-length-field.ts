import '@material/web/field/outlined-field.js';
import { literal } from 'lit/static-html.js';
import { LengthField } from './length-field.js';
// import { TextField } from '@material/web/textfield/internal/text-field.js';

/**
 * An outlined text field component
 */
export class OutlinedLengthField extends LengthField {
  protected readonly fieldTag = literal`md-outlined-field`;
}
