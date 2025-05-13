<script lang="ts" module>
  import '@material/web/iconbutton/filled-icon-button.js';
  import '@material/web/iconbutton/filled-tonal-icon-button.js';
  import '@material/web/iconbutton/icon-button.js';
  import '@material/web/iconbutton/outlined-icon-button.js';
</script>

<script lang="ts">
  import { type Snippet, onDestroy, onMount } from 'svelte';
  import { setSlots } from '../internal/index.js';

  // MARK: Types
  // ------------------------------------------------
  import type { MdIconButton } from '@material/web/iconbutton/icon-button.js';
  import type { MdFilledIconButton } from '@material/web/iconbutton/filled-icon-button.js';
  import type { MdFilledTonalIconButton } from '@material/web/iconbutton/filled-tonal-icon-button.js';
  import type { MdOutlinedIconButton } from '@material/web/iconbutton/outlined-icon-button.js';
  export type MdComp = MdIconButton | MdFilledIconButton | MdFilledTonalIconButton | MdOutlinedIconButton;

  type Props = {
    /** The child elements to render. */
    children: Snippet;
    /**
     * The slot for a selected icon.
     * @example
     * {#snippet slotSelected()}
     *   <Icon slot="selected">send</Icon>
     * {/snippet}
     */
    slotSelected?: Snippet;
    /** The onclick event handler. */
    onclick?: (event: HTMLElementEventMap['click']) => any;
    /** The variant of the button. */
    variant?: '' | 'filled' | 'tonal' | 'outlined';
    /** Disables the icon button and makes it non-interactive. */
    disabled?: boolean;
    /** Sets the underlying `HTMLAnchorElement`'s `href` resource attribute. */
    href?: string;
    /**
     * Where to display the linked href URL for a link button.
     * Common options include _blank to open in a new tab.
     */
    target?: MdComp['target'];
    /** When true, the button will toggle between selected and unselected states. */
    toggle?: boolean;
    /**
     * Sets the selected state.
     * When false, displays the default icon.
     * When true, displays the selected icon, or the default icon If no `slot="selected"` icon is provided.
     */
    selected?: boolean;
    /** The default behavior of the button. May be "button", "reset", or "submit" */
    type?: MdComp['type'];
    /** The value added to a form with the button's name when the button submits a form. */
    value?: string;
    [key: string]: any;
  };

  // MARK: Properties
  // ------------------------------------------------
  let { children, slotSelected, onclick, variant = '', toggle, selected = $bindable(false), ...props }: Props = $props();

  // MARK: Variables
  // ------------------------------------------------
  let root: MdComp | undefined = $state();

  // MARK: Effects
  // ------------------------------------------------
  $effect.pre(() => {
    setSlots(root);
  });

  // MARK: Events
  // ------------------------------------------------
  function defaultOnClick() {
    if (toggle) selected = !selected;
  }

  // MARK: Lifecycle
  // ------------------------------------------------
  onMount(() => {
    const listener = onclick || defaultOnClick;
    if (!root) return;
    root.addEventListener('click', listener);
  });

  onDestroy(() => {
    const listener = onclick || defaultOnClick;
    if (!root) return;
    root.removeEventListener('click', listener);
  });
</script>

{#if variant === 'filled'}
  <md-filled-icon-button bind:this={root} {toggle} {selected} {...props}>
    {@render slotSelected?.()}
    {@render children()}
  </md-filled-icon-button>
{:else if variant === 'tonal'}
  <md-filled-tonal-icon-button bind:this={root} {toggle} {selected} {...props}>
    {@render slotSelected?.()}
    {@render children()}
  </md-filled-tonal-icon-button>
{:else if variant === 'outlined'}
  <md-outlined-icon-button bind:this={root} {toggle} {selected} {...props}>
    {@render slotSelected?.()}
    {@render children()}
  </md-outlined-icon-button>
{:else}
  <md-icon-button bind:this={root} {toggle} {selected} {...props}>
    {@render slotSelected?.()}
    {@render children()}
  </md-icon-button>
{/if}
