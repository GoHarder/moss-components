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
  import { Tab, Tabs } from '$lib/tabs/index.js';

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

  let tabIndex = $state(0);

  let tabPanels = $derived.by(() => {
    let panels = $state([
      { label: 'Photos', hidden: false },
      { label: 'Videos', hidden: true },
      { label: 'Music', hidden: true },
    ]);

    return panels.map((panel, index) => {
      return { ...panel, hidden: index !== tabIndex };
    });
  });

  $inspect(tabIndex).with((type, value) => {
    if (!debug) return;
    console.log('tabIndex', type, value);
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

<!-- 
  MARK: Snippets 
  ------------------------------------------------
-->

<!-- 
  MARK: Dom 
  ------------------------------------------------
-->

<Section bind:expand bind:debug>
  {#snippet header()}
    <h2>Tabs</h2>
  {/snippet}

  {#snippet supportingText()}
    <p>Tabs organize and support navigation between groups of related content at the same level of hierarchy.</p>
  {/snippet}

  {#snippet hero()}
    <Hero class="tab-hero">
      <PhoneTop />
      <div class="row-1">
        <div class="row-1-left">
          <IconButton>
            <Icon>arrow_back</Icon>
          </IconButton>
          <p>My saved media</p>
        </div>
        <div>
          <IconButton>
            <Icon>attach_file</Icon>
          </IconButton>
          <IconButton>
            <Icon>today</Icon>
          </IconButton>
          <IconButton>
            <Icon>more_vert</Icon>
          </IconButton>
        </div>
      </div>
      <Tabs>
        <Tab>Video</Tab>
        <Tab>Photos</Tab>
        <Tab>Audio</Tab>
      </Tabs>
    </Hero>
  {/snippet}

  {#if expand}
    <div class="types elevated-card">
      <Elevation />
      <h3>Types</h3>
      <div class="examples">
        <div class="filled-card">
          <h4>Primary tabs</h4>
          <Tabs>
            <Tab>
              <Icon data-slot="icon">piano</Icon>
              Keyboard
            </Tab>
            <Tab>
              <Icon data-slot="icon">tune</Icon>
              Guitar
            </Tab>
          </Tabs>
          <CodeBlock lang="svelte">
            {`<Tabs>
  <Tab>
    {#snippet slotIcon()}
      <Icon slot="icon">piano</Icon>
    {/snippet}
    Keyboard
  </Tab>
  <Tab>
    {#snippet slotIcon()}
      <Icon slot="icon">tune</Icon>
    {/snippet}
    Guitar
  </Tab>
</Tabs>`}
          </CodeBlock>
          <h5>Inline icons</h5>
          <Tabs>
            <Tab inline-icon>
              <Icon data-slot="icon">piano</Icon>
              Keyboard
            </Tab>
            <Tab inline-icon>
              <Icon data-slot="icon">tune</Icon>
              Guitar
            </Tab>
          </Tabs>
          <CodeBlock lang="svelte">
            {`<Tabs>
  <Tab inline-icon>
    {#snippet slotIcon()}
      <Icon slot="icon">piano</Icon>
    {/snippet}
    Keyboard
  </Tab>
  <Tab inline-icon>
    {#snippet slotIcon()}
      <Icon slot="icon">tune</Icon>
    {/snippet}
    Guitar
  </Tab>
</Tabs>`}
          </CodeBlock>
        </div>
        <div class="filled-card">
          <h4>Secondary tabs</h4>
          <Tabs>
            <Tab secondary>
              <Icon data-slot="icon">flight</Icon>
              Travel
            </Tab>
            <Tab secondary>
              <Icon data-slot="icon">hotel</Icon>
              Hotel
            </Tab>
            <Tab secondary>
              <Icon data-slot="icon">hiking</Icon>
              Activities
            </Tab>
          </Tabs>
          <CodeBlock lang="svelte">
            {`<Tabs>
  <Tab secondary>
    {#snippet slotIcon()}
      <Icon slot="icon">flight</Icon>
    {/snippet}
    Travel
  </Tab>
  <Tab secondary>
    {#snippet slotIcon()}
      <Icon slot="icon">hotel</Icon>
    {/snippet}
    Hotel
  </Tab>
  <Tab secondary>
    {#snippet slotIcon()}
      <Icon slot="icon">hiking</Icon>
    {/snippet}
    Activities
  </Tab>
</Tabs>`}
          </CodeBlock>
        </div>
      </div>
    </div>

    <div class="usage elevated-card">
      <Elevation />
      <h3>Usage</h3>
      <div class="examples">
        <div class="filled-card">
          <Tabs>
            <Tab>Video</Tab>
            <Tab>Photos</Tab>
            <Tab>Audio</Tab>
          </Tabs>
          <Tabs>
            <Tab secondary>Birds</Tab>
            <Tab secondary>Cats</Tab>
            <Tab secondary>Dogs</Tab>
          </Tabs>
          <CodeBlock lang="svelte">
            {`<Tabs>
  <Tab>Video</Tab>
  <Tab>Photos</Tab>
  <Tab>Audio</Tab>
</Tabs>
<Tabs>
  <Tab secondary>Birds</Tab>
  <Tab secondary>Cats</Tab>
  <Tab secondary>Dogs</Tab>
</Tabs>`}
          </CodeBlock>
        </div>
        <div class="filled-card">
          <h4>Selection</h4>
          <Tabs>
            <Tab>Video</Tab>
            <Tab active>Photos</Tab>
            <Tab>Audio</Tab>
          </Tabs>
          <CodeBlock lang="svelte">
            {`<Tabs>
  <Tab>Video</Tab>
  <Tab active>Photos</Tab>
  <Tab>Audio</Tab>
</Tabs>`}
          </CodeBlock>
        </div>
        <div class="filled-card">
          <h4>Icon</h4>
          <Tabs>
            <Tab>
              <Icon data-slot="icon">piano</Icon>
              Keyboard
            </Tab>
            <Tab>
              <Icon data-slot="icon">tune</Icon>
              Guitar
            </Tab>
          </Tabs>
          <CodeBlock lang="svelte">
            {`<Tabs>
  <Tab>
    {#snippet slotIcon()}
      <Icon slot="icon">piano</Icon>
    {/snippet}
    Keyboard
  </Tab>
  <Tab>
    {#snippet slotIcon()}
      <Icon slot="icon">tune</Icon>
    {/snippet}
    Guitar
  </Tab>
</Tabs>`}
          </CodeBlock>
          <Tabs>
            <Tab>
              <Icon data-slot="icon">piano</Icon>
            </Tab>
            <Tab>
              <Icon data-slot="icon">tune</Icon>
            </Tab>
          </Tabs>
          <CodeBlock lang="svelte">
            {`<Tabs>
  <Tab>
    {#snippet slotIcon()}
      <Icon slot="icon">piano</Icon>
    {/snippet}
  </Tab>
  <Tab>
    {#snippet slotIcon()}
      <Icon slot="icon">tune</Icon>
    {/snippet}
  </Tab>
</Tabs>`}
          </CodeBlock>
        </div>
      </div>
    </div>
    <div class="elevated-card">
      <Elevation />
      <h3>Accessibility</h3>
      <Tabs aria-label="Content to view">
        <Tab aria-label="Photos">
          <Icon data-slot="icon">photo</Icon>
        </Tab>
        <Tab aria-label="Videos">
          <Icon data-slot="icon">videocam</Icon>
        </Tab>
        <Tab aria-label="Music">
          <Icon data-slot="icon">audiotrack</Icon>
        </Tab>
      </Tabs>
      <CodeBlock lang="svelte">
        {`<Tabs aria-label="Content to view">
  <Tab aria-label="Photos">
    {#snippet slotIcon()}
      <Icon slot="icon">photo</Icon>
    {/snippet}
  </Tab>
  <Tab aria-label="Videos">
    {#snippet slotIcon()}
      <Icon slot="icon">videocam</Icon>
    {/snippet}
  </Tab>
  <Tab aria-label="Music">
    {#snippet slotIcon()}
      <Icon slot="icon">audiotrack</Icon>
    {/snippet}
  </Tab>
</Tabs>`}
      </CodeBlock>
      <div class="filled-card">
        <h4>Tab panels</h4>
        <Tabs bind:index={tabIndex} aria-label="Content to view">
          <Tab id="photos-tab" aria-controls="photos-panel">Photos</Tab>
          <Tab id="videos-tab" aria-controls="videos-panel">Videos</Tab>
          <Tab id="music-tab" aria-controls="music-panel">Music</Tab>
        </Tabs>
        {#each tabPanels as { label, hidden }}
          {@const lowercase = label.toLowerCase()}
          <div id={`${lowercase}-panel`} role="tabpanel" aria-labelledby={`${lowercase}-tab`} {hidden}>
            <p>{label}</p>
          </div>
        {/each}
        <CodeBlock lang="svelte">
          {`<Tabs bind:index={tabIndex} aria-label="Content to view">
  <Tab id="photos-tab" aria-controls="photos-panel">
    Photos
  </Tab>
  <Tab id="videos-tab" aria-controls="videos-panel">
    Videos
  </Tab>
  <Tab id="music-tab" aria-controls="music-panel">
    Music
  </Tab>
</Tabs>

<div id="photos-panel" role="tabpanel" aria-labelledby="photos-tab">
  ...
</div>
<div id="videos-panel" role="tabpanel" aria-labelledby="videos-tab" hidden>
  ...
</div>
<div id="music-panel" role="tabpanel" aria-labelledby="music-tab" hidden>
  ...
</div>`}
        </CodeBlock>
      </div>
    </div>
    <div class="theming elevated-card">
      <Elevation />
      <h3>Theming</h3>
      <div class="examples">
        <div class="filled-card">
          <h4>Primary tab</h4>
          <Tabs class="primary">
            <Tab>Tab 1</Tab>
            <Tab>Tab 2</Tab>
            <Tab>Tab 3</Tab>
          </Tabs>
          <CodeBlock lang="css">
            {`:root {
  /* System tokens */
  --md-sys-color-surface: #f7faf9;
  --md-sys-color-primary: #005353;
  /* Component tokens */
  --md-primary-tab-label-text-font: cursive, system-ui;
  --md-primary-tab-label-text-size: 0.8em;
}`}
          </CodeBlock>
        </div>
        <div class="filled-card">
          <h4>Secondary tab</h4>
          <Tabs class="secondary">
            <Tab secondary>Tab 1</Tab>
            <Tab secondary>Tab 2</Tab>
            <Tab secondary>Tab 3</Tab>
          </Tabs>
          <CodeBlock lang="css">
            {`:root {
  /* System tokens */
  --md-sys-color-surface: #f7faf9;
  --md-sys-color-primary: #005353;

  /* Component tokens */
  --md-secondary-tab-label-text-font: cursive, system-ui;
  --md-secondary-tab-label-text-size: 0.8em;
}`}
          </CodeBlock>
        </div>
      </div>
    </div>
  {/if}
</Section>

<style lang="scss">
  @use '../lib/scss/mixin.scss';

  :global(.tab-hero) {
    width: calc(48ch + 32px);
    display: flex;
    flex-direction: column;

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
      .primary {
        /* System tokens */
        --md-sys-color-surface: #f7faf9;
        --md-sys-color-primary: #005353;
        /* Component tokens */
        --md-primary-tab-label-text-font: cursive, system-ui;
        --md-primary-tab-label-text-size: 0.8em;
      }

      .secondary {
        /* System tokens */
        --md-sys-color-surface: #f7faf9;
        --md-sys-color-primary: #005353;
        /* Component tokens */
        --md-secondary-tab-label-text-font: cursive, system-ui;
        --md-secondary-tab-label-text-size: 0.8em;
      }
    }
  }
</style>
