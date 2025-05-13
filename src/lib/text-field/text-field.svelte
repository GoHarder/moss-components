<script lang="ts" module>
  import '@material/web/textfield/filled-text-field.js';
  import '@material/web/textfield/outlined-text-field.js';

  import { type ComponentSettings } from '../internal/index.js';
  let context = false;
  let settings: ComponentSettings['textField'] | undefined;
</script>

<script lang="ts">
  import { type Snippet, getContext } from 'svelte';

  import { debounce, setSlots } from '../internal/index.js';

  // MARK: Types
  // ------------------------------------------------
  import { type MdFilledTextField } from '@material/web/textfield/filled-text-field.js';
  import { type MdOutlinedTextField } from '@material/web/textfield/outlined-text-field.js';

  type MdComp = MdFilledTextField | MdOutlinedTextField;

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
    /** The current value of the text field. It is always a string. */
    value?: string;
    /** An optional prefix to display before the input value. */
    'prefix-text'?: string;
    /** An optional suffix to display after the input value. */
    'suffix-text'?: string;
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
     * The number of rows to display for a `type="textarea"` text field.
     * Defaults to 2.
     */
    rows?: number;
    /**
     * The number of cols to display for a `type="textarea"` text field.
     * Defaults to 20.
     */
    cols?: number;
    /**
     * The `inputmode` global attribute is an enumerated attribute that hints at the type of
     * data that might be entered by the user while editing the element or its contents.
     */
    inputmode?: 'none' | 'text' | 'decimal' | 'numeric' | 'tel' | 'search' | 'email' | 'url';
    /**
     * Defines the greatest value in the range of permitted values.
     *
     * [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#max)
     */
    max?: string;
    /**
     * The maximum number of characters a user can enter into the text field.
     * Set to -1 for none.
     *
     * [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#maxlength)
     */
    maxlength?: number;
    /**
     * Defines the most negative value in the range of permitted values.
     *
     * [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#min)
     */
    min?: string;
    /**
     * The minimum number of characters a user can enter into the text field.
     * Set to -1 for none.
     *
     * [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#minlength)
     */
    minlength?: number;
    /** When true, hide the spinner for `type="number"` text fields. */
    'no-spinner'?: boolean;
    /**
     * A regular expression that the text field's value must match to pass constraint validation.
     *
     * [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#pattern)
     */
    pattern?: string;
    /**
     * Defines the text displayed in the textfield when it has no value.
     * Provides a brief hint to the user as to the expected type of data that should be entered
     * into the control.
     * Unlike label, the placeholder is not visible and does not float when the textfield has
     * a value.
     *
     * [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/placeholder)
     */
    placeholder?: string;
    /**
     * Indicates whether or not a user should be able to edit the text field's value.
     *
     * [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#readonly)
     */
    readonly?: boolean;
    /**
     * Indicates that input accepts multiple email addresses.
     *
     * [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/email#multiple)
     */
    multiple?: boolean;
    /**
     * Returns or sets the element's step attribute, which works with min and max to limit the
     * increments at which a numeric or date-time value can be set.
     *
     * [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#step)
     */
    step?: string;
    /**
     * The `<input>` type to use, defaults to "text".
     * The type greatly changes how the text field behaves.
     *
     * Text fields support a limited number of `<input>` types:
     * - text
     * - textarea
     * - email
     * - number
     * - password
     * - search
     * - tel
     * - url
     *
     * See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#input_types)
     * for more details on each input type.
     */
    type?: MdComp['type'];
    /**
     * Describes what, if any, type of autocomplete functionality the input should provide.
     *
     * [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete)
     */
    autocomplete?: MdComp['autocomplete'];
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

  // MARK: Variables
  // ------------------------------------------------
  let root: MdComp | undefined = $state();

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
    value = root.value;
  }, 1500);
</script>

{#if outlined}
  <md-outlined-text-field bind:this={root} no-spinner={noSpinner} no-asterisk={noAsterisk} {oninput} {value} {...props}>
    {@render children?.()}
    {@render slotLeadingIcon?.()}
    {@render slotTrailingIcon?.()}
  </md-outlined-text-field>
{:else}
  <md-filled-text-field bind:this={root} no-spinner={noSpinner} no-asterisk={noAsterisk} {oninput} {value} {...props}>
    {@render children?.()}
    {@render slotLeadingIcon?.()}
    {@render slotTrailingIcon?.()}
  </md-filled-text-field>
{/if}
