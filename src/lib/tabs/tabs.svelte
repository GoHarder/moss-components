<script lang="ts">
  import '@material/web/tabs/tabs.js';

  // MARK: Types
  // ------------------------------------------------
  import { type Snippet, onDestroy, onMount } from 'svelte';
  import { type MdTabs } from '@material/web/tabs/tabs.js';

  type Props = {
    /** The child elements to render. */
    children: Snippet;
    /** Whether or not to automatically select a tab when it is focused. */
    'auto-activate'?: boolean;
    index?: number;
    [key: string]: any;
  };

  // MARK: Components
  // ------------------------------------------------
  // MARK: Stores
  // ------------------------------------------------
  // MARK: Properties
  // ------------------------------------------------
  let { children, index: activeTabIndex = $bindable(undefined), ...props }: Props = $props();

  // MARK: Methods
  // ------------------------------------------------
  // MARK: Constants
  // ------------------------------------------------
  // MARK: Variables
  // ------------------------------------------------
  let root: MdTabs | undefined = $state();

  // MARK: Contexts
  // ------------------------------------------------
  // MARK: Subscriptions
  // ------------------------------------------------
  // MARK: Reactive Rules
  // ------------------------------------------------
  // MARK: Events
  // ------------------------------------------------
  function onchange(_event: Event) {
    if (!root) return;
    activeTabIndex = root.activeTabIndex;
  }

  // MARK: Lifecycle
  // ------------------------------------------------
  onMount(() => {
    if (!root) return;
    root.addEventListener('change', onchange);
  });

  onDestroy(() => {
    if (!root) return;
    root.removeEventListener('change', onchange);
  });
</script>

<md-tabs bind:this={root} {...props}>
  {@render children()}
</md-tabs>
