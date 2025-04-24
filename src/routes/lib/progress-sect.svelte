<script lang="ts">
  // MARK: Types
  // ------------------------------------------------
  // MARK: Components
  // ------------------------------------------------
  import Section from './custom/section.svelte';
  import Hero from './custom/hero.svelte';
  import { Elevation } from '$lib/elevation/index.js';
  import CodeBlock from './custom/code-block.svelte';
  import { CircularProgress, LinearProgress } from '$lib/progress/index.js';

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
    <h2>Progress indicators</h2>
  {/snippet}

  {#snippet supportingText()}
    <div>
      <p>Progress indicators inform users about the status of ongoing processes, such as loading an app, submitting a form, or saving updates.</p>
      <p>They communicate an app's state and indicate available actions, such as wether users can navigate away from the current screen.</p>
    </div>
  {/snippet}

  {#snippet hero()}
    <Hero>
      <div class="hero">
        <LinearProgress value={0.5} />
        <LinearProgress indeterminate={debug} />
        <div>
          <CircularProgress value={0.5} />
        </div>
        <div>
          <CircularProgress indeterminate={debug} />
        </div>
      </div>
    </Hero>
  {/snippet}

  {#if expand}
    <div class="types elevated-card">
      <Elevation />
      <h3>Types</h3>
      <div class="examples">
        <div class="filled-card">
          <h4>Circular progress</h4>
          <CircularProgress value={0.6} />
          <CircularProgress indeterminate={debug} />
          <CodeBlock lang="svelte">
            {`<CircularProgress value={0.6} />
<CircularProgress indeterminate />`}
          </CodeBlock>
        </div>
        <div class="filled-card">
          <h4>Linear progress</h4>
          <div class="column" style="margin-block-end: 8px">
            <LinearProgress indeterminate={debug} />
          </div>
          <div class="column">
            <LinearProgress value={0.6} />
          </div>
          <CodeBlock lang="svelte">
            {`<LinearProgress indeterminate />
<LinearProgress value={0.6} />`}
          </CodeBlock>
          <h5>Buffer</h5>
          <div class="column">
            <LinearProgress value={0.5} buffer={0.8} />
          </div>
          <CodeBlock lang="svelte">
            {`<LinearProgress value={0.5} buffer={0.8} />`}
          </CodeBlock>
        </div>
      </div>
    </div>
    <div class="usage elevated-card">
      <Elevation />
      <h3>Usage</h3>
      <CircularProgress value={0.5} />
      <CircularProgress indeterminate={debug} />
      <div class="column" style="margin-block-end: 8px">
        <LinearProgress indeterminate={debug} />
      </div>
      <div class="column">
        <LinearProgress value={0.5} />
      </div>
      <CodeBlock lang="svelte">
        {`<CircularProgress value={0.5} />
<CircularProgress indeterminate />

<LinearProgress indeterminate />
<LinearProgress value={0.5} />`}
      </CodeBlock>
      <div class="filled-card">
        <h4>Four colors</h4>
        <CircularProgress indeterminate={debug} four-color />
        <div class="column">
          <LinearProgress indeterminate={debug} four-color />
        </div>
        <CodeBlock lang="svelte">
          {`<CircularProgress indeterminate four-color />
<LinearProgress indeterminate four-color />`}
        </CodeBlock>
      </div>
    </div>

    <div class="accessibility elevated-card">
      <Elevation />
      <h3>Accessibility</h3>
      <CircularProgress value={0.5} aria-label="Page refresh progress" />
      <LinearProgress value={0.5} aria-label="Download progress" />
      <CodeBlock lang="svelte">
        {`<CircularProgress
  value={0.5}
  aria-label="Page refresh progress"
/>
<LinearProgress
  value={0.5}
  aria-label="Download progress"
/>`}
      </CodeBlock>
    </div>

    <div class="theming elevated-card">
      <Elevation />
      <h3>Theming</h3>
      <div class="examples">
        <div class="filled-card">
          <h4>Circular progress</h4>
          <CircularProgress value={0.5} class="circular" />
          <CodeBlock lang="css">
            {`:root {
  --md-circular-progress-size: 32px;
  --md-circular-progress-active-indicator-width: 20;
  --md-sys-color-primary: #006A6A;
}`}
          </CodeBlock>
        </div>
        <div class="filled-card">
          <h4>Linear progress</h4>
          <div class="column">
            <LinearProgress value={0.5} class="linear" />
          </div>
          <CodeBlock lang="css">
            {`:root {
  --md-linear-progress-track-height: 8px;
  --md-linear-progress-track-shape: 8px;
  --md-linear-progress-active-indicator-height: 8px;
  --md-sys-color-primary: #006A6A;
  --md-sys-color-surface-container-highest: #DDE4E3;
}`}
          </CodeBlock>
        </div>
      </div>
    </div>
  {/if}
</Section>

<style lang="scss">
  .hero {
    display: grid;
    grid-template-columns: repeat(2, 200px);
    gap: 16px;
    justify-items: stretch;

    div {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
  }

  .examples {
    margin-block-start: 16px;
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
    align-items: flex-start;
  }

  .column {
    padding: 16px;
    border-radius: var(--md-sys-shape-corner-medium);
    background-color: var(--md-sys-color-surface-container);
  }

  .theming {
    :global {
      .linear {
        --md-linear-progress-track-height: 8px;
        --md-linear-progress-track-shape: 8px;
        --md-linear-progress-active-indicator-height: 8px;
        --md-sys-color-primary: #006a6a;
        --md-sys-color-surface-container-highest: #dde4e3;
      }

      .circular {
        --md-circular-progress-size: 32px;
        --md-circular-progress-active-indicator-width: 20;
        --md-sys-color-primary: #006a6a;
      }
    }
  }
</style>
