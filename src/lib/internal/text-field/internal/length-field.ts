import { type PropertyValues, LitElement, html, nothing } from 'lit';
import { property, query, queryAssignedElements, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { live } from 'lit/directives/live.js';
import { type StyleInfo, styleMap } from 'lit/directives/style-map.js';
import { type StaticValue, html as staticHtml } from 'lit/static-html.js';

import { type Field } from '@material/web/field/internal/field.js';
import { type ARIAMixinStrict } from '@material/web/internal/aria/aria.js';
import { mixinDelegatesAria } from '@material/web/internal/aria/delegate.js';
import { stringConverter } from '@material/web/internal/controller/string-converter.js';
import { redispatchEvent } from '@material/web/internal/events/redispatch-event.js';
import { createValidator, getValidityAnchor, mixinConstraintValidation } from '@material/web/labs/behaviors/constraint-validation.js';
import { mixinElementInternals } from '@material/web/labs/behaviors/element-internals.js';
import { getFormValue, mixinFormAssociated } from '@material/web/labs/behaviors/form-associated.js';
import { mixinOnReportValidity, onReportValidity } from '@material/web/labs/behaviors/on-report-validity.js';
import { TextFieldValidator } from '@material/web/labs/behaviors/validators/text-field-validator.js';
import { type Validator } from '@material/web/labs/behaviors/validators/validator.js';

import { debounce } from '../../index.js';

/**
 * Input types that are compatible with the text field.
 */
export type TextFieldType = 'email' | 'number' | 'password' | 'search' | 'tel' | 'text' | 'url' | 'textarea';

/**
 * Input types that are not fully supported for the text field.
 */
export type UnsupportedTextFieldType = 'color' | 'date' | 'datetime-local' | 'file' | 'month' | 'time' | 'week';

/**
 * Input types that are incompatible with the text field.
 */
export type InvalidTextFieldType = 'button' | 'checkbox' | 'hidden' | 'image' | 'radio' | 'range' | 'reset' | 'submit';

// Separate variable needed for closure.
const textFieldBaseClass = mixinDelegatesAria(mixinOnReportValidity(mixinConstraintValidation(mixinFormAssociated(mixinElementInternals(LitElement)))));

/**
 * A text field component.
 *
 * @fires select {Event} The native `select` event on
 * [`<input>`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/select_event)
 * --bubbles
 * @fires change {Event} The native `change` event on
 * [`<input>`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/change_event)
 * --bubbles
 * @fires input {InputEvent} The native `input` event on
 * [`<input>`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/input_event)
 * --bubbles --composed
 */
export abstract class LengthField extends textFieldBaseClass {
  /** @nocollapse */
  static override shadowRootOptions: ShadowRootInit = {
    ...LitElement.shadowRootOptions,
    delegatesFocus: true,
  };

  /** DONE
   * Gets or sets whether or not the text field is in a visually invalid state.
   *
   * This error state overrides the error state controlled by
   * `reportValidity()`.
   */
  @property({ type: Boolean, reflect: true }) error = false;

  /** DONE
   * The error message that replaces supporting text when `error` is true. If
   * `errorText` is an empty string, then the supporting text will continue to
   * show.
   *
   * This error message overrides the error message displayed by
   * `reportValidity()`.
   */
  @property({ attribute: 'error-text' }) errorText = '';

  /** DONE
   * The floating Material label of the textfield component. It informs the user
   * about what information is requested for a text field. It is aligned with
   * the input text, is always visible, and it floats when focused or when text
   * is entered into the textfield. This label also sets accessibilty labels,
   * but the accessible label is overriden by `aria-label`.
   *
   * Learn more about floating labels from the Material Design guidelines:
   * https://m3.material.io/components/text-fields/guidelines
   */
  @property() label = '';

  /** DONE
   * Disables the asterisk on the floating label, when the text field is
   * required.
   */
  @property({ type: Boolean, attribute: 'no-asterisk' }) noAsterisk = false;

  /** DONE
   * Indicates that the user must specify a value for the input before the
   * owning form can be submitted and will render an error state when
   * `reportValidity()` is invoked when value is empty. Additionally the
   * floating label will render an asterisk `"*"` when true.
   *
   * https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/required
   */
  @property({ type: Boolean, reflect: true }) required = false;

  /** The current value of the text field. It is always a string. */
  @property() value = '';

  /** The current feet value of the length field. It is always a string. */
  @property({ attribute: 'value-ft' }) valueFt = '';

  /** The current inch value of the length field. It is always a string. */
  @property({ attribute: 'value-in' }) valueIn = '';

  /** DONE
   * An optional prefix to display before the input value.
   */
  @property({ attribute: 'prefix-text' }) prefixText = '';

  /**
   * An optional suffix to display after the input value.
   */
  @property({ attribute: 'suffix-text' }) suffixText = '';

  /** DONE
   * Whether or not the text field has a leading icon. Used for SSR.
   */
  @property({ type: Boolean, attribute: 'has-leading-icon' })
  hasLeadingIcon = false;

  /** DONE
   * Whether or not the text field has a trailing icon. Used for SSR.
   */
  @property({ type: Boolean, attribute: 'has-trailing-icon' })
  hasTrailingIcon = false;

  /** DONE
   * Conveys additional information below the text field, such as how it should
   * be used.
   */
  @property({ attribute: 'supporting-text' }) supportingText = '';

  /** DONE
   * Override the input text CSS `direction`. Useful for RTL languages that use
   * LTR notation for fractions.
   */
  @property({ attribute: 'text-direction' }) textDirection = '';

  // <input> properties DONE
  @property({ reflect: true }) override inputMode = '';

  /**
   * Defines the greatest value in the range of permitted values.
   *
   * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#max
   */
  @property() max = '';

  /** DONE Not used for length field is needed for other methods. */
  @property({ type: Number }) maxLength = -1;

  /**
   * Defines the most negative value in the range of permitted values.
   *
   * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#min
   */
  @property() min = '';

  /** DONE Not used for length field is needed for other methods. */
  @property({ type: Number }) minLength = -1;

  /** DONE
   * When true, hide the spinner for `type="number"` text fields.
   */
  @property({ type: Boolean, attribute: 'no-spinner' }) noSpinner = false;

  /** DONE Not used for length field is needed for other methods. */
  @property() pattern = '';

  /**
   * Defines the text displayed in the textfield when it has no value. Provides
   * a brief hint to the user as to the expected type of data that should be
   * entered into the control. Unlike `label`, the placeholder is not visible
   * and does not float when the textfield has a value.
   *
   * https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/placeholder
   */
  @property({ reflect: true, converter: stringConverter }) placeholder = '';

  /** DONE
   * Indicates whether or not a user should be able to edit the text field's
   * value.
   *
   * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#readonly
   */
  @property({ type: Boolean, reflect: true }) readOnly = false;

  /**
   * Gets or sets the direction in which selection occurred.
   */
  get selectionDirection() {
    return this.getInputOrTextarea().selectionDirection;
  }

  set selectionDirection(value: 'forward' | 'backward' | 'none' | null) {
    this.getInputOrTextarea().selectionDirection = value;
  }

  /**
   * Gets or sets the end position or offset of a text selection.
   */
  get selectionEnd() {
    return this.getInputOrTextarea().selectionEnd;
  }

  set selectionEnd(value: number | null) {
    this.getInputOrTextarea().selectionEnd = value;
  }

  /**
   * Gets or sets the starting position or offset of a text selection.
   */
  get selectionStart() {
    return this.getInputOrTextarea().selectionStart;
  }

  set selectionStart(value: number | null) {
    this.getInputOrTextarea().selectionStart = value;
  }

  /**
   * Returns or sets the element's step attribute, which works with min and max
   * to limit the increments at which a numeric or date-time value can be set.
   *
   * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#step
   */
  @property() step = '';

  /** DONE Not used for length field is needed for other methods. */
  @property({ reflect: true })
  type: TextFieldType | UnsupportedTextFieldType = 'number';

  /** DONE
   * Describes what, if any, type of autocomplete functionality the input
   * should provide.
   *
   * https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete
   */
  @property({ reflect: true }) autocomplete = '';

  /**
   * The text field's value as a number.
   */
  get valueAsNumber() {
    const input = this.getInput();
    if (!input) return NaN;
    return input.valueAsNumber;
  }

  set valueAsNumber(value: number) {
    const input = this.getInput();
    if (!input) return;
    input.valueAsNumber = value;
    this.value = input.value;
  }

  get valueFtAsNumber() {
    const input = this.getInputFt();
    if (!input) return NaN;
    return input.valueAsNumber;
  }

  set valueFtAsNumber(value: number) {
    const input = this.getInputFt();
    if (!input) return;
    input.valueAsNumber = value;
    this.valueFt = input.value;
  }

  get valueInAsNumber() {
    const input = this.getInputIn();
    if (!input) return NaN;
    return input.valueAsNumber;
  }

  set valueInAsNumber(value: number) {
    const input = this.getInputIn();
    if (!input) return;
    input.valueAsNumber = value;
    this.valueIn = input.value;
  }

  protected abstract readonly fieldTag: StaticValue;

  /**
   * Returns true when the text field has been interacted with. Native
   * validation errors only display in response to user interactions.
   */
  @state() private dirty = false;

  @state() private focused = false;

  /**
   * Whether or not a native error has been reported via `reportValidity()`.
   */
  @state() private nativeError = false;

  /**
   * The validation message displayed from a native error via
   * `reportValidity()`.
   */
  @state() private nativeErrorText = '';

  // DONE
  private get hasError() {
    return this.error || this.nativeError;
  }

  @query('.input')
  private readonly inputOrTextarea!: HTMLInputElement | HTMLTextAreaElement | null;

  @query('.input.ft')
  private readonly inputFt!: HTMLInputElement | null;

  @query('.input.in')
  private readonly inputIn!: HTMLInputElement | null;

  @query('.field') private readonly field!: Field | null;

  @queryAssignedElements({ slot: 'leading-icon' })
  private readonly leadingIcons!: Element[];

  @queryAssignedElements({ slot: 'trailing-icon' })
  private readonly trailingIcons!: Element[];

  /**
   * Selects all the text in the text field.
   *
   * https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/select
   */
  select() {
    this.getInputOrTextarea().select();
  }

  /**
   * Replaces a range of text with a new string.
   *
   * https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/setRangeText
   */
  setRangeText(replacement: string): void;
  setRangeText(replacement: string, start: number, end: number, selectionMode?: SelectionMode): void;
  setRangeText(...args: unknown[]) {
    // Calling setRangeText with 1 vs 3-4 arguments has different behavior.
    // Use spread syntax and type casting to ensure correct usage.
    this.getInputOrTextarea().setRangeText(...(args as Parameters<HTMLInputElement['setRangeText']>));
    this.value = this.getInputOrTextarea().value;
  }

  /**
   * Sets the start and end positions of a selection in the text field.
   *
   * https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/setSelectionRange
   *
   * @param start The offset into the text field for the start of the selection.
   * @param end The offset into the text field for the end of the selection.
   * @param direction The direction in which the selection is performed.
   */
  setSelectionRange(start: number | null, end: number | null, direction?: 'forward' | 'backward' | 'none') {
    this.getInputOrTextarea().setSelectionRange(start, end, direction);
  }

  /**
   * Decrements the value of a numeric type text field by `step` or `n` `step`
   * number of times.
   *
   * https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/stepDown
   *
   * @param stepDecrement The number of steps to decrement, defaults to 1.
   */
  stepDown(stepDecrement?: number) {
    const input = this.getInput();
    if (!input) {
      return;
    }

    input.stepDown(stepDecrement);
    this.value = input.value;
  }

  /**
   * Increments the value of a numeric type text field by `step` or `n` `step`
   * number of times.
   *
   * https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/stepUp
   *
   * @param stepIncrement The number of steps to increment, defaults to 1.
   */
  stepUp(stepIncrement?: number) {
    const input = this.getInput();
    if (!input) {
      return;
    }

    input.stepUp(stepIncrement);
    this.value = input.value;
  }

  /**
   * Reset the text field to its default value.
   */
  reset() {
    this.dirty = false;
    this.value = this.getAttribute('value') ?? '';
    this.nativeError = false;
    this.nativeErrorText = '';
  }

  override attributeChangedCallback(attribute: string, newValue: string | null, oldValue: string | null) {
    if (attribute === 'value' && this.dirty) {
      // After user input, changing the value attribute no longer updates the
      // text field's value (until reset). This matches native <input> behavior.
      return;
    }

    super.attributeChangedCallback(attribute, newValue, oldValue);
  }

  // DONE
  protected override render() {
    const classes = {
      disabled: this.disabled,
      error: !this.disabled && this.hasError,
      'no-spinner': this.noSpinner,
    };

    return html`<span class="text-field ${classMap(classes)}">${this.renderField()}</span>`;
  }

  protected override updated(changedProperties: PropertyValues) {
    // Keep changedProperties arg so that subclasses may call it

    // If a property such as `type` changes and causes the internal <input>
    // value to change without dispatching an event, re-sync it.
    const value = this.getInputOrTextarea().value;
    if (this.value !== value) {
      // Note this is typically inefficient in updated() since it schedules
      // another update. However, it is needed for the <input> to fully render
      // before checking its value.
      this.value = value;
    }
  }

  // DONE
  private renderField() {
    return staticHtml`<${this.fieldTag}
      class="field"
      ?disabled=${this.disabled}
      ?error=${this.hasError}
      error-text=${this.getErrorText()}
      ?focused=${this.focused}
      ?has-end=${this.hasTrailingIcon}
      ?has-start=${this.hasLeadingIcon}
      label=${this.label}
      ?no-asterisk=${this.noAsterisk}
      ?populated=${!!this.value}
      ?required=${this.required}
      supporting-text=${this.supportingText}
    >
      ${this.renderLeadingIcon()}
      ${this.renderInput()}
      ${this.renderTrailingIcon()}
      <div id="description" slot="aria-describedby"></div>
      <slot name="container" slot="container"></slot>
    </${this.fieldTag}>`;
  }

  // DONE
  private renderLeadingIcon() {
    return html`
      <span class="icon leading" slot="start">
        <slot name="leading-icon" @slotchange=${this.handleIconChange}></slot>
      </span>
    `;
  }

  // DONE
  private renderTrailingIcon() {
    return html`
      <span class="icon trailing" slot="end">
        <slot name="trailing-icon" @slotchange=${this.handleIconChange}></slot>
      </span>
    `;
  }

  private renderInput() {
    const style: StyleInfo = {
      direction: this.textDirection,
      textAlign: 'end',
    };

    const ariaLabel = (this as ARIAMixinStrict).ariaLabel || this.label || nothing;
    const autocomplete = this.autocomplete as any;
    const prefix = this.renderPrefix();
    const inputMode = this.inputMode as any;

    return html`
      <div class="input-wrapper">
        ${prefix}
        <input
          class="input ft"
          style=${styleMap(style)}
          aria-describedby="description"
          aria-invalid=${this.hasError}
          aria-label=${ariaLabel}
          autocomplete=${autocomplete || nothing}
          name=${this.name || nothing}
          ?disabled=${this.disabled}
          inputmode=${inputMode || nothing}
          max=${(this.max || nothing) as unknown as number}
          min=${(this.min || nothing) as unknown as number}
          placeholder=${this.placeholder || nothing}
          ?readonly=${this.readOnly}
          ?required=${this.required}
          step=${(this.step || nothing) as unknown as number}
          type="number"
          .value=${live(this.valueFt)}
          @change=${this.redispatchEvent}
          @focus=${this.handleFocusChange}
          @blur=${this.handleFocusChange}
          @input=${this.handleInputFt}
          @select=${this.redispatchEvent}
        />
        <span class="prefix suffix">ft</span>
        <input
          class="input in"
          style=${styleMap(style)}
          aria-describedby="description"
          aria-invalid=${this.hasError}
          aria-label=${ariaLabel}
          autocomplete=${autocomplete || nothing}
          name=${this.name || nothing}
          ?disabled=${this.disabled}
          inputmode=${inputMode || nothing}
          max=${(this.max || nothing) as unknown as number}
          min=${(this.min || nothing) as unknown as number}
          placeholder=${this.placeholder || nothing}
          ?readonly=${this.readOnly}
          ?required=${this.required}
          step=${(this.step || nothing) as unknown as number}
          type="number"
          .value=${live(this.valueIn)}
          @change=${this.redispatchEvent}
          @focus=${this.handleFocusChange}
          @blur=${this.handleFocusChange}
          @input=${this.handleInputIn}
          @select=${this.redispatchEvent}
        />
        <span class="suffix">in</span>
      </div>
    `;
  }

  // DONE
  private renderPrefix() {
    if (!this.prefixText) return nothing;
    return html`<span class="prefix">${this.prefixText}</span>`;
  }

  private getErrorText() {
    return this.error ? this.errorText : this.nativeErrorText;
  }

  // DONE
  private handleFocusChange = debounce(() => {
    // When calling focus() or reportValidity() during change, it's possible
    // for blur to be called after the new focus event. Rather than set
    // `this.focused` to true/false on focus/blur, we always set it to whether
    // or not the input itself is focused.
    const focusedFt = this.inputFt?.matches(':focus') ?? false;
    const focusedIn = this.inputIn?.matches(':focus') ?? false;
    this.focused = focusedFt || focusedIn;
  }, 0);

  private handleInput(event: InputEvent) {
    this.dirty = true;
    this.value = (event.target as HTMLInputElement).value;
  }

  private handleInputFt(event: InputEvent) {
    this.dirty = true;
    this.valueFt = (event.target as HTMLInputElement).value;
  }

  private handleInputIn(event: InputEvent) {
    this.dirty = true;
    this.valueIn = (event.target as HTMLInputElement).value;
  }

  // DONE
  private redispatchEvent(event: Event) {
    redispatchEvent(this, event);
  }

  private getInputOrTextarea() {
    if (!this.inputOrTextarea) {
      // If the input is not yet defined, synchronously render.
      // e.g.
      // const textField = document.createElement('md-outlined-text-field');
      // document.body.appendChild(textField);
      // textField.focus(); // synchronously render
      this.connectedCallback();
      this.scheduleUpdate();
    }

    if (this.isUpdatePending) {
      // If there are pending updates, synchronously perform them. This ensures
      // that constraint validation properties (like `required`) are synced
      // before interacting with input APIs that depend on them.
      this.scheduleUpdate();
    }

    return this.inputOrTextarea!;
  }

  private getInput() {
    return this.getInputOrTextarea() as HTMLInputElement;
  }

  // DONE
  private getInputFt() {
    if (!this.inputFt) {
      // If the input is not yet defined, synchronously render.
      // e.g.
      // const textField = document.createElement('md-outlined-text-field');
      // document.body.appendChild(textField);
      // textField.focus(); // synchronously render
      this.connectedCallback();
      this.scheduleUpdate();
    }

    if (this.isUpdatePending) {
      // If there are pending updates, synchronously perform them. This ensures
      // that constraint validation properties (like `required`) are synced
      // before interacting with input APIs that depend on them.
      this.scheduleUpdate();
    }

    return this.inputFt!;
  }

  // DONE
  private getInputIn() {
    if (!this.inputIn) {
      // If the input is not yet defined, synchronously render.
      // e.g.
      // const textField = document.createElement('md-outlined-text-field');
      // document.body.appendChild(textField);
      // textField.focus(); // synchronously render
      this.connectedCallback();
      this.scheduleUpdate();
    }

    if (this.isUpdatePending) {
      // If there are pending updates, synchronously perform them. This ensures
      // that constraint validation properties (like `required`) are synced
      // before interacting with input APIs that depend on them.
      this.scheduleUpdate();
    }

    return this.inputIn!;
  }

  // DONE
  private handleIconChange() {
    this.hasLeadingIcon = this.leadingIcons.length > 0;
    this.hasTrailingIcon = this.trailingIcons.length > 0;
  }

  // DONE Writable mixin properties for lit-html binding, needed for lit-analyzer
  declare disabled: boolean;
  // DONE
  declare name: string;

  override [getFormValue]() {
    return this.value;
  }

  override formResetCallback() {
    this.reset();
  }

  override formStateRestoreCallback(state: string) {
    this.value = state;
  }

  override focus() {
    // Required for the case that the user slots a focusable element into the
    // leading icon slot such as an iconbutton due to how delegatesFocus works.
    this.getInputOrTextarea().focus();
  }

  override [createValidator](): Validator<unknown> {
    return new TextFieldValidator(() => ({
      state: this,
      renderedControl: this.inputOrTextarea,
    }));
  }

  override [getValidityAnchor](): HTMLElement | null {
    return this.inputOrTextarea;
  }

  override [onReportValidity](invalidEvent: Event | null) {
    // Prevent default pop-up behavior.
    invalidEvent?.preventDefault();

    const prevMessage = this.getErrorText();
    this.nativeError = !!invalidEvent;
    this.nativeErrorText = this.validationMessage;

    if (prevMessage === this.getErrorText()) {
      this.field?.reannounceError();
    }
  }
}
