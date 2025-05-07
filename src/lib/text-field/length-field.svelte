<script lang="ts" module>
  import { type ComponentSettings } from '../internal/index.js';
  let context = false;
  let settings: ComponentSettings['textField'] | undefined;
</script>

<script lang="ts">
  import { debounce, round } from '../internal/index.js';
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
    return `${round(value / 12)}`;
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
  <div class="input-wrapper">
    <!-- TODO: Add prefix -->
    <input
      bind:this={inputFt}
      class={{ input: true, outlined, filled: !outlined }}
      value={displayValueFt}
      onblur={updateFocused}
      onfocus={updateFocused}
      {oninput}
      {...inputProps}
    />
    <span class="prefix suffix">ft</span>
    <input
      bind:this={inputIn}
      class={{ input: true, outlined, filled: !outlined }}
      value={displayValueIn}
      onblur={updateFocused}
      onfocus={updateFocused}
      {oninput}
      {...inputProps}
      step="0.125"
    />
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
    // --_active-indicator-color: var(--md-filled-text-field-active-indicator-color, var(--md-sys-color-on-surface-variant, #49454f));
    // --_active-indicator-height: var(--md-filled-text-field-active-indicator-height, 1px);
    // --_container-color: var(--md-filled-text-field-container-color, var(--md-sys-color-surface-container-highest, #e6e0e9));

    // --_disabled-active-indicator-color: var(--md-filled-text-field-disabled-active-indicator-color, var(--md-sys-color-on-surface, #1d1b20));
    // --_disabled-active-indicator-height: var(--md-filled-text-field-disabled-active-indicator-height, 1px);
    // --_disabled-active-indicator-opacity: var(--md-filled-text-field-disabled-active-indicator-opacity, 0.38);
    // --_disabled-container-color: var(--md-filled-text-field-disabled-container-color, var(--md-sys-color-on-surface, #1d1b20));
    // --_disabled-container-opacity: var(--md-filled-text-field-disabled-container-opacity, 0.04);

    // --_disabled-input-text-color: var(--md-filled-text-field-disabled-input-text-color, var(--md-sys-color-on-surface, #1d1b20));
    // --_disabled-input-text-opacity: var(--md-filled-text-field-disabled-input-text-opacity, 0.38);

    // --_disabled-leading-icon-color: var(--md-filled-text-field-disabled-leading-icon-color, var(--md-sys-color-on-surface, #1d1b20));
    // --_disabled-leading-icon-opacity: var(--md-filled-text-field-disabled-leading-icon-opacity, 0.38);
    // --_disabled-trailing-icon-color: var(--md-filled-text-field-disabled-trailing-icon-color, var(--md-sys-color-on-surface, #1d1b20));
    // --_disabled-trailing-icon-opacity: var(--md-filled-text-field-disabled-trailing-icon-opacity, 0.38);

    // --_error-active-indicator-color: var(--md-filled-text-field-error-active-indicator-color, var(--md-sys-color-error, #b3261e));

    // --_error-focus-active-indicator-color: var(--md-filled-text-field-error-focus-active-indicator-color, var(--md-sys-color-error, #b3261e));
    --_error-focus-caret-color: var(--md-#{$type}-text-field-error-focus-caret-color, var(--md-sys-color-error, #b3261e));
    --_error-focus-input-text-color: var(--md-filled-text-field-error-focus-input-text-color, var(--md-sys-color-on-surface, #1d1b20));
    // --_error-focus-leading-icon-color: var(--md-filled-text-field-error-focus-leading-icon-color, var(--md-sys-color-on-surface-variant, #49454f));
    // --_error-focus-trailing-icon-color: var(--md-filled-text-field-error-focus-trailing-icon-color, var(--md-sys-color-error, #b3261e));

    // --_error-hover-active-indicator-color: var(--md-filled-text-field-error-hover-active-indicator-color, var(--md-sys-color-on-error-container, #410e0b));
    // --_error-hover-input-text-color: var(--md-filled-text-field-error-hover-input-text-color, var(--md-sys-color-on-surface, #1d1b20));
    // --_error-hover-label-text-color: var(--md-filled-text-field-error-hover-label-text-color, var(--md-sys-color-on-error-container, #410e0b));
    // --_error-hover-leading-icon-color: var(--md-filled-text-field-error-hover-leading-icon-color, var(--md-sys-color-on-surface-variant, #49454f));
    // --_error-hover-state-layer-color: var(--md-filled-text-field-error-hover-state-layer-color, var(--md-sys-color-on-surface, #1d1b20));
    // --_error-hover-state-layer-opacity: var(--md-filled-text-field-error-hover-state-layer-opacity, 0.08);
    // --_error-hover-supporting-text-color: var(--md-filled-text-field-error-hover-supporting-text-color, var(--md-sys-color-error, #b3261e));
    // --_error-hover-trailing-icon-color: var(--md-filled-text-field-error-hover-trailing-icon-color, var(--md-sys-color-on-error-container, #410e0b));

    // --_error-input-text-color: var(--md-filled-text-field-error-input-text-color, var(--md-sys-color-on-surface, #1d1b20));
    // --_error-label-text-color: var(--md-filled-text-field-error-label-text-color, var(--md-sys-color-error, #b3261e));
    // --_error-leading-icon-color: var(--md-filled-text-field-error-leading-icon-color, var(--md-sys-color-on-surface-variant, #49454f));
    // --_error-supporting-text-color: var(--md-filled-text-field-error-supporting-text-color, var(--md-sys-color-error, #b3261e));
    // --_error-trailing-icon-color: var(--md-filled-text-field-error-trailing-icon-color, var(--md-sys-color-error, #b3261e));

    // --_focus-active-indicator-color: var(--md-filled-text-field-focus-active-indicator-color, var(--md-sys-color-primary, #6750a4));
    // --_focus-active-indicator-height: var(--md-filled-text-field-focus-active-indicator-height, 3px);
    --_focus-input-text-color: var(--md-#{$type}-text-field-focus-input-text-color, var(--md-sys-color-on-surface, #1d1b20));
    // --_focus-label-text-color: var(--md-filled-text-field-focus-label-text-color, var(--md-sys-color-primary, #6750a4));
    // --_focus-leading-icon-color: var(--md-filled-text-field-focus-leading-icon-color, var(--md-sys-color-on-surface-variant, #49454f));
    // --_focus-supporting-text-color: var(--md-filled-text-field-focus-supporting-text-color, var(--md-sys-color-on-surface-variant, #49454f));
    // --_focus-trailing-icon-color: var(--md-filled-text-field-focus-trailing-icon-color, var(--md-sys-color-on-surface-variant, #49454f));

    // --_hover-active-indicator-color: var(--md-filled-text-field-hover-active-indicator-color, var(--md-sys-color-on-surface, #1d1b20));
    // --_hover-active-indicator-height: var(--md-filled-text-field-hover-active-indicator-height, 1px);
    // --_hover-input-text-color: var(--md-filled-text-field-hover-input-text-color, var(--md-sys-color-on-surface, #1d1b20));
    // --_hover-label-text-color: var(--md-filled-text-field-hover-label-text-color, var(--md-sys-color-on-surface-variant, #49454f));
    // --_hover-leading-icon-color: var(--md-filled-text-field-hover-leading-icon-color, var(--md-sys-color-on-surface-variant, #49454f));
    // --_hover-state-layer-color: var(--md-filled-text-field-hover-state-layer-color, var(--md-sys-color-on-surface, #1d1b20));
    // --_hover-state-layer-opacity: var(--md-filled-text-field-hover-state-layer-opacity, 0.08);
    // --_hover-supporting-text-color: var(--md-filled-text-field-hover-supporting-text-color, var(--md-sys-color-on-surface-variant, #49454f));
    // --_hover-trailing-icon-color: var(--md-filled-text-field-hover-trailing-icon-color, var(--md-sys-color-on-surface-variant, #49454f));

    --_input-text-color: var(--md-#{$type}-text-field-input-text-color, var(--md-sys-color-on-surface, #1d1b20));
    --_input-text-font: var(--md-#{$type}-text-field-input-text-font, var(--md-sys-typescale-body-large-font, var(--md-ref-typeface-plain, Roboto)));
    --_input-text-line-height: var(--md-#{$type}-text-field-input-text-line-height, var(--md-sys-typescale-body-large-line-height, 1.5rem));
    // --_input-text-placeholder-color: var(--md-filled-text-field-input-text-placeholder-color, var(--md-sys-color-on-surface-variant, #49454f));
    // --_input-text-prefix-color: var(--md-filled-text-field-input-text-prefix-color, var(--md-sys-color-on-surface-variant, #49454f));
    --_input-text-size: var(--md-#{$type}-text-field-input-text-size, var(--md-sys-typescale-body-large-size, 1rem));
    // --_input-text-suffix-color: var(--md-filled-text-field-input-text-suffix-color, var(--md-sys-color-on-surface-variant, #49454f));
    --_input-text-weight: var(--md-#{$type}-text-field-input-text-weight, var(--md-sys-typescale-body-large-weight, var(--md-ref-typeface-weight-regular, 400)));

    // --_label-text-color: var(--md-filled-text-field-label-text-color, var(--md-sys-color-on-surface-variant, #49454f));
    // --_label-text-font: var(--md-filled-text-field-label-text-font, var(--md-sys-typescale-body-large-font, var(--md-ref-typeface-plain, Roboto)));
    // --_label-text-line-height: var(--md-filled-text-field-label-text-line-height, var(--md-sys-typescale-body-large-line-height, 1.5rem));
    // --_label-text-populated-line-height: var(--md-filled-text-field-label-text-populated-line-height, var(--md-sys-typescale-body-small-line-height, 1rem));
    // --_label-text-populated-size: var(--md-filled-text-field-label-text-populated-size, var(--md-sys-typescale-body-small-size, 0.75rem));
    // --_label-text-size: var(--md-filled-text-field-label-text-size, var(--md-sys-typescale-body-large-size, 1rem));
    // --_label-text-weight: var(--md-filled-text-field-label-text-weight, var(--md-sys-typescale-body-large-weight, var(--md-ref-typeface-weight-regular, 400)));

    // --_leading-icon-color: var(--md-filled-text-field-leading-icon-color, var(--md-sys-color-on-surface-variant, #49454f));
    // --_leading-icon-size: var(--md-filled-text-field-leading-icon-size, 24px);

    // --_trailing-icon-color: var(--md-filled-text-field-trailing-icon-color, var(--md-sys-color-on-surface-variant, #49454f));
    // --_trailing-icon-size: var(--md-filled-text-field-trailing-icon-size, 24px);

    // --_icon-input-space: var(--md-filled-text-field-icon-input-space, 16px);
    // --_leading-space: var(--md-filled-text-field-leading-space, 16px);
    // --_trailing-space: var(--md-filled-text-field-trailing-space, 16px);
    // --_top-space: var(--md-filled-text-field-top-space, 16px);
    // --_bottom-space: var(--md-filled-text-field-bottom-space, 16px);
    // --_input-text-prefix-trailing-space: var(--md-filled-text-field-input-text-prefix-trailing-space, 2px);
    // --_input-text-suffix-leading-space: var(--md-filled-text-field-input-text-suffix-leading-space, 2px);
    // --_with-label-top-space: var(--md-filled-text-field-with-label-top-space, 8px);
    // --_with-label-bottom-space: var(--md-filled-text-field-with-label-bottom-space, 8px);
    --_focus-caret-color: var(--md-#{$type}-text-field-focus-caret-color, var(--md-sys-color-primary, #6750a4));
    // --_with-leading-icon-leading-space: var(--md-filled-text-field-with-leading-icon-leading-space, 12px);
    // --_with-trailing-icon-trailing-space: var(--md-filled-text-field-with-trailing-icon-trailing-space, 12px);

    // --md-filled-field-active-indicator-color: var(--_active-indicator-color);
    // --md-filled-field-active-indicator-height: var(--_active-indicator-height);
    // --md-filled-field-bottom-space: var(--_bottom-space);
    // --md-filled-field-container-color: var(--_container-color);
    // --md-filled-field-container-shape-end-end: var(--_container-shape-end-end);
    // --md-filled-field-container-shape-end-start: var(--_container-shape-end-start);
    // --md-filled-field-container-shape-start-end: var(--_container-shape-start-end);
    // --md-filled-field-container-shape-start-start: var(--_container-shape-start-start);
    // --md-filled-field-content-color: var(--_input-text-color);
    // --md-filled-field-content-font: var(--_input-text-font);
    // --md-filled-field-content-line-height: var(--_input-text-line-height);
    // --md-filled-field-content-size: var(--_input-text-size);
    // --md-filled-field-content-space: var(--_icon-input-space);
    // --md-filled-field-content-weight: var(--_input-text-weight);

    // --md-filled-field-disabled-active-indicator-color: var(--_disabled-active-indicator-color);
    // --md-filled-field-disabled-active-indicator-height: var(--_disabled-active-indicator-height);
    // --md-filled-field-disabled-active-indicator-opacity: var(--_disabled-active-indicator-opacity);
    // --md-filled-field-disabled-container-color: var(--_disabled-container-color);
    // --md-filled-field-disabled-container-opacity: var(--_disabled-container-opacity);
    // --md-filled-field-disabled-content-color: var(--_disabled-input-text-color);
    // --md-filled-field-disabled-content-opacity: var(--_disabled-input-text-opacity);
    // --md-filled-field-disabled-label-text-color: var(--_disabled-label-text-color);
    // --md-filled-field-disabled-label-text-opacity: var(--_disabled-label-text-opacity);
    // --md-filled-field-disabled-leading-content-color: var(--_disabled-leading-icon-color);
    // --md-filled-field-disabled-leading-content-opacity: var(--_disabled-leading-icon-opacity);
    // --md-filled-field-disabled-supporting-text-color: var(--_disabled-supporting-text-color);
    // --md-filled-field-disabled-supporting-text-opacity: var(--_disabled-supporting-text-opacity);
    // --md-filled-field-disabled-trailing-content-color: var(--_disabled-trailing-icon-color);
    // --md-filled-field-disabled-trailing-content-opacity: var(--_disabled-trailing-icon-opacity);

    // --md-filled-field-error-active-indicator-color: var(--_error-active-indicator-color);
    // --md-filled-field-error-content-color: var(--_error-input-text-color);
    // --md-filled-field-error-focus-active-indicator-color: var(--_error-focus-active-indicator-color);
    // --md-filled-field-error-focus-content-color: var(--_error-focus-input-text-color);
    // --md-filled-field-error-focus-label-text-color: var(--_error-focus-label-text-color);
    // --md-filled-field-error-focus-leading-content-color: var(--_error-focus-leading-icon-color);
    // --md-filled-field-error-focus-supporting-text-color: var(--_error-focus-supporting-text-color);
    // --md-filled-field-error-focus-trailing-content-color: var(--_error-focus-trailing-icon-color);
    // --md-filled-field-error-hover-active-indicator-color: var(--_error-hover-active-indicator-color);
    // --md-filled-field-error-hover-content-color: var(--_error-hover-input-text-color);
    // --md-filled-field-error-hover-label-text-color: var(--_error-hover-label-text-color);
    // --md-filled-field-error-hover-leading-content-color: var(--_error-hover-leading-icon-color);
    // --md-filled-field-error-hover-state-layer-color: var(--_error-hover-state-layer-color);
    // --md-filled-field-error-hover-state-layer-opacity: var(--_error-hover-state-layer-opacity);
    // --md-filled-field-error-hover-supporting-text-color: var(--_error-hover-supporting-text-color);
    // --md-filled-field-error-hover-trailing-content-color: var(--_error-hover-trailing-icon-color);
    // --md-filled-field-error-label-text-color: var(--_error-label-text-color);
    // --md-filled-field-error-leading-content-color: var(--_error-leading-icon-color);
    // --md-filled-field-error-supporting-text-color: var(--_error-supporting-text-color);
    // --md-filled-field-error-trailing-content-color: var(--_error-trailing-icon-color);
    // --md-filled-field-focus-active-indicator-color: var(--_focus-active-indicator-color);
    // --md-filled-field-focus-active-indicator-height: var(--_focus-active-indicator-height);
    // --md-filled-field-focus-content-color: var(--_focus-input-text-color);
    // --md-filled-field-focus-label-text-color: var(--_focus-label-text-color);
    // --md-filled-field-focus-leading-content-color: var(--_focus-leading-icon-color);
    // --md-filled-field-focus-supporting-text-color: var(--_focus-supporting-text-color);
    // --md-filled-field-focus-trailing-content-color: var(--_focus-trailing-icon-color);
    // --md-filled-field-hover-active-indicator-color: var(--_hover-active-indicator-color);
    // --md-filled-field-hover-active-indicator-height: var(--_hover-active-indicator-height);
    // --md-filled-field-hover-content-color: var(--_hover-input-text-color);
    // --md-filled-field-hover-label-text-color: var(--_hover-label-text-color);
    // --md-filled-field-hover-leading-content-color: var(--_hover-leading-icon-color);
    // --md-filled-field-hover-state-layer-color: var(--_hover-state-layer-color);
    // --md-filled-field-hover-state-layer-opacity: var(--_hover-state-layer-opacity);
    // --md-filled-field-hover-supporting-text-color: var(--_hover-supporting-text-color);
    // --md-filled-field-hover-trailing-content-color: var(--_hover-trailing-icon-color);
    // --md-filled-field-label-text-color: var(--_label-text-color);
    // --md-filled-field-label-text-font: var(--_label-text-font);
    // --md-filled-field-label-text-line-height: var(--_label-text-line-height);
    // --md-filled-field-label-text-populated-line-height: var(--_label-text-populated-line-height);
    // --md-filled-field-label-text-populated-size: var(--_label-text-populated-size);
    // --md-filled-field-label-text-size: var(--_label-text-size);
    // --md-filled-field-label-text-weight: var(--_label-text-weight);
    // --md-filled-field-leading-content-color: var(--_leading-icon-color);
    // --md-filled-field-leading-space: var(--_leading-space);
    // --md-filled-field-supporting-text-color: var(--_supporting-text-color);
    // --md-filled-field-supporting-text-font: var(--_supporting-text-font);
    // --md-filled-field-supporting-text-line-height: var(--_supporting-text-line-height);
    // --md-filled-field-supporting-text-size: var(--_supporting-text-size);
    // --md-filled-field-supporting-text-weight: var(--_supporting-text-weight);
    // --md-filled-field-top-space: var(--_top-space);
    // --md-filled-field-trailing-content-color: var(--_trailing-icon-color);
    // --md-filled-field-trailing-space: var(--_trailing-space);
    // --md-filled-field-with-label-bottom-space: var(--_with-label-bottom-space);
    // --md-filled-field-with-label-top-space: var(--_with-label-top-space);
    // --md-filled-field-with-leading-content-leading-space: var(--_with-leading-icon-leading-space);
    // --md-filled-field-with-trailing-content-trailing-space: var(--_with-trailing-icon-trailing-space);
  }

  input.filled {
    @include vars('filled');
  }

  input.outlined {
    @include vars('outlined');
  }

  input {
    // Text
    font-family: var(--_input-text-font);
    font-size: var(--_input-text-size);
    font-weight: var(--_input-text-weight);
    line-height: var(--_input-text-line-height);
    // Appearance
    background-color: transparent;
    border: none;
    color: currentColor;

    text-align: end;

    &:focus {
      // Appearance
      color: var(--_focus-input-text-color);
      outline: none;
      // Other
      caret-color: var(--_focus-caret-color);
    }
  }

  .text-field {
    &.error input {
      &:focus {
        color: var(--_error-focus-input-text-color);
        // Other
        caret-color: var(--_error-focus-caret-color);
      }
    }

    &.no-spinner input {
      // color: green;
      -moz-appearance: textfield;
      &::-webkit-inner-spin-button,
      &::-webkit-outer-spin-button {
        -webkit-appearance: none;
        margin: 0;
      }
    }
  }
</style>
