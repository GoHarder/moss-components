<script lang="ts" module>
  import '@material/web/menu/menu-item.js';
</script>

<script lang="ts">
  import { setSlots } from '../internal/index.js';
  import { type Snippet, onDestroy, onMount } from 'svelte';

  // MARK: Types
  // ------------------------------------------------
  import { MdMenuItem } from '@material/web/menu/menu-item.js';

  type Props = {
    /** The child elements to render. */
    children?: Snippet;
    /**
     * The slot for the start of the list item.
     * @example
     * {#snippet slotStart()}
     *   <div slot="start">Start content</div>
     * {/snippet}
     */
    slotStart?: Snippet;
    /**
     * The slot for the end of the list item.
     * @example
     * {#snippet slotEnd()}
     *   <div slot="end">End content</div>
     * {/snippet}
     */
    slotEnd?: Snippet;
    /**
     * The slot for the overline of the list item.
     * @example
     * {#snippet slotOverline()}
     *   <div slot="overline">Overline content</div>
     * {/snippet}
     */
    slotOverline?: Snippet;
    /**
     * The slot for the headline of the list item.
     * @example
     * {#snippet slotHeadline()}
     *   <div slot="headline">Headline content</div>
     * {/snippet}
     */
    slotHeadline?: Snippet;
    /**
     * The slot for the supporting text of the list item.
     * @example
     * {#snippet slotSupportingText()}
     *   <div slot="supporting-text">Supporting text content</div>
     * {/snippet}
     */
    slotSupportingText?: Snippet;
    /**
     * The slot for the trailing supporting text of the list item.
     * @example
     * {#snippet slotTrailingSupportingText()}
     *   <div slot="trailing-supporting-text">Trailing supporting text content</div>
     * {/snippet}
     */
    slotTrailingSupportingText?: Snippet;
    /** The onclick event handler. */
    onclick?: (event: HTMLElementEventMap['click']) => any;
    /** Disables the item and makes it non-selectable and non-interactive. */
    disabled?: boolean;
    /** Sets the behavior and role of the menu item, defaults to "menuitem". */
    type?: MdMenuItem['type'];
    /** Sets the underlying `HTMLAnchorElement`'s `href` resource attribute. */
    href?: string;
    /** Sets the underlying `HTMLAnchorElement`'s `target` attribute when href is set. */
    target?: MdMenuItem['target'];
    /** Keeps the menu open if clicked or keyboard selected. */
    'keep-open'?: boolean;
    /** Sets the item in the selected visual state when a submenu is opened. */
    selected?: boolean;
    [key: string]: any;
  };

  // MARK: Properties
  // ------------------------------------------------
  let {
    // Wrap
    children,
    slotStart,
    slotEnd,
    slotOverline,
    slotHeadline,
    slotSupportingText,
    slotTrailingSupportingText,
    onclick,
    ...props
  }: Props = $props();

  // MARK: Variables
  // ------------------------------------------------
  let root: MdMenuItem | undefined = $state();

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

<md-menu-item bind:this={root} {...props}>
  {@render slotStart?.()}
  {@render slotEnd?.()}
  {@render children?.()}
  {@render slotOverline?.()}
  {@render slotHeadline?.()}
  {@render slotSupportingText?.()}
  {@render slotTrailingSupportingText?.()}
</md-menu-item>
