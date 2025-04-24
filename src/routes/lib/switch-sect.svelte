<script lang="ts">
  // MARK: Types
  // ------------------------------------------------
  // MARK: Components
  // ------------------------------------------------
  import Section from './custom/section.svelte';
  import Hero from './custom/hero.svelte';
  import CodeBlock from './custom/code-block.svelte';
  import PhoneTop from './custom/phone-top.svelte';
  import { Elevation } from '$lib/elevation/index.js';
  import { IconButton } from '$lib/icon-button/index.js';
  import { Icon } from '$lib/icon/index.js';
  import { Switch } from '$lib/switch/index.js';

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

  let switches = $state({
    wifi: true,
    bluetooth: false,
  });

  $inspect(switches).with((type, value) => {
    if (!debug) return;
    console.log('switches', type);
    console.table(value);
  });

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
    <h2>Switches</h2>
  {/snippet}

  {#snippet supportingText()}
    <p>Switches toggle the state of a single item on or off.</p>
  {/snippet}

  {#snippet hero()}
    <Hero class="switch-hero">
      <PhoneTop />
      <div class="top-app-bar">
        <span class="left">
          <IconButton>
            <Icon>arrow_back</Icon>
          </IconButton>
          <p class="title">Settings</p>
        </span>
      </div>
      <p>General</p>
      <div class="label-container">
        <label for="wi-fi-switch">Wi-Fi</label>
        <Switch id="wi-fi-switch" bind:selected={switches.wifi} show-only-selected-icon />
      </div>
      <div class="label-container">
        <label for="bluetooth-switch">Bluetooth</label>
        <Switch id="bluetooth-switch" bind:selected={switches.bluetooth} />
      </div>
    </Hero>
  {/snippet}

  {#if expand}
    <div class="usage elevated-card">
      <Elevation />
      <h3>Usage</h3>
      <div class="examples">
        <div class="filled-card">
          <Switch />
          <Switch selected />
          <CodeBlock lang="svelte">
            {`<Switch />
<Switch selected />`}
          </CodeBlock>
        </div>
        <div class="filled-card">
          <h4>Icons</h4>
          <Switch icons />
          <Switch icons selected />
          <Switch icons show-only-selected-icon />
          <Switch icons show-only-selected-icon selected />
          <CodeBlock lang="svelte">
            {`<Switch icons />
<Switch icons selected />
<Switch icons show-only-selected-icon />
<Switch icons show-only-selected-icon selected />`}
          </CodeBlock>
        </div>
        <div class="filled-card">
          <h4>Label</h4>
          <div class="label-container">
            <label for="wi-fi-switch-2">Wi-Fi</label>
            <Switch id="wi-fi-switch-2" bind:selected={switches.wifi} show-only-selected-icon />
          </div>
          <div class="label-container">
            <label for="bluetooth-switch-2">Bluetooth</label>
            <Switch id="bluetooth-switch-2" bind:selected={switches.bluetooth} />
          </div>
          <CodeBlock lang="svelte">
            {`<label>
  Wi-Fi
  <Switch selected />
</label>
          
<label for="switch">Bluetooth</label>
<Switch id="switch" />`}
          </CodeBlock>
        </div>
      </div>
    </div>
    <div class="accessibility elevated-card">
      <Elevation />
      <h3>Accessibility</h3>
      <Switch aria-label="Lights" />
      <label>
        All
        <Switch aria-label="All notifications" />
      </label>
      <CodeBlock lang="svelte">
        {`<Switch aria-label="Lights" />
<label>
  All
  <Switch aria-label="All notifications" />
</label>`}
      </CodeBlock>
    </div>
    <div class="theming elevated-card">
      <Elevation />
      <h3>Theming</h3>
      <Switch />
      <Switch selected />
      <CodeBlock lang="css">
        {`:root {
  /* System tokens */
  --md-sys-color-primary: #006a6a;
  --md-sys-color-on-primary: #ffffff;
  --md-sys-color-outline: #6f7979;
  --md-sys-color-surface-container-highest: #dde4e3;
  /* Component tokens */
  --md-switch-handle-shape: 0px;
  --md-switch-track-shape: 0px;
}`}
      </CodeBlock>
    </div>
  {/if}
</Section>

<style lang="scss">
  @use '../lib/scss/mixin.scss';

  :global(.switch-hero) {
    width: 432px;

    .left {
      display: flex;
      align-items: center;
      gap: 8px;

      .title {
        @include mixin.text('title-large');
        margin-block: 0;
      }

      p {
        @include mixin.text('title-small');
        margin-block: 0;
      }
    }

    .top-app-bar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 64px;
    }
  }

  .label-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 48px;
  }

  .examples {
    margin-block-start: 16px;
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
    align-items: flex-start;
  }

  .theming {
    /* System tokens */
    --md-sys-color-primary: #006a6a;
    --md-sys-color-on-primary: #ffffff;
    --md-sys-color-outline: #6f7979;
    --md-sys-color-surface-container-highest: #dde4e3;
    /* Component tokens */
    --md-switch-handle-shape: 0px;
    --md-switch-track-shape: 0px;
  }
</style>
