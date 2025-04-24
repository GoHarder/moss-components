<script lang="ts">
  // MARK: Types
  // ------------------------------------------------
  // MARK: Components
  // ------------------------------------------------
  import Section from './custom/section.svelte';
  import Hero from './custom/hero.svelte';
  import CodeBlock from './custom/code-block.svelte';
  import { Elevation } from '$lib/elevation/index.js';

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

<Section bind:expand plain>
  {#snippet header()}
    <h2>Elevations</h2>
  {/snippet}

  {#snippet supportingText()}
    <p>Elevation is the relative distance between two surfaces along the z-axis.</p>
  {/snippet}

  {#snippet hero()}
    <Hero>
      <div class="surface hero">
        <Elevation />
        <p>Primary Container</p>
      </div>
    </Hero>
  {/snippet}

  {#if expand}
    <div class="types elevated-card">
      <Elevation />
      <h3>Usage</h3>
      <div class="examples">
        <div>
          <div class="surface usage">
            <Elevation />
            <p>Secondary Container</p>
          </div>
          <CodeBlock lang="svelte">
            {`<div class="surface">
  <Elevation />
  <p>Secondary Container</p>
</div>`}
          </CodeBlock>
          <CodeBlock lang="css">
            {`.surface {
  --md-elevation-level: 3;
  position: relative;
  width: 100px;
  height: 100px;
  border-radius: 4px;
}`}
          </CodeBlock>
        </div>
        <div class="filled-card">
          <h4>Animation</h4>
          <div class="surface animation">
            <Elevation />
            <p>Tertiary Container</p>
          </div>
          <CodeBlock lang="css">
            {`.surface {
  --md-elevation-level: 3;
  position: relative;
  width: 100px;
  height: 100px;
  border-radius: 4px;
}

.surface:active {
  --md-elevation-level: 0;
}`}
          </CodeBlock>
        </div>
      </div>
    </div>

    <div class="types elevated-card">
      <Elevation />
      <h3>Theming</h3>

      <div class="surface theming">
        <Elevation />
      </div>
      <CodeBlock lang="css">
        {`.fancy {
  --md-elevation-level: 5;
  --md-sys-color-shadow: #006a6a;
}`}
      </CodeBlock>
    </div>
  {/if}
</Section>

<style>
  .hero {
    --md-elevation-level: 3;
    background-color: var(--md-sys-color-primary-container);
    color: var(--md-sys-color-on-primary-container);
    display: flex;
    align-items: center;
    text-align: center;
  }

  .usage {
    --md-elevation-level: 3;
    background-color: var(--md-sys-color-secondary-container);
    color: var(--md-sys-color-on-secondary-container);
    display: flex;
    align-items: center;
    text-align: center;
  }

  .animation {
    --md-elevation-level: 3;
    background-color: var(--md-sys-color-tertiary-container);
    color: var(--md-sys-color-on-tertiary-container);
    display: flex;
    align-items: center;
    text-align: center;
  }

  .theming {
    --md-elevation-level: 5;
    --md-sys-color-shadow: #006a6a;
  }

  .surface {
    position: relative;
    width: 100px;
    height: 100px;
    border-radius: var(--md-sys-shape-corner-small);
    transition-duration: 250ms;
    transition-timing-function: ease-in-out;
  }

  .animation:active {
    --md-elevation-level: 0;
  }

  .examples {
    margin-block-start: 16px;
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
    align-items: flex-start;
  }
</style>
