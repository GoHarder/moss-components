<script lang="ts" module>
  import { type ComponentSettings } from '../internal/index.js';
  let context = false;
  let settings: ComponentSettings['textField'] | undefined;
</script>

<script lang="ts">
  import { debounce, round, floor } from '../internal/index.js';
  import { getContext } from 'svelte';

  // MARK: Types
  // ------------------------------------------------
  type Props = {
    outlined?: boolean;
    /**
     * Gets or sets whether or not the text field is in a visually invalid state.
     * This error state overrides the error state controlled by `reportValidity()`.
     */
    error?: boolean;
    /**
     * The error message that replaces supporting text when `error` is true.
     * If errorText is an empty string, then the supporting text will continue to show.
     * This error message overrides the error message displayed by `reportValidity()`.
     */
    'error-text'?: string;
    /**
     * The floating Material label of the textfield component.
     * It informs the user about what information is requested for a text field.
     * It is aligned with the input text, is always visible, and it floats when focused or
     * when text is entered into the textfield.
     * This label also sets accessibility labels, but the accessible label is overridden by
     * `aria-label`.
     *
     * Learn more about floating labels from the
     * [Material Design guidelines](https://m3.material.io/components/text-fields/guidelines).
     */
    label?: string;
    /** Disables the asterisk on the floating label, when the text field is required. */
    'no-asterisk'?: boolean;
    /**
     * Indicates that the user must specify a value for the input before the owning form can
     * be submitted and will render an error state when `reportValidity()` is invoked when
     * value is empty.
     * Additionally the floating label will render an asterisk `"*"` when true.
     *
     * [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/required)
     */
    required?: boolean;
    /** The current value of the text field. */
    value?: number;
    /** An optional prefix to display before the input value. */
    'prefix-text'?: string;
    /** Conveys additional information below the text field, such as how it should be used. */
    'supporting-text'?: string;
    /**
     * The `inputmode` global attribute is an enumerated attribute that hints at the type of
     * data that might be entered by the user while editing the element or its contents.
     */
    inputmode?: 'none' | 'decimal' | 'numeric';
    /**
     * Indicates whether or not a user should be able to edit the text field's value.
     *
     * [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#readonly)
     */
    readonly?: boolean;
    /** When true, hide the spinner for `type="number"` text fields. */
    'no-spinner'?: boolean;
    disabled?: boolean;
  };

  // MARK: Properties
  // ------------------------------------------------
  let {
    // Wrap
    outlined = false,
    error,
    'error-text': errorText,
    label,
    'no-asterisk': noAsterisk,
    required,
    value = $bindable(),
    'prefix-text': prefixText,
    'supporting-text': supportingText,
    inputmode,
    readonly,
    'no-spinner': noSpinner,
    disabled,
  }: Props = $props();

  // MARK: Functions
  // ------------------------------------------------
  function valueFt(value: number | undefined) {
    if (value === undefined) return '';
    return `${floor(value / 12)}`;
  }

  function valueIn(value: number | undefined) {
    if (value === undefined) return '';
    return `${round(value % 12, 0.125)}`;
  }

  // MARK: Constants
  // ------------------------------------------------
  // MARK: State
  // ------------------------------------------------
  let inputFt: HTMLInputElement | undefined = $state();
  let inputIn: HTMLInputElement | undefined = $state();
  let focused = $state(false);

  // MARK: Derived
  // ------------------------------------------------

  let displayValueFt = $derived(valueFt(value));
  let displayValueIn = $derived(valueIn(value));
  let displayErrorText = $derived(errorText || inputFt?.validationMessage || inputIn?.validationMessage);

  let hasError = $derived(error || inputFt?.validity.valid === false || inputIn?.validity.valid === false);

  let processing = $state(false);

  let fieldProps = $derived({
    disabled,
    error,
    'error-text': displayErrorText,
    focused,
    // ?has-end=${this.hasTrailingIcon}
    // ?has-start=${this.hasLeadingIcon}
    label,
    'no-asterisk': noAsterisk,
    populated: processing || value !== undefined,
    required,
    'supporting-text': supportingText,
  });

  let inputProps = $derived({
    // style=${styleMap(style)}
    'aria-describedby': 'description',
    'aria-invalid': hasError,
    // aria-label=${ariaLabel}
    // autocomplete=${autocomplete || nothing}
    // name=${this.name || nothing}
    disabled,
    inputmode,
    min: 0,
    // placeholder=${this.placeholder || nothing}
    readonly,
    required,
    type: 'number',
  });

  // MARK: Contexts
  // ------------------------------------------------
  if (!context) {
    settings = getContext<ComponentSettings>('ComponentSettings')?.textField;
  }

  if (settings) {
    noAsterisk = settings.noAsterisk || noAsterisk;
    outlined = settings.variant === 'outlined' || outlined;
    noSpinner = settings.noSpinner || noSpinner;
  }

  // MARK: Subscriptions
  // ------------------------------------------------
  // MARK: Reactive Rules
  // ------------------------------------------------
  // MARK: Events
  // ------------------------------------------------
  const updateValue = debounce(() => {
    if (!inputFt || !inputIn) return;
    const ftValue = isNaN(inputFt.valueAsNumber) ? 0 : inputFt.valueAsNumber;
    const inValue = isNaN(inputIn.valueAsNumber) ? 0 : inputIn.valueAsNumber;
    value = round(ftValue * 12 + inValue, 0.125);
    processing = false;
  }, 1500);

  function oninput() {
    processing = true;
    updateValue();
  }

  const updateFocused = debounce(() => {
    if (!inputFt || !inputIn) return;
    const focusedFt = inputFt.matches(':focus');
    const focusedIn = inputIn.matches(':focus');
    focused = focusedFt || focusedIn;
  }, 0);

  // MARK: Lifecycle
  // ------------------------------------------------
