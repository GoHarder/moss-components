<script lang="ts">
  // MARK: Types
  // ------------------------------------------------
  // MARK: Components
  // ------------------------------------------------
  import Section from './custom/section.svelte';
  import Hero from './custom/hero.svelte';
  import { Button } from '$lib/button/index.js';
  import { Icon } from '$lib/icon/index.js';
  import { Snackbar } from '$lib/snackbar/index.js';

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

  let open = $state(false);

  // MARK: Contexts
  // ------------------------------------------------
  // MARK: Subscriptions
  // ------------------------------------------------
  // MARK: Reactive Rules
  // ------------------------------------------------
  // MARK: Events
  // ------------------------------------------------
  function onclick() {
    open = true;
  }

  // MARK: Lifecycle
  // ------------------------------------------------
</script>

<Section bind:expand bind:debug>
  {#snippet header()}
    <h2>Snackbars</h2>
  {/snippet}

  {#snippet supportingText()}
    <p>Snackbars provide brief messages about app processes at the bottom of the screen.</p>
  {/snippet}

  {#snippet hero()}
    <Hero class="snackbar-hero">
      <Button {onclick} variant="filled" trailing-icon>
        Reset
        <Icon data-slot="icon">check</Icon>
      </Button>

      <Snackbar bind:open>Password reset</Snackbar>
    </Hero>
  {/snippet}

  {#if expand}
    <p>Expanded content</p>
  {/if}
</Section>

<style>
</style>
