<script lang="ts" module>
  import '@material/web/button/elevated-button.js';
  import '@material/web/button/filled-button.js';
  import '@material/web/button/filled-tonal-button.js';
  import '@material/web/button/outlined-button.js';
  import '@material/web/button/text-button.js';
</script>

<script lang="ts">
  import { type Snippet, onDestroy, onMount } from 'svelte';
  import { setSlots } from '../internal/index.js';

  // MARK: Types
  // ------------------------------------------------
  import { type MdElevatedButton } from '@material/web/button/elevated-button.js';
  import { type MdFilledButton } from '@material/web/button/filled-button.js';
  import { type MdFilledTonalButton } from '@material/web/button/filled-tonal-button.js';
  import { type MdOutlinedButton } from '@material/web/button/outlined-button.js';
  import { type MdTextButton } from '@material/web/button/text-button.js';
  type MdComp = MdElevatedButton | MdFilledButton | MdFilledTonalButton | MdOutlinedButton | MdTextButton;

  type Props = {
    /** The child elements to render. */
    children: Snippet;
    /**
     * The slot for an icon.
     * @example
     * {#snippet slotIcon()}
     *   <Icon slot="icon">send</Icon>
     * {/snippet}
     */
    slotIcon?: Snippet;
    /** The onclick event handler. */
    onclick?: (event: HTMLElementEventMap['click']) => any;
    /** The variant of the button. */
    variant?: 'elevated' | 'filled' | 'tonal' | 'outlined' | 'text';
    /** Whether or not the button is disabled. */
    disabled?: boolean;
    /**
     * Whether or not the button is "soft-disabled" (disabled but still focusable).
     * Use this when a button needs increased visibility when disabled.
     * See [W3C](https://www.w3.org/WAI/ARIA/apg/practices/keyboard-interface/#kbd_disabled_controls) for more guidance on when this is needed.
     */
    'soft-disabled'?: boolean;
    /** The URL that the link button points to. */
    href?: string;
    /**
     * Where to display the linked href URL for a link button.
     * Common options include _blank to open in a new tab.
     */
    target?: MdComp['target'];
    /**
     * Whether to render the icon at the inline end of the label rather than the inline start.
     *
     * NOTE: Link buttons cannot have trailing icons.
     */
    'trailing-icon'?: boolean;
    /** Whether to display the icon or not. */
    'has-icon'?: boolean;
    /** The default behavior of the button. May be "button", "reset", or "submit" (default). */
    type?: 'button' | 'submit' | 'reset';
    /** The value added to a form with the button's name when the button submits a form. */
    value?: string;
    [key: string]: any;
  };

  // MARK: Properties
  // ------------------------------------------------
  let { children, slotIcon, onclick, variant = 'text', ...props }: Props = $props();

  // MARK: Variables
  // ------------------------------------------------
  let root: MdComp | undefined = $state();

  // MARK: Effects
  // ------------------------------------------------
  $effect.pre(() => {
    setSlots(root);
  });

  // MARK: Lifecycle
  // ------------------------------------------------
  onMount(() => {
    if (!root || !onclick) return;
    root.addEventListener('click', onclick);
  });

  onDestroy(() => {
    if (!root || !onclick) return;
    root.removeEventListener('click', onclick);
  });
</script>

{#if variant === 'elevated'}
  <md-elevated-button bind:this={root} {...props}>
    {@render slotIcon?.()}
    {@render children()}
  </md-elevated-button>
{:else if variant === 'filled'}
  <md-filled-button bind:this={root} {...props}>
    {@render slotIcon?.()}
    {@render children()}
  </md-filled-button>
{:else if variant === 'tonal'}
  <md-filled-tonal-button bind:this={root} {...props}>
    {@render slotIcon?.()}
    {@render children()}
  </md-filled-tonal-button>
{:else if variant === 'outlined'}
  <md-outlined-button bind:this={root} {...props}>
    {@render slotIcon?.()}
    {@render children()}
  </md-outlined-button>
{:else}
  <md-text-button bind:this={root} {...props}>
    {@render slotIcon?.()}
    {@render children()}
  </md-text-button>
{/if}
