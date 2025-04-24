<script lang="ts">
  // MARK: Types
  // ------------------------------------------------
  // MARK: Components
  // ------------------------------------------------
  import Section from './custom/section.svelte';
  import CodeBlock from './custom/code-block.svelte';
  import { Elevation } from '$lib/elevation/index.js';
  import Hero from './custom/hero.svelte';
  import { Divider } from '$lib/divider/index.js';
  import { List, ListItem } from '$lib/list/index.js';

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

<!-- 
  MARK: Snippets 
  ------------------------------------------------
-->

{#snippet heroListItem(src: string, headline: string, supportingText: string, trailingSupportingText: string)}
  <ListItem>
    {#snippet slotStart()}
      <img slot="start" alt="" style="border-radius: var(--md-sys-shape-corner-small)" {src} />
    {/snippet}
    {#snippet slotHeadline()}<div slot="headline">{headline}</div>{/snippet}
    {#snippet slotSupportingText()}<div slot="supporting-text">{supportingText}</div>{/snippet}
    {#snippet slotTrailingSupportingText()}<div slot="trailing-supporting-text">{trailingSupportingText}</div>{/snippet}
  </ListItem>
{/snippet}

<!-- 
  MARK: Dom 
  ------------------------------------------------
-->

<Section bind:expand plain>
  {#snippet header()}
    <h2>Dividers</h2>
  {/snippet}

  {#snippet supportingText()}
    <p>A divider is a thin line that groups content in lists and containers.</p>
  {/snippet}

  {#snippet hero()}
    <Hero class="divider-hero">
      <List>
        {@render heroListItem('https://picsum.photos/seed/1/100/50', 'A Year in Ecuador', '10 episodes', '68 min')}
        <Divider />
        {@render heroListItem('https://picsum.photos/seed/2/100/50', 'Wizards & Winona', '56 episodes', '109 min')}
        <Divider />
        {@render heroListItem('https://picsum.photos/seed/3/100/50', 'Gamer Course', '79 episodes', '57 min')}
        <Divider />
        {@render heroListItem('https://picsum.photos/seed/4/100/50', 'Song Histories', '38 episodes', '46 min')}
      </List>
    </Hero>
  {/snippet}

  {#if expand}
    <div class="usage elevated-card">
      <Elevation />
      <h3>Usage</h3>
      <section>
        <p>Lorem ipsum...</p>
        <Divider />
        <p>Lorem ipsum...</p>
      </section>
      <CodeBlock lang="svelte">
        {`<section>
  <p>Lorem ipsum...</p>
  <Divider />
  <p>Lorem ipsum...</p>
</section>`}
      </CodeBlock>
      <div class="filled-card">
        <h4>Inset Dividers</h4>
        <section>
          <p>Material 2</p>
          <Divider inset />
          <p>Material 3</p>
        </section>
        <CodeBlock lang="svelte">
          {`<section>
  <p>Lorem ipsum...</p>
  <Divider inset />
  <p>Lorem ipsum...</p>
</section>`}
        </CodeBlock>
        <section>
          <p>Material 2</p>
          <Divider inset-start />
          <p>Material 3</p>
        </section>
        <CodeBlock lang="svelte">
          {`<section>
  <p>Lorem ipsum...</p>
  <Divider inset-start />
  <p>Lorem ipsum...</p>
</section>`}
        </CodeBlock>
      </div>
    </div>

    <div class="theming elevated-card">
      <Elevation />
      <h3>Theming</h3>
      <section>
        <p>Lorem ipsum...</p>
        <Divider class="custom" />
        <p>Lorem ipsum...</p>
      </section>
      <CodeBlock lang="svelte">
        {`:root {
  --md-sys-color-outline-variant: #BEC9C8;
  --md-divider-thickness: 2px;
}`}
      </CodeBlock>
    </div>
  {/if}
</Section>

<style lang="scss">
  @use '../lib/scss/mixin.scss';

  :global(.divider-hero) {
    @include mixin.hero();
    width: 370px;
  }

  section {
    background-color: var(--md-sys-color-surface-container);
    border-radius: var(--md-sys-shape-corner-small);
    padding: 8px;
  }

  .theming {
    :global(.custom) {
      --md-sys-color-outline-variant: #bec9c8;
      --md-divider-thickness: 2px;
    }
  }
</style>
