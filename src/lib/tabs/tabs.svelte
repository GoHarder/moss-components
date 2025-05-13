<script lang="ts" module>
  import '@material/web/tabs/tabs.js';
</script>

<script lang="ts">
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

  // MARK: Properties
  // ------------------------------------------------
  let { children, index: activeTabIndex = $bindable(undefined), ...props }: Props = $props();

  // MARK: Variables
  // ------------------------------------------------
  let root: MdTabs | undefined = $state();

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
