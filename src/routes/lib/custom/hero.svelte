<script lang="ts">
  // MARK: Types
  // ------------------------------------------------
  import { type Snippet } from 'svelte';

  type Props = {
    children: Snippet;
    class?: string;
  };

  // MARK: Components
  // ------------------------------------------------
  import { Elevation } from '$lib/elevation/index.js';

  // MARK: Properties
  // ------------------------------------------------
  let { children, class: propClass, ...props }: Props = $props();

  // MARK: Methods
  // ------------------------------------------------
  // MARK: Constants
  // ------------------------------------------------
  // MARK: Variables
  // ------------------------------------------------
  // MARK: Contexts
  // ------------------------------------------------
  // MARK: Subscriptions
  // ------------------------------------------------
  // MARK: Reactive Rules
  // ------------------------------------------------
  // MARK: Events
  // ------------------------------------------------
  // MARK: Lifecycle
  // ------------------------------------------------
</script>

<div class={['base', propClass]}>
  <Elevation />
  {@render children()}
</div>

<style>
  .base {
    --md-elevation-level: 1;
    position: relative;
    background-color: var(--md-sys-color-surface-container-low);
    border-radius: var(--md-sys-shape-corner-medium);
    padding: 16px;
  }
</style>
