<script lang="ts">
  // MARK: Types
  // ------------------------------------------------
  // MARK: Components
  // ------------------------------------------------
  import Section from './custom/section.svelte';
  import Hero from './custom/hero.svelte';
  import CodeBlock from './custom/code-block.svelte';
  import { Elevation } from '$lib/elevation/index.js';
  import { FocusRing } from '$lib/focus/index.js';

  // MARK: Stores
  // ------------------------------------------------
  // MARK: Properties
  // ------------------------------------------------
  // MARK: Methods
  // ------------------------------------------------
  // MARK: Constants
  // ------------------------------------------------
  // MARK: Variables
  // ------------------------------------------------
  let debug = $state(false);
  let expand = $state(false);

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

<Section bind:expand bind:debug>
  {#snippet header()}
    <h2>Focus rings</h2>
  {/snippet}

  {#snippet supportingText()}
    <p>Focus rings are accessible outlines for components to show keyboard focus.</p>
  {/snippet}

  {#snippet hero()}
    <Hero class="focus-ring-hero">
      <button aria-label="1">
        <FocusRing />
      </button>
      <button aria-label="2">
        <FocusRing />
      </button>
      <button aria-label="3">
        <FocusRing />
      </button>
    </Hero>
  {/snippet}

  {#if expand}
    <div class="usage elevated-card">
      <Elevation />
      <h3>Usage</h3>
      <button aria-label="4">
        <FocusRing />
      </button>
      <CodeBlock lang="svelte">
        {`<button>
  <FocusRing />
</button>`}
      </CodeBlock>
      <div class="examples">
        <div class="filled-card">
          <h4>Inward</h4>
          <button aria-label="5">
            <FocusRing inward />
          </button>
          <CodeBlock lang="svelte">
            {`<button>
  <FocusRing inward />
</button>`}
          </CodeBlock>
        </div>
        <div class="filled-card">
          <h4>Animation</h4>
          <button aria-label="6">
            <FocusRing class="focus-ring-animation" />
          </button>
          <CodeBlock lang="css">
            {`md-focus-ring {
  /* disabled animation */
  --md-focus-ring-duration: 0s; 
}`}
          </CodeBlock>
        </div>
      </div>
    </div>

    <div class="theming elevated-card">
      <Elevation />
      <h3>Theming</h3>
      <button aria-label="7">
        <FocusRing class="focus-ring" />
      </button>
      <CodeBlock lang="css">
        {`md-focus-ring {
  --md-focus-ring-shape: 0px;
  --md-focus-ring-width: 2px;
  --md-focus-ring-active-width: 4px;
  --md-sys-color-secondary: #4a6363;
}`}
      </CodeBlock>
    </div>
  {/if}
</Section>

<style lang="scss">
  :global(.focus-ring-hero) {
    display: flex;
    gap: 16px;
  }

  button {
    --md-focus-ring-shape: var(--md-sys-shape-corner-medium);
    position: relative;
    width: 80px;
    height: 80px;
    border-radius: var(--md-sys-shape-corner-medium);

    background-color: transparent;
    border-radius: var(--md-sys-shape-corner-medium);
    border-color: var(--md-sys-color-outline);
    border-width: 1px;
    border-style: solid;
    padding: 16px;
  }

  :global(.focus-ring-animation) {
    --md-focus-ring-duration: 0s;
  }

  .examples {
    margin-block-start: 16px;
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
    align-items: flex-start;
  }

  .theming {
    :global(.focus-ring) {
      --md-focus-ring-shape: 0px;
      --md-focus-ring-width: 2px;
      --md-focus-ring-active-width: 4px;
      --md-sys-color-secondary: #4a6363;
    }
  }
</style>
