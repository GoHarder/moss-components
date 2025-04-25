<script lang="ts" module>
  import { type ComponentSettings } from '../internal/index.js';
  let context = false;
  let reducedMotion: boolean | undefined;
  let settings: ComponentSettings['select'] | undefined;
</script>

<script lang="ts">
  import '@material/web/select/filled-select.js';
  import '@material/web/select/outlined-select.js';
  import { type Snippet, getContext, onDestroy, onMount } from 'svelte';

  // MARK: Types
  // ------------------------------------------------

  import { type MdFilledSelect } from '@material/web/select/filled-select.js';
  import { type MdOutlinedSelect } from '@material/web/select/outlined-select.js';

  type MdComp = MdFilledSelect | MdOutlinedSelect;

  type Props = {
    /** The child elements to render. */
    children?: Snippet;
    outlined?: boolean;
    /** Opens the menu synchronously with no animation. */
    quick?: boolean;
    /** Whether or not the select is required. */
    required?: boolean;
    /**
     * The error message that replaces supporting text when `error` is true.
     * If `errorText` is an empty string, then the supporting text will continue to show.
     * This error message overrides the error message displayed by `reportValidity()`.
     */
    'error-text'?: string;
    /** The floating label for the field. */
    label?: string;
    /** Disables the asterisk on the floating label, when the select is required. */
    'no-asterisk'?: boolean;
    /** Conveys additional information below the select, such as how it should be used. */
    'supporting-text'?: string;
    /**
     * Gets or sets whether or not the select is in a visually invalid state.
     * This error state overrides the error state controlled by `reportValidity()`.
     */
    error?: boolean;
    /**
     * Whether or not the underlying md-menu should be `position: fixed` to display in a
     * top-level manner, or `position: absolute`.
     * `position:fixed` is useful for cases where select is inside of another element with
     * stacking context and hidden overflows such as `md-dialog`.
     */
    'menu-positioning'?: MdComp['menuPositioning'];
    /** Clamps the menu-width to the width of the select. */
    'clamp-menu-width'?: boolean;
    /**
     * The max time between the keystrokes of the typeahead select / menu behavior before it
     * clears the typeahead buffer.
     */
    'typeahead-delay'?: number;
    /**
     * Whether or not the text field has a leading icon.
     * Used for SSR.
     */
    'has-leading-icon'?: boolean;
    /**
     * Text to display in the field.
     * Only set for SSR.
     */
    'display-text'?: string;
    /** Whether the menu should be aligned to the start or the end of the select's textbox. */
    'menu-align'?: MdComp['menuAlign'];
    value?: string | number;
    type?: 'string' | 'number';
    disabled?: boolean;
    options?: any[];
    selected?: any;
    [key: string]: any;
  };

  // MARK: Properties
  // ------------------------------------------------
  let {
    // Wrap
    children,
    value = $bindable(),
    type = 'string',
    quick,
    'no-asterisk': noAsterisk,
    outlined,
    options = [],
    selected = $bindable(),
    ...props
  }: Props = $props();

  // MARK: Variables
  // ------------------------------------------------
  let root: MdComp | undefined = $state();

  // MARK: Contexts
  // ------------------------------------------------
  if (!context) {
    reducedMotion = getContext('ReducedMotion');
    settings = getContext<ComponentSettings>('ComponentSettings')?.select;
  }

  if (settings) {
    noAsterisk = settings.noAsterisk;
    outlined = settings.variant === 'outlined' || outlined;
  }

  // MARK: Events
  // ------------------------------------------------
  async function onchange(_event: Event) {
    if (!root) return;
    await root.getUpdateComplete();

    if (type === 'number') {
      value = Number(root.value);
    } else {
      value = root.value;
    }

    selected = options.at(root.selectedIndex);
  }

  // MARK: Lifecycle
  // ------------------------------------------------
  onMount(() => {
    if (reducedMotion) quick = true;
    if (!root) return;
    root.addEventListener('change', onchange);
    if (!value) return;
    selected = options.at(root.selectedIndex);
  });

  onDestroy(() => {
    if (!root) return;
    root.removeEventListener('change', onchange);
  });
</script>

{#if outlined}
  <md-outlined-select bind:this={root} no-asterisk={noAsterisk} {quick} value={`${value}`} {...props}>
    {@render children?.()}
  </md-outlined-select>
{:else}
  <md-filled-select bind:this={root} no-asterisk={noAsterisk} {quick} value={`${value}`} {...props}>
    {@render children?.()}
  </md-filled-select>
{/if}
