<script lang="ts" module>
  import { type ComponentSettings } from '../internal/index.js';
  let context = false;
  let settings: ComponentSettings['textField'] | undefined;
</script>

<script lang="ts">
  import { type Snippet, getContext } from 'svelte';
  import '../internal/text-field/filled-length-field.js';
  import '../internal/text-field/outlined-length-field.js';
  import { debounce, round, setSlots } from '../internal/index.js';

  // MARK: Types
  // ------------------------------------------------
  import { type MdFilledLengthField } from '../internal/text-field/filled-length-field.js';
  import { type MdOutlinedLengthField } from '../internal/text-field/outlined-length-field.js';

  type MdComp = MdFilledLengthField | MdOutlinedLengthField;

  type Props = {
    /** The child elements to render. */
    children?: Snippet;
    /**
     * The slot for a leading icon.
     * @example
     * {#snippet slotLeadingIcon()}
     *   <Icon slot="icon">send</Icon>
     * {/snippet}
     */
    slotLeadingIcon?: Snippet;
    /**
     * The slot for a trailing icon.
     * @example
     * {#snippet slotTrailingIcon()}
     *   <Icon slot="icon">open_in_new</Icon>
     * {/snippet}
     */
    slotTrailingIcon?: Snippet;
    /** The event handler for the `blur` event. */
    onblur?: (event: FocusEvent) => any;
    /** The event handler for the `focus` event. */
    onfocus?: (event: FocusEvent) => any;
    /** Render an outlined text field. */
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
    /**
     * Whether or not the text field has a leading icon.
     * Used for SSR.
     */
    'has-leading-icon'?: boolean;
    /**
     * Whether or not the text field has a trailing icon.
     * Used for SSR.
     */
    'has-trailing-icon'?: boolean;
    /** Conveys additional information below the text field, such as how it should be used. */
    'supporting-text'?: string;
    /**
     * Override the input text CSS `direction`.
     * Useful for RTL languages that use LTR notation for fractions.
     */
    'text-direction'?: string;
    /**
     * The `inputmode` global attribute is an enumerated attribute that hints at the type of
     * data that might be entered by the user while editing the element or its contents.
     */
    inputmode?: 'none' | 'decimal' | 'numeric';
    /** When true, hide the spinner for `type="number"` text fields. */
    'no-spinner'?: boolean;
    /**
     * Indicates whether or not a user should be able to edit the text field's value.
     *
     * [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#readonly)
     */
    readonly?: boolean;
    disabled?: boolean;
    [key: string]: any;
  };

  // MARK: Properties
  // ------------------------------------------------
  let {
    // Wrap
    children,
    slotLeadingIcon,
    slotTrailingIcon,
    outlined = false,
    'no-asterisk': noAsterisk,
    'no-spinner': noSpinner,
    value = $bindable(),
    ...props
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

  // MARK: Variables
  // ------------------------------------------------
  let root: MdComp | undefined = $state();

  // MARK: State
  // ------------------------------------------------
  let inputFt: HTMLInputElement | undefined = $state();
  let inputIn: HTMLInputElement | undefined = $state();

  // MARK: Derived Values
  // ------------------------------------------------
  let displayValueFt = $derived(valueFt(value));
  let displayValueIn = $derived(valueIn(value));

  let derivedProps = $derived({
    'value-ft': displayValueFt,
    'value-in': displayValueIn,
    'no-asterisk': noAsterisk,
    'no-spinner': noSpinner,
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

  // MARK: Effects
  // ------------------------------------------------
  $effect.pre(() => {
    setSlots(root);
  });

  // MARK: Events
  // ------------------------------------------------
  const oninput = debounce(() => {
    if (!root) return;
    const ftValue = isNaN(root.valueFtAsNumber) ? 0 : root.valueFtAsNumber;
    const inValue = isNaN(root.valueInAsNumber) ? 0 : root.valueInAsNumber;
    value = round(ftValue * 12 + inValue, 0.125);
  }, 1500);
</script>

{#if outlined}
  <md-outlined-length-field bind:this={root} {oninput} {...derivedProps} {...props}>
    {@render children?.()}
    {@render slotLeadingIcon?.()}
    {@render slotTrailingIcon?.()}
  </md-outlined-length-field>
{:else}
  <md-filled-length-field bind:this={root} {oninput} {...derivedProps} {...props}>
    {@render children?.()}
    {@render slotLeadingIcon?.()}
    {@render slotTrailingIcon?.()}
  </md-filled-length-field>
{/if}
