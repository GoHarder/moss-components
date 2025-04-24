<script lang="ts">
  import '@material/web/select/select-option.js';
  import { setSlots } from '../internal/index.js';

  // MARK: Types
  // ------------------------------------------------
  import { type Snippet } from 'svelte';
  import { type MdSelectOption } from '@material/web/select/select-option.js';

  type Props = {
    /** The child elements to render. */
    children?: Snippet;
    /**
     * The slot for the start of the list item.
     * @example
     * {#snippet slotStart()}
     *   <img slot="start" alt="" src="..." />
     * {/snippet}
     */
    slotStart?: Snippet;
    /**
     * The slot for the end of the list item.
     * @example
     * {#snippet slotEnd()}
     *   <Icon slot="end">more_horiz</Icon>
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
    [key: string]: any;
  };

  // MARK: Properties
  // ------------------------------------------------
  let { children, slotStart, slotEnd, slotOverline, slotHeadline, slotSupportingText, slotTrailingSupportingText, ...props }: Props = $props();

  // MARK: Variables
  // ------------------------------------------------
  let root: MdSelectOption | undefined = $state();

  // MARK: Effects
  // ------------------------------------------------
  $effect.pre(() => {
    setSlots(root);
  });
</script>

<md-select-option bind:this={root} {...props}>
  {@render children?.()}
  {@render slotStart?.()}
  {@render slotEnd?.()}
  {@render slotOverline?.()}
  {@render slotHeadline?.()}
  {@render slotSupportingText?.()}
  {@render slotTrailingSupportingText?.()}
</md-select-option>
