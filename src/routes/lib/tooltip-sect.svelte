<script lang="ts">
  // MARK: Types
  // ------------------------------------------------
  // MARK: Components
  // ------------------------------------------------
  import Section from './custom/section.svelte';
  import Hero from './custom/hero.svelte';
  import { Icon } from '$lib/icon/index.js';
  import { IconButton } from '$lib/icon-button/index.js';
  import { PlainTooltip } from '$lib/tooltip/index.js';

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
    <h2>Tooltips</h2>
  {/snippet}

  {#snippet supportingText()}
    <p>Tooltips display informative text when users hover over, focus on, or tap an element.</p>
  {/snippet}

  {#snippet hero()}
    <Hero class="tooltip-hero">
      <div style="width: max-content;">
        <IconButton tooltip="Cut Ctrl+X">
          <Icon>content_cut</Icon>
        </IconButton>
        <IconButton tooltip="Copy Ctrl+C">
          <Icon>content_copy</Icon>
        </IconButton>
        <IconButton tooltip="Paste Ctrl+V">
          <Icon>content_paste</Icon>
        </IconButton>
      </div>

      <!-- <div class="box" aria-describedby="tooltip-1"></div>
      <PlainTooltip id="tooltip-1">Tooltip</PlainTooltip> -->
    </Hero>
  {/snippet}

  {#if expand}
    <!-- <p>Expand content</p> -->
  {/if}
</Section>

<style>
  /* .box {
    width: 100px;
    height: 100px;
    background-color: green;
  } */
</style>
