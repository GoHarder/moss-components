<script lang="ts">
  // MARK: Types
  // ------------------------------------------------
  // MARK: Components
  // ------------------------------------------------
  import Section from './custom/section.svelte';
  import CodeBlock from './custom/code-block.svelte';
  import Hero from './custom/hero.svelte';
  import { Elevation } from '$lib/elevation/index.js';
  import { Icon } from '$lib/icon/index.js';
  import { Fab } from '$lib/fab/index.js';

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
  function onclick(event: MouseEvent) {
    if (debug) {
      console.log(event);
    }
  }

  // MARK: Lifecycle
  // ------------------------------------------------
</script>

<!-- 
  MARK: Snippets 
  ------------------------------------------------
-->

{#snippet svgIcon()}
  <svg data-slot="icon" viewBox="0 0 36 36">
    <path fill="#34A853" d="M16 16v14h4V20z"></path>
    <path fill="#4285F4" d="M30 16H20l-4 4h14z"></path>
    <path fill="#FBBC05" d="M6 16v4h10l4-4z"></path>
    <path fill="#EA4335" d="M20 16V6h-4v14z"></path>
    <path fill="none" d="M0 0h36v36H0z"></path>
  </svg>
{/snippet}

<!-- 
  MARK: Dom 
  ------------------------------------------------
-->

<Section bind:expand bind:debug>
  {#snippet header()}
    {#if expand}
      <h2>Floating action buttons (FAB)</h2>
    {:else}
      <h2>FAB</h2>
    {/if}
  {/snippet}

  {#snippet supportingText()}
    <div>
      <p>FABs help people take primary actions.</p>
      <p>They're used to represent the most important action on a screen.</p>
    </div>
  {/snippet}

  {#snippet hero()}
    <Hero>
      <Fab {onclick}>
        <Icon data-slot="icon">edit</Icon>
      </Fab>
    </Hero>
  {/snippet}

  {#if expand}
    <div class="types elevated-card">
      <Elevation />
      <h3>Types</h3>
      <div class="examples">
        <div class="filled-card">
          <h4>FAB</h4>
          <Fab>
            <Icon data-slot="icon">edit</Icon>
          </Fab>
          <CodeBlock lang="svelte">
            {`<Fab>
  {#snippet slotIcon()}
    <Icon slot="icon">
      edit
    </Icon>
  {/snippet}
</Fab>`}
          </CodeBlock>
          <h4>Extended</h4>
          <Fab label="Edit">
            <Icon data-slot="icon">edit</Icon>
          </Fab>
          <CodeBlock lang="svelte">
            {`<Fab label="Edit">
  {#snippet slotIcon()}
    <Icon slot="icon">
      edit
    </Icon>
  {/snippet}
</Fab>`}
          </CodeBlock>
          <h5>Without icon</h5>
          <Fab label="Reroute" />
          <CodeBlock lang="svelte">
            {`<Fab label="Reroute" />`}
          </CodeBlock>
          <h4>Colors</h4>
          <Fab variant="primary">
            <Icon data-slot="icon">edit</Icon>
          </Fab>
          <Fab variant="secondary">
            {#snippet slotIcon()}
              <Icon slot="icon">edit</Icon>
            {/snippet}
          </Fab>
          <Fab variant="tertiary">
            {#snippet slotIcon()}
              <Icon slot="icon">edit</Icon>
            {/snippet}
          </Fab>
          <CodeBlock lang="svelte">
            {`<Fab variant="primary">
  {#snippet slotIcon()}
    <Icon slot="icon">edit</Icon>
  {/snippet}
</Fab>
<Fab variant="secondary">
  {#snippet slotIcon()}
    <Icon slot="icon">edit</Icon>
  {/snippet}
</Fab>
<Fab variant="tertiary">
  {#snippet slotIcon()}
    <Icon slot="icon">edit</Icon>
  {/snippet}
</Fab>`}
          </CodeBlock>
          <h4>Sizes</h4>
          <Fab size="small">
            {#snippet slotIcon()}
              <Icon slot="icon">edit</Icon>
            {/snippet}
          </Fab>
          <Fab>
            {#snippet slotIcon()}
              <Icon slot="icon">accessible_forward</Icon>
            {/snippet}
          </Fab>
          <Fab size="large">
            {#snippet slotIcon()}
              <Icon slot="icon">palette</Icon>
            {/snippet}
          </Fab>
          <CodeBlock lang="svelte">
            {`<Fab size="small">
  {#snippet slotIcon()}
    <Icon slot="icon">edit</Icon>
  {/snippet}
</Fab>
<Fab>
  {#snippet slotIcon()}
    <Icon slot="icon">
      accessible_forward
    </Icon>
  {/snippet}
</Fab>
<Fab size="large">
  {#snippet slotIcon()}
    <Icon slot="icon">palette</Icon>
  {/snippet}
</Fab>`}
          </CodeBlock>
        </div>
        <div class="filled-card">
          <h4>Branded FAB</h4>
          <Fab aria-label="Add" branded>
            {@render svgIcon()}
          </Fab>
          <CodeBlock lang="svelte">
            {`<Fab aria-label="Add" branded>
  {#snippet slotIcon()}
    <svg slot="icon" viewBox="0 0 36 36">
      <path fill="#34A853" d="M16 16v14h4V20z"></path>
      <path fill="#4285F4" d="M30 16H20l-4 4h14z"></path>
      <path fill="#FBBC05" d="M6 16v4h10l4-4z"></path>
      <path fill="#EA4335" d="M20 16V6h-4v14z"></path>
      <path fill="none" d="M0 0h36v36H0z"></path>
    </svg>
  {/snippet}
</Fab>`}
          </CodeBlock>
          <h4>Extended</h4>
          <Fab label="Add" branded>
            {@render svgIcon()}
          </Fab>
          <CodeBlock lang="svelte">
            {`<Fab label="Add" branded>
  {#snippet slotIcon()}
    <svg slot="icon" viewBox="0 0 36 36">
      <path fill="#34A853" d="M16 16v14h4V20z"></path>
      <path fill="#4285F4" d="M30 16H20l-4 4h14z"></path>
      <path fill="#FBBC05" d="M6 16v4h10l4-4z"></path>
      <path fill="#EA4335" d="M20 16V6h-4v14z"></path>
      <path fill="none" d="M0 0h36v36H0z"></path>
    </svg>
  {/snippet}
</Fab>`}
          </CodeBlock>
          <h4>Sizes</h4>
          <Fab branded>
            {@render svgIcon()}
          </Fab>
          <Fab size="large" branded>
            {@render svgIcon()}
          </Fab>
          <CodeBlock lang="svelte">
            {`<Fab aria-label="Add" branded>
  {#snippet slotIcon()}
    <svg slot="icon" viewBox="0 0 36 36">
      <path fill="#34A853" d="M16 16v14h4V20z"></path>
      <path fill="#4285F4" d="M30 16H20l-4 4h14z"></path>
      <path fill="#FBBC05" d="M6 16v4h10l4-4z"></path>
      <path fill="#EA4335" d="M20 16V6h-4v14z"></path>
      <path fill="none" d="M0 0h36v36H0z"></path>
    </svg>
  {/snippet}
</Fab>

<Fab aria-label="Add" branded size="large">
  {#snippet slotIcon()}
    <svg slot="icon" viewBox="0 0 36 36">
      <path fill="#34A853" d="M16 16v14h4V20z"></path>
      <path fill="#4285F4" d="M30 16H20l-4 4h14z"></path>
      <path fill="#FBBC05" d="M6 16v4h10l4-4z"></path>
      <path fill="#EA4335" d="M20 16V6h-4v14z"></path>
      <path fill="none" d="M0 0h36v36H0z"></path>
    </svg>
  {/snippet}
</Fab>`}
          </CodeBlock>
        </div>
      </div>
    </div>

    <div class="elevated-card">
      <Elevation />
      <h3>Usage</h3>
      <Fab>
        <Icon data-slot="icon">edit</Icon>
      </Fab>
      <CodeBlock lang="svelte">
        {`<Fab>
  {#snippet slotIcon()}
    <Icon slot="icon">
      edit
    </Icon>
  {/snippet}
</Fab>`}
      </CodeBlock>
      <div class="filled-card">
        <h4>Lowered</h4>
        <Fab lowered>
          <Icon data-slot="icon">edit</Icon>
        </Fab>
        <CodeBlock lang="svelte">
          {`<Fab lowered>
  {#snippet slotIcon()}
    <Icon slot="icon">
      edit
    </Icon>
  {/snippet}
</Fab>`}
        </CodeBlock>
      </div>
    </div>
    <div class="elevated-card">
      <Elevation />
      <h3>Accessibility</h3>
      <Fab aria-label="Edit Comment">
        {#snippet slotIcon()}
          <Icon slot="icon">edit</Icon>
        {/snippet}
      </Fab>
      <CodeBlock lang="svelte">
        {`<Fab aria-label="Edit Comment">
  {#snippet slotIcon()}
    <Icon slot="icon">
      edit
    </Icon>
  {/snippet}
</Fab>`}
      </CodeBlock>
    </div>

    <div class="theming elevated-card">
      <Elevation />
      <h3>Theming</h3>
      <div class="examples">
        <div class="filled-card">
          <h4>FAB</h4>
          <Fab class="fab">
            <Icon data-slot="icon">edit</Icon>
          </Fab>
          <Fab label="Edit" class="fab">
            <Icon data-slot="icon">edit</Icon>
          </Fab>
          <CodeBlock lang="css">
            {`:root {
  --md-sys-color-surface-container-high: #e3e9e9;
  --md-sys-color-primary: #006a6a;
  --md-fab-container-shape: 0px;
  --md-fab-icon-size: 36px;
  background-color: #f4fbfa;
}`}
          </CodeBlock>
        </div>

        <div class="filled-card">
          <h4>Branded FAB</h4>
          <Fab aria-label="Add" branded class="branded">
            {@render svgIcon()}
          </Fab>
          <Fab label="Add" branded class="branded">
            {@render svgIcon()}
          </Fab>
          <CodeBlock lang="css">
            {`:root {
  --md-sys-color-surface-container-high: #e3e9e9;
  --md-sys-color-on-surface: #161d1d;
  --md-fab-branded-icon-size: 48px;
  --md-fab-branded-container-shape: 0px;
  background-color: #f4fbfa;
}`}
          </CodeBlock>
        </div>
      </div>
    </div>
  {/if}
</Section>

<style lang="scss">
  .theming {
    :global {
      .fab {
        --md-sys-color-surface-container-high: #e3e9e9;
        --md-sys-color-primary: #006a6a;
        --md-fab-container-shape: 0px;
        --md-fab-icon-size: 36px;
        background-color: #f4fbfa;
      }

      .branded {
        --md-sys-color-surface-container-high: #e3e9e9;
        --md-sys-color-on-surface: #161d1d;
        --md-fab-branded-icon-size: 48px;
        --md-fab-branded-container-shape: 0px;
        background-color: #f4fbfa;
      }
    }
  }

  .examples {
    margin-block-start: 16px;
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
    align-items: flex-start;
  }
</style>
