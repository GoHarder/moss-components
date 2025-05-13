<script lang="ts" module>
  import '@material/web/tabs/primary-tab.js';
  import '@material/web/tabs/secondary-tab.js';
</script>

<script lang="ts">
  import { setSlots } from '../internal/index.js';

  // MARK: Types
  // ------------------------------------------------
  import { type Snippet } from 'svelte';
  import { type MdPrimaryTab } from '@material/web/tabs/primary-tab.js';
  import { type MdSecondaryTab } from '@material/web/tabs/secondary-tab.js';

  type MdComp = MdPrimaryTab | MdSecondaryTab;

  type Props = {
    /** The child elements to render. */
    children?: Snippet;
    /**
     * The slot for an icon.
     * @example
     * {#snippet slotIcon()}
     *   <Icon slot="icon">send</Icon>
     * {/snippet}
     */
    slotIcon?: Snippet;
    /** Render a secondary tab. */
    secondary?: boolean;
    /**
     * Whether or not the icon renders inline with label or stacked vertically.
     * (primary tabs only)
     */
    'inline-icon'?: boolean;
    /**
     * The attribute md-tab indicates that the element is a tab for the parent element,
     * `<md-tabs>`. Make sure if you're implementing your own `md-tab` component that you
     * have an `md-tab` attribute set.
     */
    'md-tab'?: boolean;
    /** Whether or not the tab is selected. */
    active?: boolean;
    /** In SSR, set this to true when an icon is present. */
    'has-icon'?: boolean;
    /** In SSR, set this to true when there is no label and only an icon. */
    'icon-only'?: boolean;
    selected?: boolean;
    [key: string]: any;
  };

  // MARK: Properties
  // ------------------------------------------------
  let { children, slotIcon, secondary = false, ...props }: Props = $props();

  // MARK: Methods
  // ------------------------------------------------
  // MARK: Constants
  // ------------------------------------------------
  // MARK: Variables
  // ------------------------------------------------
  let root: MdComp | undefined = $state();

  // MARK: Contexts
  // ------------------------------------------------
  // MARK: Subscriptions
  // ------------------------------------------------
  // MARK: Reactive Rules
  // ------------------------------------------------

  // MARK: Effects
  // ------------------------------------------------
  $effect.pre(() => {
    setSlots(root);
  });

  // MARK: Events
  // ------------------------------------------------
  // MARK: Lifecycle
  // ------------------------------------------------
</script>

{#if !secondary}
  <md-primary-tab bind:this={root} {...props}>
    {@render children?.()}
    {@render slotIcon?.()}
  </md-primary-tab>
{:else}
  <md-secondary-tab bind:this={root} {...props}>
    {@render children?.()}
    {@render slotIcon?.()}
  </md-secondary-tab>
{/if}
