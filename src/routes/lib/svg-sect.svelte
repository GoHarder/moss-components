<script lang="ts">
  // MARK: Types
  // ------------------------------------------------
  // MARK: Components
  // ------------------------------------------------
  import Section from './custom/section.svelte';
  import Hero from './custom/hero.svelte';
  import { Elevation } from '$lib/elevation/index.js';
  import { Svg } from '$lib/svg/index.js';
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
    <h2>Svg loader</h2>
  {/snippet}

  {#snippet supportingText()}
    <p>This component loads an svg file into the dom.</p>
  {/snippet}

  {#snippet hero()}
    <Hero>
      <Icon>
        <Svg src="./src/routes/lib/svg/diagonal_base.svg" class="test" />
      </Icon>
      <Icon>
        <Svg src="./src/routes/lib/svg/rectangle_base.svg" class="test" />
      </Icon>
      <Icon>
        <Svg src="./src/routes/lib/svg/rectangle_grip_base.svg" class="test" />
      </Icon>
    </Hero>
  {/snippet}

  {#if expand}
    <div class=" elevated-card">
      <Elevation />
      <h3>Expanded Content</h3>
    </div>
  {/if}
</Section>

<style>
  :global(.test) {
    color: var(--md-sys-color-on-surface);
  }
</style>
