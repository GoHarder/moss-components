<script lang="ts">
  // MARK: Types
  // ------------------------------------------------
  // MARK: Components
  // ------------------------------------------------
  import Section from './custom/section.svelte';
  import Hero from './custom/hero.svelte';
  import CodeBlock from './custom/code-block.svelte';
  import { Elevation } from '$lib/elevation/index.js';
  import { Button } from '$lib/button/index.js';
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
    <h2>Buttons</h2>
  {/snippet}

  {#snippet supportingText()}
    <p>Buttons help people initiate actions, from sending an email, to sharing a document, to liking a post.</p>
  {/snippet}

  {#snippet hero()}
    <Hero class="button-hero">
      <div class="image">
        <img alt="Avatar" src="https://avatar.iran.liara.run/public" />
      </div>
      <p class="name">So Duri</p>
      <p class="tag">@so-duri</p>
      <p class="msg">Thanks for doing the grocery shopping! I'll do it next week.</p>
      <p class="price">$159.32</p>
      <Button variant="filled" class="hero-btn">Make Payment</Button>
    </Hero>
  {/snippet}

  {#if expand}
    <div class="types elevated-card">
      <Elevation />
      <h3>Types</h3>
      <Button variant="elevated" href="/">
        <Icon data-slot="icon">add</Icon>
        Elevated
      </Button>
      <Button variant="filled" href="#/checkbox?param=value">Filled</Button>
      <Button variant="tonal" href="#/chip">Tonal</Button>
      <Button variant="outlined">Outlined</Button>
      <Button>Text</Button>
    </div>
    <div class="usage elevated-card">
      <Elevation />
      <h3>Usage</h3>
      <Button variant="outlined">Back</Button>
      <Button variant="filled">Complete</Button>
      <div class="icon filled-card">
        <h4 class="trim">Icon</h4>
        <Button variant="tonal">
          <Icon data-slot="icon">send</Icon>
          Send
        </Button>
        <Button trailing-icon>
          <Icon data-slot="icon">open_in_new</Icon>
          Open
        </Button>
        <CodeBlock lang="svelte">
          {`<Button variant="tonal">
  {#snippet slotIcon()}
    <Icon slot="icon">send</Icon>
  {/snippet}
  Send
</Button>
<Button trailing-icon>
  {#snippet slotIcon()}
    <Icon slot="icon">open_in_new</Icon>
  {/snippet}
  Open
</Button>`}
        </CodeBlock>
      </div>
    </div>
    <div class="usage elevated-card">
      <Elevation />
      <h3>Accessibility</h3>
      <Button variant="elevated" aria-label="Add a new contact">Add</Button>
      <CodeBlock lang="svelte">
        {`<Button variant="elevated" aria-label="Add a new contact">
  Add
</Button>`}
      </CodeBlock>
      <div class="icon filled-card">
        <h4>Focusable and disabled</h4>
        <div role="toolbar">
          <Button>Copy</Button>
          <Button>Cut</Button>
          <Button soft-disabled>Paste</Button>
        </div>
        <CodeBlock lang="svelte">
          {`<div role="toolbar">
  <Button>Copy</Button>
  <Button>Cut</Button>
  <!--
    This button is disabled but kept
    focusable to improve its discoverability
    in the toolbar.
  -->
  <Button soft-disabled>Paste</Button>
</div>`}
        </CodeBlock>
      </div>
    </div>
    <div class="theming elevated-card">
      <Elevation />
      <h3>Theming</h3>
      <div class="examples">
        <div class="filled-card">
          <h4>Elevated Button</h4>
          <Button variant="elevated" class="elevated">Elevated</Button>
          <CodeBlock lang="css">
            {`:root {
  --md-elevated-button-container-shape: 0px;
  --md-elevated-button-label-text-font: system-ui;
  --md-sys-color-surface-container-low: #FAFDFC;
  --md-sys-color-primary: #191C1C;
}`}
          </CodeBlock>
        </div>
        <div class="filled-card">
          <h4>Filled Button</h4>
          <Button variant="filled" class="filled">Filled</Button>
          <CodeBlock lang="css">
            {`:root {
  --md-filled-button-container-shape: 0px;
  --md-filled-button-label-text-font: system-ui;
  --md-sys-color-primary: #006a6a;
  --md-sys-color-on-primary: #ffffff;
}`}
          </CodeBlock>
        </div>
        <div class="filled-card">
          <h4>Filled Tonal Button</h4>
          <Button variant="tonal" class="tonal">Tonal</Button>
          <CodeBlock lang="css">
            {`:root {
  --md-filled-tonal-button-container-shape: 0px;
  --md-filled-tonal-button-label-text-font: system-ui;
  --md-sys-color-secondary-container: #cce8e7;
  --md-sys-color-on-secondary-container: #051f1f;        
}`}
          </CodeBlock>
        </div>
        <div class="filled-card">
          <h4>Outlined Button</h4>
          <Button variant="outlined" class="outlined">Outlined</Button>
          <CodeBlock lang="css">
            {`:root {
  --md-outlined-button-container-shape: 0px;
  --md-outlined-button-label-text-font: system-ui;
  --md-sys-color-primary: #006a6a;
  --md-sys-color-outline: #6f7979;
}`}
          </CodeBlock>
        </div>
        <div class="filled-card">
          <h4>Text Button</h4>
          <Button class="text">Text</Button>
          <CodeBlock lang="css">
            {`:root {
  --md-text-button-label-text-font: system-ui;
  --md-sys-color-primary: #006a6a;
}`}
          </CodeBlock>
        </div>
      </div>
    </div>
  {/if}
</Section>

<style lang="scss">
  @use '../lib/scss/mixin.scss';

  :global(.button-hero) {
    width: calc(40ch + 32px);
    display: flex;
    flex-direction: column;

    .image {
      width: 200px;
      margin-inline: auto;
      margin-block-end: 8px;
    }

    .name {
      @include mixin.text('title-large');
      text-align: center;
      margin: 0;
    }

    .tag {
      @include mixin.text('body-medium');
      text-align: center;
      margin: 8px;
    }

    .msg {
      @include mixin.text('body-medium');
      // text-align: center;
      margin: 0;
    }

    .price {
      @include mixin.text('display-medium');
      text-align: center;
      margin: 14px;
    }
  }

  :global {
    .hero-btn {
      width: 100%;
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
      .elevated {
        --md-elevated-button-container-shape: 0px;
        --md-elevated-button-label-text-font: system-ui;
        --md-sys-color-surface-container-low: #fafdfc;
        --md-sys-color-primary: #191c1c;
      }

      .filled {
        --md-filled-button-container-shape: 0px;
        --md-filled-button-label-text-font: system-ui;
        --md-sys-color-primary: #006a6a;
        --md-sys-color-on-primary: #ffffff;
      }

      .tonal {
        --md-filled-tonal-button-container-shape: 0px;
        --md-filled-tonal-button-label-text-font: system-ui;
        --md-sys-color-secondary-container: #cce8e7;
        --md-sys-color-on-secondary-container: #051f1f;
      }

      .outlined {
        --md-outlined-button-container-shape: 0px;
        --md-outlined-button-label-text-font: system-ui;
        --md-sys-color-primary: #006a6a;
        --md-sys-color-outline: #6f7979;
      }

      .text {
        --md-text-button-label-text-font: system-ui;
        --md-sys-color-primary: #006a6a;
      }
    }
  }
</style>
