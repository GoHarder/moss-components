<script lang="ts" module>
  import '@material/web/fab/branded-fab.js';
  import '@material/web/fab/fab.js';
</script>

<script lang="ts">
  import { type Snippet, onDestroy, onMount } from 'svelte';

  // MARK: Types
  // ------------------------------------------------
  import { type MdFab } from '@material/web/fab/fab.js';
  import { type MdBrandedFab } from '@material/web/fab/branded-fab.js';
  import { setSlots } from '../internal/index.js';

  type MdComp = MdFab | MdBrandedFab;

  type Props = {
    /** The child elements to render. */
    children?: Snippet;
    /** The child elements to render. */
    slotIcon?: Snippet;
    /** The onclick event handler. */
    onclick?: (event: HTMLElementEventMap['click']) => any;
    /** Whether or not the fab is branded. */
    branded?: boolean;
    /** The FAB color variant to render. */
    variant?: MdComp['variant'];
    /**
     * The size of the FAB.
     * NOTE: Branded FABs cannot be sized to small, and Extended FABs do not have different sizes.
     */
    size?: MdComp['size'];
    /** The text to display on the FAB. */
    label?: string;
    /** Lowers the FAB's elevation. */
    lowered?: boolean;
    [key: string]: any;
  };

  // MARK: Properties
  // ------------------------------------------------
  let { children, slotIcon, onclick, branded, ...props }: Props = $props();

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

{#if branded}
  <md-branded-fab bind:this={root} {...props}>
    {@render children?.()}
    {@render slotIcon?.()}
  </md-branded-fab>
{:else}
  <md-fab bind:this={root} {...props}>
    {@render children?.()}
    {@render slotIcon?.()}
  </md-fab>
{/if}
