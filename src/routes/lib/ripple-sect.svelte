<script lang="ts">
  // MARK: Types
  // ------------------------------------------------
  // MARK: Components
  // ------------------------------------------------
  import Section from './custom/section.svelte';
  import Hero from './custom/hero.svelte';
  import CodeBlock from './custom/code-block.svelte';
  import { Elevation } from '$lib/elevation/index.js';
  import { Ripple } from '$lib/ripple/index.js';

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
    <h2>Ripples</h2>
  {/snippet}

  {#snippet supportingText()}
    <div>
      <p>Ripples are state layers used to communicate the status of a component or interactive element.</p>
      <p>A state layer is a semi-transparent covering on an element that indicates its state.</p>
      <p>A layer can be applied to an entire element or in a circular shape.</p>
    </div>
  {/snippet}

  {#snippet hero()}
    <Hero class="ripple-hero">
      <div class="container">
        <Ripple />
      </div>
      <div class="unbounded">
        <Ripple class="ripple" />
      </div>
    </Hero>
  {/snippet}

  {#if expand}
    <div class="usage elevated-card">
      <Elevation />
      <h3>Usage</h3>
      <div class="container">
        <Ripple />
      </div>
      <CodeBlock lang="svelte">
        {`<div class="container">
  <Ripple />
</div>`}
      </CodeBlock>

      <CodeBlock lang="css">
        {`.container {
  position: relative;
}`}
      </CodeBlock>

      <div class="icon filled-card">
        <h4>Unbounded</h4>
        <div class="unbounded">
          <Ripple class="ripple" />
        </div>

        <CodeBlock lang="css">
          {`.container {
  border-radius: 50%;
  height: 32px;
  width: 32px;

  /* Needed for unbounded ripple */
  display: flex;
  place-content: center;
  place-items: center;
  position: relative;
}

md-ripple.unbounded {
  /* Needed for unbounded ripple */
  border-radius: 50%;
  inset: unset;
  height: 64px;
  width: 64px;
}`}
        </CodeBlock>
      </div>
    </div>
    <div class="usage elevated-card">
      <Elevation />
      <h3>Theming</h3>
      <div class="container custom">
        <Ripple />
      </div>

      <CodeBlock lang="css">
        {`:root {
  --md-sys-color-primary: #006A6A;
  --md-ripple-hover-color: var(--md-sys-color-primary);
  --md-ripple-pressed-color: var(--md-sys-color-primary);
}`}
      </CodeBlock>
    </div>
  {/if}
</Section>

<style lang="scss">
  :global(.ripple-hero) {
    display: flex;
    gap: 16px;
  }

  .container {
    --md-focus-ring-shape: var(--md-sys-shape-corner-medium);
    position: relative;
    width: 80px;
    height: 80px;
    background-color: transparent;
    border-radius: var(--md-sys-shape-corner-medium);
    border-color: var(--md-sys-color-outline);
    border-width: 1px;
    border-style: solid;
    padding: 16px;
  }

  .unbounded {
    border-radius: 50%;
    height: 32px;
    width: 32px;
    background-color: var(--md-sys-color-secondary-container);
    margin: 24px;

    /* Needed for unbounded ripple */
    display: flex;
    place-content: center;
    place-items: center;
    position: relative;

    &::before {
      content: '';
      position: absolute;
      top: -24px;
      left: -24px;
      border-radius: 50%;
      border-color: var(--md-sys-color-outline);
      border-width: 1px;
      border-style: dashed;
      width: 80px;
      height: 80px;
    }
  }

  :global(.unbounded .ripple) {
    border-radius: 50%;
    inset: unset;
    height: 64px;
    width: 64px;
  }

  .custom {
    --md-sys-color-primary: #006a6a;
    --md-ripple-hover-color: var(--md-sys-color-primary);
    --md-ripple-pressed-color: var(--md-sys-color-primary);
  }
</style>