</script>

<!-- private renderInputOrTextarea() {
     const style: StyleInfo = { direction: this.textDirection };
     const ariaLabel = (this as ARIAMixinStrict).ariaLabel || this.label || nothing;
     const autocomplete = this.autocomplete as any;
     const hasMaxLength = (this.maxLength ?? -1) > -1;
     const hasMinLength = (this.minLength ?? -1) > -1;
     const prefix = this.renderPrefix();
     const inputMode = this.inputMode as any;

     return html`
       <div class="input-wrapper">
         <input
           @change=${this.redispatchEvent}
           @select=${this.redispatchEvent}
         />
       </div>`;
   } -->

{#snippet input()}
  <div class={{ 'input-wrapper': true, outlined, filled: !outlined }}>
    <!-- TODO: Add prefix -->
    <input bind:this={inputFt} class="input" value={displayValueFt} onblur={updateFocused} onfocus={updateFocused} {oninput} {...inputProps} />
    <span class="prefix suffix">ft</span>
    <input bind:this={inputIn} class="input" value={displayValueIn} onblur={updateFocused} onfocus={updateFocused} {oninput} {...inputProps} step="0.125" />
    <span class="suffix">in</span>
  </div>
{/snippet}

{#snippet field()}
  {#if outlined}
    <md-outlined-field class="field" {...fieldProps}>
      <!-- TODO: Leading Icon -->
      {@render input()}
      <!-- TODO: Trailing Icon -->
      <div id="description" slot="aria-describedby"></div>
      <!-- <slot name="container" slot="container"></slot> -->
    </md-outlined-field>
  {:else}
    <md-filled-field class="field" {...fieldProps}>
      <!-- TODO: Leading Icon -->
      {@render input()}
      <!-- TODO: Trailing Icon -->
      <div id="description" slot="aria-describedby"></div>
      <!-- <slot name="container" slot="container"></slot> -->
    </md-filled-field>
  {/if}
{/snippet}

<span class={{ 'text-field': true, disabled, error, 'no-spinner': noSpinner }}>
  {@render field()}
</span>

<style lang="scss">
  @mixin vars($type) {
    --_bottom-space: var(--md-#{$type}-text-field-bottom-space, 16px);
    --_caret-color: var(--md-#{$type}-text-field-caret-color, var(--md-sys-color-primary, #6750a4));
    --_container-shape-start-end: var(
      --md-#{$type}-text-field-container-shape-start-end,
      var(--md-#{$type}-text-field-container-shape, var(--md-sys-shape-corner-extra-small, 4px))
    );
    --_container-shape-start-start: var(
      --md-#{$type}-text-field-container-shape-start-start,
      var(--md-#{$type}-text-field-container-shape, var(--md-sys-shape-corner-extra-small, 4px))
    );
    --_disabled-input-text-color: var(--md-#{$type}-text-field-disabled-input-text-color, var(--md-sys-color-on-surface, #1d1b20));
    --_disabled-input-text-opacity: var(--md-#{$type}-text-field-disabled-input-text-opacity, 0.38);
    --_disabled-label-text-color: var(--md-#{$type}-text-field-disabled-label-text-color, var(--md-sys-color-on-surface, #1d1b20));
    --_disabled-label-text-opacity: var(--md-#{$type}-text-field-disabled-label-text-opacity, 0.38);
    --_disabled-leading-icon-color: var(--md-#{$type}-text-field-disabled-leading-icon-color, var(--md-sys-color-on-surface, #1d1b20));
    --_disabled-leading-icon-opacity: var(--md-#{$type}-text-field-disabled-leading-icon-opacity, 0.38);
    --_disabled-supporting-text-color: var(--md-#{$type}-text-field-disabled-supporting-text-color, var(--md-sys-color-on-surface, #1d1b20));
    --_disabled-supporting-text-opacity: var(--md-#{$type}-text-field-disabled-supporting-text-opacity, 0.38);
    --_disabled-trailing-icon-color: var(--md-#{$type}-text-field-disabled-trailing-icon-color, var(--md-sys-color-on-surface, #1d1b20));
    --_disabled-trailing-icon-opacity: var(--md-#{$type}-text-field-disabled-trailing-icon-opacity, 0.38);
    --_error-focus-caret-color: var(--md-#{$type}-text-field-error-focus-caret-color, var(--md-sys-color-error, #b3261e));
    --_error-focus-input-text-color: var(--md-#{$type}-text-field-error-focus-input-text-color, var(--md-sys-color-on-surface, #1d1b20));
    --_error-focus-label-text-color: var(--md-#{$type}-text-field-error-focus-label-text-color, var(--md-sys-color-error, #b3261e));
    --_error-focus-leading-icon-color: var(--md-#{$type}-text-field-error-focus-leading-icon-color, var(--md-sys-color-on-surface-variant, #49454f));
    --_error-focus-supporting-text-color: var(--md-#{$type}-text-field-error-focus-supporting-text-color, var(--md-sys-color-error, #b3261e));
    --_error-focus-trailing-icon-color: var(--md-#{$type}-text-field-error-focus-trailing-icon-color, var(--md-sys-color-error, #b3261e));
    --_error-hover-input-text-color: var(--md-#{$type}-text-field-error-hover-input-text-color, var(--md-sys-color-on-surface, #1d1b20));
    --_error-hover-label-text-color: var(--md-#{$type}-text-field-error-hover-label-text-color, var(--md-sys-color-on-error-container, #410e0b));
    --_error-hover-leading-icon-color: var(--md-#{$type}-text-field-error-hover-leading-icon-color, var(--md-sys-color-on-surface-variant, #49454f));
    --_error-hover-supporting-text-color: var(--md-#{$type}-text-field-error-hover-supporting-text-color, var(--md-sys-color-error, #b3261e));
    --_error-hover-trailing-icon-color: var(--md-#{$type}-text-field-error-hover-trailing-icon-color, var(--md-sys-color-on-error-container, #410e0b));
    --_error-input-text-color: var(--md-#{$type}-text-field-error-input-text-color, var(--md-sys-color-on-surface, #1d1b20));
    --_error-label-text-color: var(--md-#{$type}-text-field-error-label-text-color, var(--md-sys-color-error, #b3261e));
    --_error-leading-icon-color: var(--md-#{$type}-text-field-error-leading-icon-color, var(--md-sys-color-on-surface-variant, #49454f));
    --_error-supporting-text-color: var(--md-#{$type}-text-field-error-supporting-text-color, var(--md-sys-color-error, #b3261e));
    --_error-trailing-icon-color: var(--md-#{$type}-text-field-error-trailing-icon-color, var(--md-sys-color-error, #b3261e));
    --_focus-caret-color: var(--md-#{$type}-text-field-focus-caret-color, var(--md-sys-color-primary, #6750a4));
    --_focus-input-text-color: var(--md-#{$type}-text-field-focus-input-text-color, var(--md-sys-color-on-surface, #1d1b20));
    --_focus-label-text-color: var(--md-#{$type}-text-field-focus-label-text-color, var(--md-sys-color-primary, #6750a4));
    --_focus-leading-icon-color: var(--md-#{$type}-text-field-focus-leading-icon-color, var(--md-sys-color-on-surface-variant, #49454f));
    --_focus-supporting-text-color: var(--md-#{$type}-text-field-focus-supporting-text-color, var(--md-sys-color-on-surface-variant, #49454f));
    --_focus-trailing-icon-color: var(--md-#{$type}-text-field-focus-trailing-icon-color, var(--md-sys-color-on-surface-variant, #49454f));
    --_hover-input-text-color: var(--md-#{$type}-text-field-hover-input-text-color, var(--md-sys-color-on-surface, #1d1b20));
    --_hover-leading-icon-color: var(--md-#{$type}-text-field-hover-leading-icon-color, var(--md-sys-color-on-surface-variant, #49454f));
    --_hover-supporting-text-color: var(--md-#{$type}-text-field-hover-supporting-text-color, var(--md-sys-color-on-surface-variant, #49454f));
    --_hover-trailing-icon-color: var(--md-#{$type}-text-field-hover-trailing-icon-color, var(--md-sys-color-on-surface-variant, #49454f));
    --_icon-input-space: var(--md-#{$type}-text-field-icon-input-space, 16px);
    --_input-text-color: var(--md-#{$type}-text-field-input-text-color, var(--md-sys-color-on-surface, #1d1b20));
    --_input-text-font: var(--md-#{$type}-text-field-input-text-font, var(--md-sys-typescale-body-large-font, var(--md-ref-typeface-plain, Roboto)));
    --_input-text-line-height: var(--md-#{$type}-text-field-input-text-line-height, var(--md-sys-typescale-body-large-line-height, 1.5rem));
    --_input-text-placeholder-color: var(--md-#{$type}-text-field-input-text-placeholder-color, var(--md-sys-color-on-surface-variant, #49454f));
    --_input-text-prefix-color: var(--md-#{$type}-text-field-input-text-prefix-color, var(--md-sys-color-on-surface-variant, #49454f));
    --_input-text-prefix-trailing-space: var(--md-#{$type}-text-field-input-text-prefix-trailing-space, 2px);
    --_input-text-size: var(--md-#{$type}-text-field-input-text-size, var(--md-sys-typescale-body-large-size, 1rem));
    --_input-text-suffix-color: var(--md-#{$type}-text-field-input-text-suffix-color, var(--md-sys-color-on-surface-variant, #49454f));
    --_input-text-suffix-leading-space: var(--md-#{$type}-text-field-input-text-suffix-leading-space, 2px);
    --_input-text-weight: var(--md-#{$type}-text-field-input-text-weight, var(--md-sys-typescale-body-large-weight, var(--md-ref-typeface-weight-regular, 400)));
    --_label-text-color: var(--md-#{$type}-text-field-label-text-color, var(--md-sys-color-on-surface-variant, #49454f));
    --_label-text-font: var(--md-#{$type}-text-field-label-text-font, var(--md-sys-typescale-body-large-font, var(--md-ref-typeface-plain, Roboto)));
    --_label-text-line-height: var(--md-#{$type}-text-field-label-text-line-height, var(--md-sys-typescale-body-large-line-height, 1.5rem));
    --_label-text-populated-line-height: var(--md-#{$type}-text-field-label-text-populated-line-height, var(--md-sys-typescale-body-small-line-height, 1rem));
    --_label-text-populated-size: var(--md-#{$type}-text-field-label-text-populated-size, var(--md-sys-typescale-body-small-size, 0.75rem));
    --_label-text-size: var(--md-#{$type}-text-field-label-text-size, var(--md-sys-typescale-body-large-size, 1rem));
    --_label-text-weight: var(--md-#{$type}-text-field-label-text-weight, var(--md-sys-typescale-body-large-weight, var(--md-ref-typeface-weight-regular, 400)));
    --_leading-icon-color: var(--md-#{$type}-text-field-leading-icon-color, var(--md-sys-color-on-surface-variant, #49454f));
    --_leading-icon-size: var(--md-#{$type}-text-field-leading-icon-size, 24px);
    --_leading-space: var(--md-#{$type}-text-field-leading-space, 16px);
    --_supporting-text-color: var(--md-#{$type}-text-field-supporting-text-color, var(--md-sys-color-on-surface-variant, #49454f));
    --_supporting-text-font: var(--md-#{$type}-text-field-supporting-text-font, var(--md-sys-typescale-body-small-font, var(--md-ref-typeface-plain, Roboto)));
    --_supporting-text-line-height: var(--md-#{$type}-text-field-supporting-text-line-height, var(--md-sys-typescale-body-small-line-height, 1rem));
    --_supporting-text-size: var(--md-#{$type}-text-field-supporting-text-size, var(--md-sys-typescale-body-small-size, 0.75rem));
    --_supporting-text-weight: var(--md-#{$type}-text-field-supporting-text-weight, var(--md-sys-typescale-body-small-weight, var(--md-ref-typeface-weight-regular, 400)));
    --_top-space: var(--md-#{$type}-text-field-top-space, 16px);
    --_trailing-icon-color: var(--md-#{$type}-text-field-trailing-icon-color, var(--md-sys-color-on-surface-variant, #49454f));
    --_trailing-icon-size: var(--md-#{$type}-text-field-trailing-icon-size, 24px);
    --_trailing-space: var(--md-#{$type}-text-field-trailing-space, 16px);
    --_with-leading-icon-leading-space: var(--md-#{$type}-text-field-with-leading-icon-leading-space, 12px);
    --_with-trailing-icon-trailing-space: var(--md-#{$type}-text-field-with-trailing-icon-trailing-space, 12px);
    --md-#{$type}-field-bottom-space: var(--_bottom-space);
    --md-#{$type}-field-container-shape-end-end: var(--_container-shape-end-end);
    --md-#{$type}-field-container-shape-end-start: var(--_container-shape-end-start);
    --md-#{$type}-field-container-shape-start-end: var(--_container-shape-start-end);
    --md-#{$type}-field-container-shape-start-start: var(--_container-shape-start-start);
    --md-#{$type}-field-content-color: var(--_input-text-color);
    --md-#{$type}-field-content-font: var(--_input-text-font);
    --md-#{$type}-field-content-line-height: var(--_input-text-line-height);
    --md-#{$type}-field-content-size: var(--_input-text-size);
    --md-#{$type}-field-content-space: var(--_icon-input-space);
    --md-#{$type}-field-content-weight: var(--_input-text-weight);
    --md-#{$type}-field-disabled-content-color: var(--_disabled-input-text-color);
    --md-#{$type}-field-disabled-content-opacity: var(--_disabled-input-text-opacity);
    --md-#{$type}-field-disabled-label-text-color: var(--_disabled-label-text-color);
    --md-#{$type}-field-disabled-label-text-opacity: var(--_disabled-label-text-opacity);
    --md-#{$type}-field-disabled-leading-content-color: var(--_disabled-leading-icon-color);
    --md-#{$type}-field-disabled-leading-content-opacity: var(--_disabled-leading-icon-opacity);
    --md-#{$type}-field-disabled-supporting-text-color: var(--_disabled-supporting-text-color);
    --md-#{$type}-field-disabled-supporting-text-opacity: var(--_disabled-supporting-text-opacity);
    --md-#{$type}-field-disabled-trailing-content-color: var(--_disabled-trailing-icon-color);
    --md-#{$type}-field-disabled-trailing-content-opacity: var(--_disabled-trailing-icon-opacity);
    --md-#{$type}-field-error-content-color: var(--_error-input-text-color);
    --md-#{$type}-field-error-focus-content-color: var(--_error-focus-input-text-color);
    --md-#{$type}-field-error-focus-label-text-color: var(--_error-focus-label-text-color);
    --md-#{$type}-field-error-focus-leading-content-color: var(--_error-focus-leading-icon-color);
    --md-#{$type}-field-error-focus-supporting-text-color: var(--_error-focus-supporting-text-color);
    --md-#{$type}-field-error-focus-trailing-content-color: var(--_error-focus-trailing-icon-color);
    --md-#{$type}-field-error-hover-content-color: var(--_error-hover-input-text-color);
    --md-#{$type}-field-error-hover-label-text-color: var(--_error-hover-label-text-color);
    --md-#{$type}-field-error-hover-leading-content-color: var(--_error-hover-leading-icon-color);
    --md-#{$type}-field-error-hover-supporting-text-color: var(--_error-hover-supporting-text-color);
    --md-#{$type}-field-error-hover-trailing-content-color: var(--_error-hover-trailing-icon-color);
    --md-#{$type}-field-error-label-text-color: var(--_error-label-text-color);
    --md-#{$type}-field-error-leading-content-color: var(--_error-leading-icon-color);
    --md-#{$type}-field-error-supporting-text-color: var(--_error-supporting-text-color);
    --md-#{$type}-field-error-trailing-content-color: var(--_error-trailing-icon-color);
    --md-#{$type}-field-focus-content-color: var(--_focus-input-text-color);
    --md-#{$type}-field-focus-label-text-color: var(--_focus-label-text-color);
    --md-#{$type}-field-focus-leading-content-color: var(--_focus-leading-icon-color);
    --md-#{$type}-field-focus-supporting-text-color: var(--_focus-supporting-text-color);
    --md-#{$type}-field-focus-trailing-content-color: var(--_focus-trailing-icon-color);
    --md-#{$type}-field-hover-content-color: var(--_hover-input-text-color);
    --md-#{$type}-field-hover-label-text-color: var(--_hover-label-text-color);
    --md-#{$type}-field-hover-leading-content-color: var(--_hover-leading-icon-color);
    --md-#{$type}-field-hover-supporting-text-color: var(--_hover-supporting-text-color);
    --md-#{$type}-field-hover-trailing-content-color: var(--_hover-trailing-icon-color);
    --md-#{$type}-field-label-text-color: var(--_label-text-color);
    --md-#{$type}-field-label-text-font: var(--_label-text-font);
    --md-#{$type}-field-label-text-line-height: var(--_label-text-line-height);
    --md-#{$type}-field-label-text-populated-line-height: var(--_label-text-populated-line-height);
    --md-#{$type}-field-label-text-populated-size: var(--_label-text-populated-size);
    --md-#{$type}-field-label-text-size: var(--_label-text-size);
    --md-#{$type}-field-label-text-weight: var(--_label-text-weight);
    --md-#{$type}-field-leading-content-color: var(--_leading-icon-color);
    --md-#{$type}-field-leading-space: var(--_leading-space);
    --md-#{$type}-field-supporting-text-color: var(--_supporting-text-color);
    --md-#{$type}-field-supporting-text-font: var(--_supporting-text-font);
    --md-#{$type}-field-supporting-text-line-height: var(--_supporting-text-line-height);
    --md-#{$type}-field-supporting-text-size: var(--_supporting-text-size);
    --md-#{$type}-field-supporting-text-weight: var(--_supporting-text-weight);
    --md-#{$type}-field-top-space: var(--_top-space);
    --md-#{$type}-field-trailing-content-color: var(--_trailing-icon-color);
    --md-#{$type}-field-trailing-space: var(--_trailing-space);
    --md-#{$type}-field-with-leading-content-leading-space: var(--_with-leading-icon-leading-space);
    --md-#{$type}-field-with-trailing-content-trailing-space: var(--_with-trailing-icon-trailing-space);
  }

  .input-wrapper.filled {
    @include vars('filled');
    --_active-indicator-color: var(--md-filled-text-field-active-indicator-color, var(--md-sys-color-on-surface-variant, #49454f));
    --_active-indicator-height: var(--md-filled-text-field-active-indicator-height, 1px);
    --_container-color: var(--md-filled-text-field-container-color, var(--md-sys-color-surface-container-highest, #e6e0e9));
    --_container-shape-end-end: var(--md-filled-text-field-container-shape-end-end, var(--md-filled-text-field-container-shape, var(--md-sys-shape-corner-none, 0px)));
    --_container-shape-end-start: var(--md-filled-text-field-container-shape-end-start, var(--md-filled-text-field-container-shape, var(--md-sys-shape-corner-none, 0px)));
    --_disabled-active-indicator-color: var(--md-filled-text-field-disabled-active-indicator-color, var(--md-sys-color-on-surface, #1d1b20));
    --_disabled-active-indicator-height: var(--md-filled-text-field-disabled-active-indicator-height, 1px);
    --_disabled-active-indicator-opacity: var(--md-filled-text-field-disabled-active-indicator-opacity, 0.38);
    --_disabled-container-color: var(--md-filled-text-field-disabled-container-color, var(--md-sys-color-on-surface, #1d1b20));
    --_disabled-container-opacity: var(--md-filled-text-field-disabled-container-opacity, 0.04);
    --_error-active-indicator-color: var(--md-filled-text-field-error-active-indicator-color, var(--md-sys-color-error, #b3261e));
    --_error-focus-active-indicator-color: var(--md-filled-text-field-error-focus-active-indicator-color, var(--md-sys-color-error, #b3261e));
    --_error-hover-active-indicator-color: var(--md-filled-text-field-error-hover-active-indicator-color, var(--md-sys-color-on-error-container, #410e0b));
    --_error-hover-state-layer-color: var(--md-filled-text-field-error-hover-state-layer-color, var(--md-sys-color-on-surface, #1d1b20));
    --_error-hover-state-layer-opacity: var(--md-filled-text-field-error-hover-state-layer-opacity, 0.08);

    --_focus-active-indicator-color: var(--md-filled-text-field-focus-active-indicator-color, var(--md-sys-color-primary, #6750a4));
    --_focus-active-indicator-height: var(--md-filled-text-field-focus-active-indicator-height, 3px);

    --_hover-active-indicator-color: var(--md-filled-text-field-hover-active-indicator-color, var(--md-sys-color-on-surface, #1d1b20));
    --_hover-active-indicator-height: var(--md-filled-text-field-hover-active-indicator-height, 1px);
    --_hover-state-layer-color: var(--md-filled-text-field-hover-state-layer-color, var(--md-sys-color-on-surface, #1d1b20));
    --_hover-state-layer-opacity: var(--md-filled-text-field-hover-state-layer-opacity, 0.08);
    --_hover-label-text-color: var(--md-filled-text-field-hover-label-text-color, var(--md-sys-color-on-surface-variant, #49454f));

    --_with-label-top-space: var(--md-filled-text-field-with-label-top-space, 8px);
    --_with-label-bottom-space: var(--md-filled-text-field-with-label-bottom-space, 8px);
    --md-filled-field-active-indicator-color: var(--_active-indicator-color);
    --md-filled-field-active-indicator-height: var(--_active-indicator-height);
    --md-filled-field-container-color: var(--_container-color);
    --md-filled-field-disabled-active-indicator-color: var(--_disabled-active-indicator-color);
    --md-filled-field-disabled-active-indicator-height: var(--_disabled-active-indicator-height);
    --md-filled-field-disabled-active-indicator-opacity: var(--_disabled-active-indicator-opacity);
    --md-filled-field-disabled-container-color: var(--_disabled-container-color);
    --md-filled-field-disabled-container-opacity: var(--_disabled-container-opacity);
    --md-filled-field-error-active-indicator-color: var(--_error-active-indicator-color);
    --md-filled-field-error-focus-active-indicator-color: var(--_error-focus-active-indicator-color);
    --md-filled-field-error-hover-active-indicator-color: var(--_error-hover-active-indicator-color);
    --md-filled-field-error-hover-state-layer-color: var(--_error-hover-state-layer-color);
    --md-filled-field-error-hover-state-layer-opacity: var(--_error-hover-state-layer-opacity);
    --md-filled-field-focus-active-indicator-color: var(--_focus-active-indicator-color);
    --md-filled-field-focus-active-indicator-height: var(--_focus-active-indicator-height);
    --md-filled-field-hover-active-indicator-color: var(--_hover-active-indicator-color);
    --md-filled-field-hover-active-indicator-height: var(--_hover-active-indicator-height);
    --md-filled-field-hover-state-layer-color: var(--_hover-state-layer-color);
    --md-filled-field-hover-state-layer-opacity: var(--_hover-state-layer-opacity);
    --md-filled-field-with-label-bottom-space: var(--_with-label-bottom-space);
    --md-filled-field-with-label-top-space: var(--_with-label-top-space);
  }

  .input-wrapper.outlined {
    @include vars('outlined');
    --_container-shape-end-end: var(
      --md-outlined-text-field-container-shape-end-end,
      var(--md-outlined-text-field-container-shape, var(--md-sys-shape-corner-extra-small, 4px))
    );
    --_container-shape-end-start: var(
      --md-outlined-text-field-container-shape-end-start,
      var(--md-outlined-text-field-container-shape, var(--md-sys-shape-corner-extra-small, 4px))
    );
    --_disabled-outline-color: var(--md-outlined-text-field-disabled-outline-color, var(--md-sys-color-on-surface, #1d1b20));
    --_disabled-outline-opacity: var(--md-outlined-text-field-disabled-outline-opacity, 0.12);
    --_disabled-outline-width: var(--md-outlined-text-field-disabled-outline-width, 1px);
    --_error-focus-outline-color: var(--md-outlined-text-field-error-focus-outline-color, var(--md-sys-color-error, #b3261e));
    --_error-hover-outline-color: var(--md-outlined-text-field-error-hover-outline-color, var(--md-sys-color-on-error-container, #410e0b));
    --_error-outline-color: var(--md-outlined-text-field-error-outline-color, var(--md-sys-color-error, #b3261e));
    --_focus-outline-color: var(--md-outlined-text-field-focus-outline-color, var(--md-sys-color-primary, #6750a4));
    --_focus-outline-width: var(--md-outlined-text-field-focus-outline-width, 3px);
    --_hover-label-text-color: var(--md-outlined-text-field-hover-label-text-color, var(--md-sys-color-on-surface, #1d1b20));
    --_hover-outline-color: var(--md-outlined-text-field-hover-outline-color, var(--md-sys-color-on-surface, #1d1b20));
    --_hover-outline-width: var(--md-outlined-text-field-hover-outline-width, 1px);
    --_outline-color: var(--md-outlined-text-field-outline-color, var(--md-sys-color-outline, #79747e));
    --_outline-width: var(--md-outlined-text-field-outline-width, 1px);
    --md-outlined-field-disabled-outline-color: var(--_disabled-outline-color);
    --md-outlined-field-disabled-outline-opacity: var(--_disabled-outline-opacity);
    --md-outlined-field-disabled-outline-width: var(--_disabled-outline-width);
    --md-outlined-field-error-focus-outline-color: var(--_error-focus-outline-color);
    --md-outlined-field-error-hover-outline-color: var(--_error-hover-outline-color);
    --md-outlined-field-error-outline-color: var(--_error-outline-color);
    --md-outlined-field-focus-outline-color: var(--_focus-outline-color);
    --md-outlined-field-focus-outline-width: var(--_focus-outline-width);
    --md-outlined-field-hover-outline-color: var(--_hover-outline-color);
    --md-outlined-field-hover-outline-width: var(--_hover-outline-width);
    --md-outlined-field-outline-color: var(--_outline-color);
    --md-outlined-field-outline-width: var(--_outline-width);
  }

  :host {
    display: inline-flex;
    outline: none;
    resize: both;
    text-align: start;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  }
  .text-field,
  .field {
    width: 100%;
  }
  .text-field {
    display: inline-flex;
  }
  .field {
    cursor: text;
  }
  .disabled .field {
    cursor: default;
  }
  // .text-field,
  // .textarea .field {
  //   resize: inherit;
  // }
  // slot[name='container'] {
  //   border-radius: inherit;
  // }
  // .icon {
  //   color: currentColor;
  //   display: flex;
  //   align-items: center;
  //   justify-content: center;
  //   fill: currentColor;
  //   position: relative;
  // }
  // .icon ::slotted(*) {
  //   display: flex;
  //   position: absolute;
  // }
  // [has-start] .icon.leading {
  //   font-size: var(--_leading-icon-size);
  //   height: var(--_leading-icon-size);
  //   width: var(--_leading-icon-size);
  // }
  // [has-end] .icon.trailing {
  //   font-size: var(--_trailing-icon-size);
  //   height: var(--_trailing-icon-size);
  //   width: var(--_trailing-icon-size);
  // }
  .input-wrapper {
    display: flex;
  }
  .input-wrapper > * {
    all: inherit;
    padding: 0;
  }
  .input {
    caret-color: var(--_caret-color);
    overflow-x: hidden;
    text-align: end;
  }
  .input::placeholder {
    color: currentColor;
    opacity: 1;
  }
  .input::-webkit-calendar-picker-indicator {
    display: none;
  }
  .input::-webkit-search-decoration,
  .input::-webkit-search-cancel-button {
    display: none;
  }
  @media (forced-colors: active) {
    .input {
      background: none;
    }
  }
  .no-spinner .input::-webkit-inner-spin-button,
  .no-spinner .input::-webkit-outer-spin-button {
    display: none;
  }
  .no-spinner .input[type='number'] {
    -moz-appearance: textfield;
    appearance: textfield;
  }
  :focus-within .input {
    caret-color: var(--_focus-caret-color);
  }
  .error:focus-within .input {
    caret-color: var(--_error-focus-caret-color);
  }
  .text-field:not(.disabled) .prefix {
    color: var(--_input-text-prefix-color);
  }
  .text-field:not(.disabled) .suffix {
    color: var(--_input-text-suffix-color);
  }
  .text-field:not(.disabled) .input::placeholder {
    color: var(--_input-text-placeholder-color);
  }
  .prefix,
  .suffix {
    text-wrap: nowrap;
    width: min-content;
  }
  .prefix {
    padding-inline-end: var(--_input-text-prefix-trailing-space);
  }
  .suffix {
    padding-inline-start: var(--_input-text-suffix-leading-space);
  }
</style>
