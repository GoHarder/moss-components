<script lang="ts" module>
  import '@material/web/chips/assist-chip.js';
</script>

<script lang="ts">
  import { type Snippet, onDestroy, onMount } from 'svelte';
  import { setSlots } from '../internal/index.js';

  // MARK: Types
  // ------------------------------------------------
  import { type MdAssistChip } from '@material/web/chips/assist-chip.js';

  type Props = {
    /** The child elements to render. */
    children?: Snippet;
    /**
     * The slot for the icon of the chip.
     * @example
     * {#snippet slotIcon()}
     *   <Icon slot="icon">send</Icon>
     * {/snippet}
     */
    slotIcon?: Snippet;
    /** The onclick event handler. */
    onclick?: (event: HTMLElementEventMap['click']) => any;
    elevated?: boolean;
    href?: string;
    target?: MdAssistChip['target'];
    /**
     * Whether or not the chip is disabled.
     * Disabled chips are not focusable, unless always-focusable is set.
     */
    disabled?: boolean;
    /**
     * Whether or not the chip is "soft-disabled" (disabled but still focusable).
     * Use this when a chip needs increased visibility when disabled.
     * See [W3C](https://www.w3.org/WAI/ARIA/apg/practices/keyboard-interface/#kbd_disabled_controls) for more guidance on when this is needed.
     */
    'soft-disabled'?: boolean;
    /**
     * When true, allow disabled chips to be focused with arrow keys.
     * Add this when a chip needs increased visibility when disabled.
     * See [W3C](https://www.w3.org/WAI/ARIA/apg/practices/keyboard-interface/#kbd_disabled_controls) for more guidance on when this is needed.
     */
    'always-focusable'?: boolean;
    /** The label of the chip. */
    label: string;
    /**
     * Only needed for SSR.
     * Add this attribute when a chip has a slot="icon" to avoid a flash of unstyled content.
     */
    'has-icon'?: boolean;
    [key: string]: any;
  };

  // MARK: Properties
  // ------------------------------------------------
  let { children, slotIcon, onclick, ...props }: Props = $props();

  // MARK: Variables
  // ------------------------------------------------
  let root: MdAssistChip | undefined = $state();

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

<md-assist-chip bind:this={root} {...props}>
  {@render children?.()}
  {@render slotIcon?.()}
</md-assist-chip>
