<script lang="ts">
  // MARK: Types
  // ------------------------------------------------
  // MARK: Components
  // ------------------------------------------------
  import Section from './custom/section.svelte';
  import CodeBlock from './custom/code-block.svelte';
  import Hero from './custom/hero.svelte';
  import PhoneTop from './custom/phone-top.svelte';
  import { Elevation } from '$lib/elevation/index.js';
  import { IconButton } from '$lib/icon-button/index.js';
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
    <h2>Icon buttons</h2>
  {/snippet}

  {#snippet supportingText()}
    <p>Icon buttons help people take supplementary actions with a single tap.</p>
  {/snippet}

  {#snippet hero()}
    <Hero class="icon-button-hero">
      <PhoneTop />
      <div class="top-app-bar">
        <div class="row-1">
          <IconButton>
            <Icon>arrow_back</Icon>
          </IconButton>
          <div>
            <IconButton toggle>
              <Icon>favorite</Icon>
            </IconButton>
            <IconButton>
              <Icon>share</Icon>
            </IconButton>
            <IconButton>
              <Icon>more_vert</Icon>
            </IconButton>
          </div>
        </div>
        <div class="row-2">
          <p>Terracotta</p>
        </div>
        <div class="rating">
          <Icon filled>star</Icon>
          <Icon filled>star</Icon>
          <Icon filled>star</Icon>
          <Icon filled>star</Icon>
          <Icon>star</Icon>
        </div>
        <div class="disc">
          <p>American &#183; $$ 2.3 &#183; miles away</p>
          <p>Farm to table fare with a Southern twist</p>
        </div>
        <div class="image">
          <img alt="Avatar" src="https://baconmockup.com/400/200" />
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
          <h4>Icon Button</h4>
          <IconButton>
            <Icon>check</Icon>
          </IconButton>
          <CodeBlock lang="svelte">
            {`<IconButton>
  <Icon>check</Icon>
</IconButton>`}
          </CodeBlock>
        </div>
        <div class="filled-card">
          <h4>Filled Icon Button</h4>
          <IconButton variant="filled">
            <Icon>check</Icon>
          </IconButton>
          <CodeBlock lang="svelte">
            {`<IconButton variant="filled">
  <Icon>check</Icon>
</IconButton>`}
          </CodeBlock>
        </div>
        <div class="filled-card">
          <h4>Filled Tonal Icon Button</h4>
          <IconButton variant="tonal">
            <Icon>check</Icon>
          </IconButton>
          <CodeBlock lang="svelte">
            {`<IconButton variant="tonal">
  <Icon>check</Icon>
</IconButton>`}
          </CodeBlock>
        </div>
        <div class="filled-card">
          <h4>Outlined Icon Button</h4>
          <IconButton variant="outlined">
            <Icon>check</Icon>
          </IconButton>
          <CodeBlock lang="svelte">
            {`<IconButton variant="outlined">
  <Icon>check</Icon>
</IconButton>`}
          </CodeBlock>
        </div>
      </div>
    </div>

    <div class="types elevated-card">
      <Elevation />
      <h3>Usage</h3>

      <div class="examples">
        <div class="filled-card">
          <IconButton>
            <Icon>check</Icon>
          </IconButton>
          <IconButton variant="filled">
            <Icon>check</Icon>
          </IconButton>
          <IconButton variant="tonal">
            <Icon>check</Icon>
          </IconButton>
          <IconButton variant="outlined">
            <Icon>check</Icon>
          </IconButton>
          <CodeBlock lang="svelte">
            {`<IconButton>
  <Icon>check</Icon>
</IconButton>

<IconButton variant="filled">
  <Icon>check</Icon>
</IconButton>

<IconButton variant="tonal">
  <Icon>check</Icon>
</IconButton>

<IconButton variant="outlined">
  <Icon>check</Icon>
</IconButton>`}
          </CodeBlock>
        </div>
        <div class="filled-card">
          <h4>Links</h4>
          <IconButton href="https://google.com" target="_blank">
            <Icon>g_translate</Icon>
          </IconButton>
          <CodeBlock lang="svelte">
            {`<IconButton
  href="https://google.com"
  target="_blank"
>
  <Icon>g_translate</Icon>
</IconButton>`}
          </CodeBlock>
        </div>
        <div class="filled-card">
          <h4>Toggle</h4>
          <IconButton toggle>
            <Icon>close</Icon>
            <Icon data-slot="selected">check</Icon>
          </IconButton>
          <IconButton variant="filled" toggle>
            <Icon>close</Icon>
            <Icon data-slot="selected">check</Icon>
          </IconButton>
          <IconButton variant="tonal" toggle>
            <Icon>close</Icon>
            <Icon data-slot="selected">check</Icon>
          </IconButton>
          <IconButton variant="outlined" toggle>
            <Icon>close</Icon>
            <Icon data-slot="selected">check</Icon>
          </IconButton>
          <CodeBlock lang="svelte">
            {`<IconButton toggle>
  <Icon>close</Icon>
  {#snippet slotSelected()}
    <Icon slot="selected">check</Icon>
  {/snippet}
</IconButton>
    
<IconButton variant="filled" toggle>
  <Icon>close</Icon>
  {#snippet slotSelected()}
    <Icon slot="selected">check</Icon>
  {/snippet}
</IconButton>

<IconButton variant="tonal" toggle>
  <Icon>close</Icon>
  {#snippet slotSelected()}
    <Icon slot="selected">check</Icon>
  {/snippet}
</IconButton>

<IconButton variant="outlined" toggle>
  <Icon>close</Icon>
  {#snippet slotSelected()}
    <Icon slot="selected">check</Icon>
  {/snippet}
</IconButton>`}
          </CodeBlock>
        </div>
      </div>
    </div>

    <div class="theming elevated-card">
      <Elevation />
      <h3>Theming</h3>
      <div class="examples">
        <div class="filled-card">
          <h4>Icon Button</h4>
          <IconButton class="text">
            <Icon>check</Icon>
          </IconButton>
          <CodeBlock lang="css">
            {`:root {
  --md-icon-button-icon-size: 32px;
  --md-sys-color-on-surface-variant: #dc362e;
  background-color: #fff8f6;
}`}
          </CodeBlock>
        </div>

        <div class="filled-card">
          <h4>Filled Icon Button</h4>
          <IconButton variant="filled" class="filled">
            <Icon>check</Icon>
          </IconButton>
          <CodeBlock lang="css">
            {`:root {
  --md-filled-icon-button-container-width: 80px;
  --md-filled-icon-button-container-height: 80px;
  --md-filled-icon-button-icon-size: 40px;
  --md-filled-icon-button-container-shape: 0px;
  --md-sys-color-primary: #dc362e;
  background-color: #fff8f6;
}`}
          </CodeBlock>
        </div>
        <div class="filled-card">
          <h4>Filled Tonal Icon Button</h4>
          <IconButton variant="tonal" class="tonal">
            <Icon>check</Icon>
          </IconButton>
          <CodeBlock lang="css">
            {`:root {
  --md-filled-tonal-icon-button-container-width: 80px;
  --md-filled-tonal-icon-button-container-height: 80px;
  --md-filled-tonal-icon-button-container-shape: 0px;
  --md-filled-tonal-icon-button-icon-size: 40px;
  --md-sys-color-secondary-container: #006a6a;
}`}
          </CodeBlock>
        </div>
        <div class="filled-card">
          <h4>Outlined Icon Button</h4>
          <IconButton variant="outlined" class="outlined">
            <Icon>check</Icon>
          </IconButton>
          <CodeBlock lang="css">
            {`:root {
  --md-outlined-icon-button-container-width: 80px;
  --md-outlined-icon-button-container-height: 80px;
  --md-outlined-icon-button-container-shape: 0px;
  --md-outlined-icon-button-icon-size: 40px;
  --md-outlined-icon-button-outline-width: 4px;
  --md-sys-color-outline: #006a6a;
}`}
          </CodeBlock>
        </div>
      </div>
    </div>
  {/if}
</Section>

<style lang="scss">
  @use '../lib/scss/mixin.scss';

  :global(.icon-button-hero) {
    width: 432px;

    .top-app-bar {
      .row-1 {
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 64px;
      }

      .row-2 p {
        @include mixin.text('title-large');
        margin-block: 8px;
      }
    }

    .rating {
      --md-icon-size: 16px;
      :global(md-icon[filled]) {
        font-variation-settings: 'FILL' 1;
      }
    }

    .disc {
      @include mixin.text('body-medium');
    }

    .image img {
      border-radius: var(--md-sys-shape-corner-medium);
    }
  }

  .examples {
    margin-block-start: 16px;
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
    align-items: flex-start;
  }

  .theming {
    :global {
      .text {
        --md-icon-button-icon-size: 32px;
        --md-sys-color-on-surface-variant: #dc362e;
        background-color: #fff8f6;
      }

      .filled {
        --md-filled-icon-button-container-width: 80px;
        --md-filled-icon-button-container-height: 80px;
        --md-filled-icon-button-icon-size: 40px;
        --md-filled-icon-button-container-shape: 0px;
        --md-sys-color-primary: #dc362e;
        background-color: #fff8f6;
      }

      .tonal {
        --md-filled-tonal-icon-button-container-width: 80px;
        --md-filled-tonal-icon-button-container-height: 80px;
        --md-filled-tonal-icon-button-container-shape: 0px;
        --md-filled-tonal-icon-button-icon-size: 40px;
        --md-sys-color-secondary-container: #006a6a;
      }

      .outlined {
        --md-outlined-icon-button-container-width: 80px;
        --md-outlined-icon-button-container-height: 80px;
        --md-outlined-icon-button-container-shape: 0px;
        --md-outlined-icon-button-icon-size: 40px;
        --md-outlined-icon-button-outline-width: 4px;
        --md-sys-color-outline: #006a6a;
      }
    }
  }
</style>
