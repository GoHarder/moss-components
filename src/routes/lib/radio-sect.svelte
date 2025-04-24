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
  import { Radio } from '$lib/radio/index.js';
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
    <h2>Radio Buttons</h2>
  {/snippet}

  {#snippet supportingText()}
    <div>
      <p>Radio buttons allow users to select one option from a set.</p>
      <p>They're a selection control that often appears when users are asked to make decisions for select a choice from options.</p>
    </div>
  {/snippet}

  {#snippet hero()}
    <Hero class="radio-hero">
      <PhoneTop />
      <div class="row-1">
        <div class="row-1-left">
          <IconButton>
            <Icon>arrow_back</Icon>
          </IconButton>
          <p>Ringtone</p>
        </div>
        <div>
          <IconButton>
            <Icon>more_vert</Icon>
          </IconButton>
        </div>
      </div>
      <div class="option">
        <Radio id="radio-none" name="ringtone" value="none" />
        <label for="radio-none">None</label>
      </div>
      <div class="option">
        <Radio id="radio-callisto" name="ringtone" value="callisto" />
        <label for="radio-callisto">Callisto</label>
      </div>
      <div class="option">
        <Radio id="radio-ganymede" name="ringtone" value="ganymede" />
        <label for="radio-ganymede">Ganymede</label>
      </div>
      <div class="option">
        <Radio id="radio-luna" name="ringtone" value="luna" />
        <label for="radio-luna">Luna</label>
      </div>
    </Hero>
  {/snippet}

  {#if expand}
    <div class="usage elevated-card">
      <Elevation />
      <h3>Usage</h3>
      <form>
        <Radio name="animals" value="cats" />
        <Radio name="animals" value="dogs" />
        <Radio name="animals" value="birds" checked />
      </form>
      <CodeBlock lang="svelte">
        {`<form>
  <Radio name="animals" value="cats" />
  <Radio name="animals" value="dogs" />
  <Radio name="animals" value="birds" checked />
</form>`}
      </CodeBlock>
      <div class="filled-card">
        <h4>Label</h4>
        <Radio id="cats-radio" name="animals" value="cats" />
        <label for="cats-radio">Cats</label>
        <Radio id="dogs-radio" name="animals" value="dogs" />
        <label for="dogs-radio">Dogs</label>
        <CodeBlock lang="svelte">
          {`<Radio id="cats-radio" name="animals" value="cats" />
<label for="cats-radio">Cats</label>
<Radio id="dogs-radio" name="animals" value="dogs" />
<label for="dogs-radio">Dogs</label>`}
        </CodeBlock>
      </div>
    </div>
    <div class="accessibility elevated-card">
      <Elevation />
      <h3>Accessibility</h3>
      <div role="radiogroup" aria-labelledby="group-title">
        <p id="group-title">Starting position</p>
        <div class="option">
          <Radio id="first-radio" name="group" value="1" aria-label="First" />
          <label for="first-radio">1st</label>
        </div>
        <div class="option">
          <Radio id="second-radio" name="group" value="2" aria-label="Second" />
          <label for="second-radio">2nd</label>
        </div>
      </div>
      <CodeBlock lang="svelte">
        {`<div role="radiogroup" aria-labelledby="group-title">
  <p id="group-title">Starting position</p>
  <div>
    <Radio id="first-radio" name="group" value="1" aria-label="First" />
    <label for="first-radio">1st</label>
  </div>
  <div>
    <Radio id="second-radio" name="group" value="2" aria-label="Second" />
    <label for="second-radio">2nd</label>
  </div>
</div>`}
      </CodeBlock>
    </div>

    <div class="theming elevated-card">
      <Elevation />
      <h3>Theming</h3>
      <md-radio name="group"></md-radio>
      <md-radio name="group" checked></md-radio>
      <md-radio name="group"></md-radio>
      <CodeBlock lang="css">
        {`:root {
  --md-sys-color-primary: #006A6A;
  --md-radio-icon-size: 16px;
}`}
      </CodeBlock>
    </div>
  {/if}
</Section>

<style lang="scss">
  @use '../lib/scss/mixin.scss';

  :global(.radio-hero) {
    @include mixin.hero();
    width: 432px;
  }

  .option {
    display: grid;
    align-items: center;
    justify-items: center;

    grid-template-columns: 40px 1fr;
    height: 40px;

    label {
      justify-self: start;
    }
  }

  .row-1 {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 64px;

    p {
      @include mixin.text('title-large');
      margin: 0;
      margin-inline-start: 8px;
    }
  }

  .row-1-left {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .theming {
    --md-sys-color-primary: #006a6a;
    --md-radio-icon-size: 16px;
  }
</style>
