<script lang="ts">
  // MARK: Types
  // ------------------------------------------------
  // MARK: Components
  // ------------------------------------------------
  import Section from './custom/section.svelte';
  import Hero from './custom/hero.svelte';
  import CodeBlock from './custom/code-block.svelte';
  import { Elevation } from '$lib/elevation/index.js';
  import { Icon } from '$lib/icon/index.js';
  import { Slider } from '$lib/slider/index.js';

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

  let heroValue = $state({
    media: 60,
    call: 50,
    ring: 45,
    alarm: 65,
  });

  let rangeValue = $state({
    start: 25,
    end: 50,
  });

  $inspect(heroValue).with((type, value) => {
    if (!debug) return;
    console.log('heroValue', type);
    console.table(value);
  });

  $inspect(rangeValue).with((type, value) => {
    if (!debug) return;
    console.log('heroValue', type);
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
    <h2>Sliders</h2>
  {/snippet}

  {#snippet supportingText()}
    <p>Sliders allow users to make selections from a range of values.</p>
  {/snippet}

  {#snippet hero()}
    <Hero class="slider-hero">
      <p class="title">Sound</p>
      <div class="slider-row">
        <Icon class="icon">music_note</Icon>
        <p>Media volume</p>
        <Slider class="slider" bind:value={heroValue.media} />
      </div>
      <div class="slider-row">
        <Icon class="icon">phone</Icon>
        <p>Call volume</p>
        <Slider class="slider" bind:value={heroValue.call} />
      </div>
      <div class="slider-row">
        <Icon class="icon">notifications</Icon>
        <p>Ring volume</p>
        <Slider class="slider" bind:value={heroValue.ring} />
      </div>
      <div class="slider-row">
        <Icon class="icon">alarm</Icon>
        <p>Alarm volume</p>
        <Slider class="slider" bind:value={heroValue.alarm} />
      </div>
    </Hero>
  {/snippet}

  {#if expand}
    <div class="usage elevated-card">
      <Elevation />
      <h3>Usage</h3>
      <div class="examples">
        <div class="filled-card">
          <div class="column">
            <Slider />
            <Slider ticks value={50} />
            <Slider range value-start={25} value-end={75} />
          </div>
          <CodeBlock lang="svelte">
            {`<Slider />
<Slider ticks value={50} />
<Slider range value-start={25} value-end={75} />`}
          </CodeBlock>
        </div>
        <div class="filled-card">
          <h4 class="trim">Continuous</h4>
          <div class="column">
            <Slider min={0} max={100} value={50} />
          </div>
          <CodeBlock lang="svelte">
            {`<Slider min={0} max={100} value={50} />`}
          </CodeBlock>
        </div>
        <div class="filled-card">
          <h4 class="trim">Discrete</h4>
          <div class="column">
            <Slider ticks step={5} min={0} max={20} />
          </div>
          <CodeBlock lang="svelte">
            {`<Slider ticks step={5} min={0} max={20} />`}
          </CodeBlock>
        </div>
        <div class="filled-card">
          <h4 class="trim">Range</h4>
          <div class="column">
            <Slider range bind:valuestart={rangeValue.start} bind:valueend={rangeValue.end} />
            <CodeBlock lang="svelte">
              {`<Slider 
  range 
  bind:valuestart={start} 
  bind:valueend={end} 
/>`}
            </CodeBlock>
          </div>
        </div>
        <div class="filled-card">
          <h4 class="trim">Value label</h4>
          <div class="column">
            <Slider labeled />
            <CodeBlock lang="svelte">
              {`<Slider labeled />`}
            </CodeBlock>
          </div>
        </div>
      </div>
    </div>

    <div class="theming elevated-card">
      <Elevation />
      <h3>Theming</h3>
      <Slider range value-start={25} value-end={75} ticks step={5} />
      <CodeBlock lang="css">
        {`:root {
  /* System tokens */
  --md-sys-color-primary: #006A6A;

  /* Component tokens */
  --md-slider-handle-shape: 0px;
}`}
      </CodeBlock>
    </div>
  {/if}
</Section>

<style lang="scss">
  @use '../lib/scss/mixin.scss';

  :global {
    .slider-hero {
      width: calc(40ch + 32px);
      .title {
        @include mixin.text('title-large');
        margin-block: 8px;
      }
    }
  }

  .slider-row {
    display: grid;
    grid-template-columns: 24px 1fr;
    grid-template-areas: 'a b' 'a c';

    p {
      margin-block: 0;
      margin-inline-start: 16px;
      @include mixin.text('title-small');
      grid-area: b;
    }

    :global {
      .icon {
        grid-area: a;
        align-self: center;
      }

      .slider {
        grid-area: c;
      }
    }
  }

  .theming {
    /* System tokens */
    --md-sys-color-primary: #006a6a;
    /* Component tokens */
    --md-slider-handle-shape: 0px;
  }

  .column {
    display: flex;
    flex-direction: column;
    border-radius: var(--md-sys-shape-corner-medium);
    background-color: var(--md-sys-color-surface-container);
  }

  .examples {
    margin-block-start: 16px;
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
    align-items: flex-start;
  }
</style>
