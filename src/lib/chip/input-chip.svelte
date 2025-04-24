<script lang="ts">
  import '@material/web/chips/input-chip.js';
  import { type Snippet, onDestroy, onMount } from 'svelte';
  import { setSlots } from '../internal/index.js';

  // MARK: Types
  // ------------------------------------------------
  import { type MdInputChip } from '@material/web/chips/input-chip.js';

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
    avatar?: boolean;
    href?: string;
    target?: MdInputChip['target'];
    'remove-only'?: boolean;
    selected?: boolean;
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
  let { children, slotIcon, selected = $bindable(false), ...props }: Props = $props();

  // MARK: Variables
  // ------------------------------------------------
  let root: MdInputChip | undefined = $state();

  // MARK: Effects
  // ------------------------------------------------
  $effect.pre(() => {
    setSlots(root);
  });

  // MARK: Events
  // ------------------------------------------------
  function defaultOnClick() {
    if (!root) return;
    selected = !selected;
  }

  function onRemove() {
    selected = false;
  }

  // MARK: Lifecycle
  // ------------------------------------------------
  onMount(() => {
    if (!root) return;
    root.addEventListener('click', defaultOnClick);
    root.addEventListener('remove', onRemove);
  });

  onDestroy(() => {
    if (!root) return;
    root.removeEventListener('click', defaultOnClick);
    root.removeEventListener('remove', onRemove);
  });
</script>

<md-input-chip bind:this={root} {selected} {...props}>
  {@render children?.()}
  {@render slotIcon?.()}
</md-input-chip>
