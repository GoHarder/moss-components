<script lang="ts">
  import '@material/web/list/list-item.js';
  import { type Snippet, onDestroy, onMount } from 'svelte';
  import { setSlots } from '../internal/index.js';

  // MARK: Types
  // ------------------------------------------------
  import { type MdListItem } from '@material/web/list/list-item.js';

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
    /** Disables the item and makes it non-selectable and non-interactive. */
    disabled?: boolean;
    /**
     * Sets the behavior of the list item, defaults to "text".
     * Change to "link" or "button" for interactive items.
     */
    type?: MdListItem['type'];
    /** Sets the underlying `HTMLAnchorElement`'s `href` resource attribute. */
    href?: string;
    /** Sets the underlying `HTMLAnchorElement`'s `target` attribute when `href` is set. */
    target?: MdListItem['target'];
    /** The onclick event handler. */
    onclick?: (event: HTMLElementEventMap['click']) => any;
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
    type = 'text',
    ...props
  }: Props = $props();

  // MARK: Variables
  // ------------------------------------------------
  let root: MdListItem | undefined = $state();

  // MARK: Effects
  // ------------------------------------------------
  $effect.pre(() => {
    setSlots(root);
  });

  // MARK: Lifecycle
  // ------------------------------------------------
  onMount(() => {
    if (!root || !onclick || type !== 'button') return;
    root.addEventListener('click', onclick);
  });

  onDestroy(() => {
    if (!root || !onclick || type !== 'button') return;
    root.removeEventListener('click', onclick);
  });
</script>

<md-list-item bind:this={root} {type} {...props}>
  {@render slotStart?.()}
  {@render slotEnd?.()}
  {@render children?.()}
  {@render slotOverline?.()}
  {@render slotHeadline?.()}
  {@render slotSupportingText?.()}
  {@render slotTrailingSupportingText?.()}
</md-list-item>
