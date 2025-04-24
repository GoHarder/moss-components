<script lang="ts">
  // MARK: Types
  // ------------------------------------------------
  // MARK: Components
  // ------------------------------------------------

  import Section from './custom/section.svelte';
  import CodeBlock from './custom/code-block.svelte';
  import Hero from './custom/hero.svelte';
  import { Elevation } from '$lib/elevation/index.js';
  import { Icon } from '$lib/icon/index.js';

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
    <h2>Icons</h2>
  {/snippet}

  {#snippet supportingText()}
    <p>Icons can be used to represent common actions.</p>
  {/snippet}

  {#snippet hero()}
    <Hero class="icon-hero">
      <Icon>arrow_back</Icon>
      <Icon>3d_rotation</Icon>
      <Icon>call_split</Icon>
      <Icon>edit</Icon>
      <Icon>alarm</Icon>
      <Icon>apps</Icon>
      <Icon>mic</Icon>
      <Icon>insert_chart</Icon>
      <Icon>mail</Icon>
      <Icon>headphones</Icon>
      <Icon>check_circle</Icon>
      <Icon>today</Icon>
    </Hero>
  {/snippet}

  {#if expand}
    <div class="elevated-card">
      <Elevation />
      <h3>Usage</h3>
      <div class="examples">
        <div class="filled-card">
          <h4>Outlined</h4>

          <CodeBlock lang="html">
            {`<link href="https://fonts.googleapis.com/icon?family=Material+Symbols+Outlined" rel="stylesheet">`}
          </CodeBlock>
        </div>
        <div class="filled-card">
          <h4>Rounded</h4>
          <Icon>settings</Icon>
          <Icon>check_box</Icon>
          <Icon>home</Icon>
          <CodeBlock lang="html">
            {`<link href="https://fonts.googleapis.com/icon?family=Material+Symbols+Rounded" rel="stylesheet">`}
          </CodeBlock>
        </div>
        <div class="filled-card">
          <h4>Sharp</h4>
          <Icon>settings</Icon>
          <Icon>check_box</Icon>
          <Icon>home</Icon>
          <CodeBlock lang="html">
            {`<link href="https://fonts.googleapis.com/icon?family=Material+Symbols+Sharp" rel="stylesheet">`}
          </CodeBlock>
        </div>
        <div class="filled-card">
          <h4>Fill</h4>
          <p>Outlined</p>
          <Icon class="custom-icon filled">settings</Icon>
          <Icon class="custom-icon filled">check_box</Icon>
          <Icon class="custom-icon filled">home</Icon>
          <p>Rounded</p>
          <Icon class="custom-icon filled rounded">settings</Icon>
          <Icon class="custom-icon filled rounded">check_box</Icon>
          <Icon class="custom-icon filled rounded">home</Icon>
          <p>Sharp</p>
          <Icon class="custom-icon filled sharp">settings</Icon>
          <Icon class="custom-icon filled sharp">check_box</Icon>
          <Icon class="custom-icon filled sharp">home</Icon>
          <CodeBlock lang="css">
            {`.filled {
  font-variation-settings: 'FILL' 1;
}`}
          </CodeBlock>
        </div>
      </div>
    </div>

    <div class="elevated-card">
      <Elevation />
      <h3>Accessibility</h3>

      <Icon>
        <span aria-label="home">home</span>
      </Icon>

      <CodeBlock lang="svelte">
        {`<Icon>
  <span aria-label="home">
    home
  </span>
</Icon>`}
      </CodeBlock>
    </div>

    <div class="elevated-card">
      <Elevation />
      <h3>Theming</h3>
      <p>Outlined</p>
      <Icon class="custom-icon large">settings</Icon>
      <Icon class="custom-icon large">check_box</Icon>
      <Icon class="custom-icon large">home</Icon>
      <Icon class="custom-icon large filled">settings</Icon>
      <Icon class="custom-icon large filled">check_box</Icon>
      <Icon class="custom-icon large filled">home</Icon>
      <p>Rounded</p>
      <Icon class="custom-icon large rounded">settings</Icon>
      <Icon class="custom-icon large rounded">check_box</Icon>
      <Icon class="custom-icon large rounded">home</Icon>
      <Icon class="custom-icon large filled rounded">settings</Icon>
      <Icon class="custom-icon large filled rounded">check_box</Icon>
      <Icon class="custom-icon large filled rounded">home</Icon>
      <p>Sharp</p>
      <Icon class="custom-icon large sharp">settings</Icon>
      <Icon class="custom-icon large sharp">check_box</Icon>
      <Icon class="custom-icon large sharp">home</Icon>
      <Icon class="custom-icon large filled sharp">settings</Icon>
      <Icon class="custom-icon large filled sharp">check_box</Icon>
      <Icon class="custom-icon large filled sharp">home</Icon>
      <CodeBlock lang="css">
        {`&.filled {
  font-variation-settings: 'FILL' 1;
}

&.rounded {
  --md-icon-font: 'Material Symbols Rounded';
}

&.sharp {
  --md-icon-font: 'Material Symbols Sharp';
}

&.large {
  --md-icon-size: 48px;
}`}
      </CodeBlock>
    </div>
  {/if}
</Section>

<style lang="scss">
  :global(.icon-hero) {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 16px;
  }

  :global {
    .custom-icon {
      &.filled {
        font-variation-settings: 'FILL' 1;
      }

      &.rounded {
        --md-icon-font: 'Material Symbols Rounded';
      }

      &.sharp {
        --md-icon-font: 'Material Symbols Sharp';
      }

      &.large {
        --md-icon-size: 48px;
      }
    }
  }

  .examples {
    margin-block-start: 16px;
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
    align-items: flex-start;
  }
</style>
