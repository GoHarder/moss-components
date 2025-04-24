<script lang="ts">
  // MARK: Types
  // ------------------------------------------------
  // MARK: Components
  // ------------------------------------------------
  import Section from './custom/section.svelte';
  import CodeBlock from './custom/code-block.svelte';
  import Hero from './custom/hero.svelte';
  import { Checkbox } from '$lib/checkbox/index.js';
  import { Elevation } from '$lib/elevation/index.js';
  import { Divider } from '$lib/divider/index.js';

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
    <h2>Checkboxes</h2>
  {/snippet}

  {#snippet supportingText()}
    <div>
      <p>Checkboxes allow users to select one or more items from a set and can be used to turn an option on or off.</p>
      <p>They're a kind of selection control that helps users make a choice from a set of options.</p>
    </div>
  {/snippet}

  {#snippet hero()}
    <Hero class="checkbox-hero">
      <p>Allow access</p>
      <label class="row">Microphone access<Checkbox checked /></label>
      <Divider />
      <label class="row">Location access<Checkbox checked /></label>
      <Divider />
      <label class="row">Camera access<Checkbox /></label>
      <Divider />
      <label class="row">Haptics<Checkbox /></label>
      <Divider />
    </Hero>
  {/snippet}

  {#if expand}
    <div class="usage elevated-card">
      <Elevation />
      <h3>Usage</h3>
      <Checkbox />
      <Checkbox checked />
      <Checkbox indeterminate />
      <CodeBlock lang="svelte">
        {`<Checkbox />
<Checkbox checked />
<Checkbox indeterminate />`}
      </CodeBlock>
      <div class="filled-card">
        <h4>Label</h4>
        <label class="label"><Checkbox />Checkbox one</label>
        <div class="label v2">
          <Checkbox id="checkbox-two" />
          <label for="checkbox-two">Checkbox two</label>
        </div>
        <CodeBlock lang="svelte">
          {`<label class="row">
  <Checkbox />
  Checkbox one
</label>

<Checkbox id="checkbox-two" />
<label for="checkbox-two">Checkbox two</label>`}
        </CodeBlock>
      </div>
    </div>

    <div class="theming elevated-card">
      <Elevation />
      <h3>Accessibility</h3>
      <Checkbox aria-label="Select all checkboxes" />
      <label>
        <Checkbox aria-label="Agree to terms and conditions" />
        Agree
      </label>
      <CodeBlock lang="svelte">
        {`<Checkbox aria-label="Select all checkboxes" />
<label>
  <Checkbox aria-label="Agree to terms and conditions" />
  Agree
</label>`}
      </CodeBlock>
    </div>

    <div class="theming elevated-card">
      <Elevation />
      <h3>Theming</h3>
      <Checkbox class="custom" />
      <Checkbox checked class="custom" />
      <CodeBlock lang="css">
        {`:root {
  /* System tokens */
  --md-sys-color-primary: #006a6a;
  --md-sys-color-on-primary: #ffffff;
  --md-sys-color-on-surface-variant: #3f4948;
  /* Component tokens */
  --md-checkbox-container-shape: 0px;
}`}
      </CodeBlock>
    </div>
  {/if}
</Section>

<style lang="scss">
  @use '../lib/scss/mixin.scss';

  :global(.checkbox-hero) {
    @include mixin.hero();
    width: 320px;

    p {
      margin: 0;
      @include mixin.text('title-small');
    }

    .row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 48px;
    }
  }

  .label {
    display: grid;
    grid-template-columns: 30px 1fr;

    &.v2 {
      margin-block-start: 12px;
    }
  }

  .theming :global(.custom) {
    /* System tokens */
    --md-sys-color-primary: #006a6a;
    --md-sys-color-on-primary: #ffffff;
    --md-sys-color-on-surface-variant: #3f4948;
    /* Component tokens */
    --md-checkbox-container-shape: 0px;
  }
</style>
