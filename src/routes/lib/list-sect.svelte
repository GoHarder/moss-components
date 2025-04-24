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
  import { Divider } from '$lib/divider/index.js';
  import { IconButton } from '$lib/icon-button/index.js';
  import { Icon } from '$lib/icon/index.js';
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
    if (!debug) return;
    console.log(event);
  }

  // MARK: Lifecycle
  // ------------------------------------------------
</script>

<!-- 
  MARK: Snippets 
  ------------------------------------------------
-->

{#snippet heroListItem(src: string, headline: string)}
  <ListItem type="button" {onclick}>
    {#snippet slotStart()}<img slot="start" alt="" {src} />{/snippet}
    {#snippet slotEnd()}<Icon slot="end">more_horiz</Icon>{/snippet}
    {#snippet slotHeadline()}<div slot="headline">{headline}</div>{/snippet}
  </ListItem>
{/snippet}

<!-- 
  MARK: Dom 
  ------------------------------------------------
-->

<Section bind:expand bind:debug>
  {#snippet header()}
    <h2>Lists</h2>
  {/snippet}

  {#snippet supportingText()}
    <p>Lists are continuous, vertical indexes of text and images.</p>
  {/snippet}

  {#snippet hero()}
    <Hero class="list-hero">
      <PhoneTop class="hero-phone" />
      <div class="row-1">
        <div class="row-1-left">
          <IconButton>
            <Icon>menu</Icon>
          </IconButton>
          <p>Recipes</p>
        </div>
        <div>
          <IconButton>
            <Icon>search</Icon>
          </IconButton>
          <IconButton>
            <Icon>more_vert</Icon>
          </IconButton>
        </div>
      </div>
      <List>
        {@render heroListItem('https://picsum.photos/seed/6/50/50', 'Fresh baked breads')}
        <Divider />
        {@render heroListItem('https://picsum.photos/seed/12/50/50', 'Tacos')}
        <Divider />
        {@render heroListItem('https://picsum.photos/seed/9/50/50', 'Salads')}
      </List>
    </Hero>
  {/snippet}

  {#if expand}
    <div class="usage elevated-card">
      <Elevation />
      <h3>Usage</h3>
      <div class="usage-example">
        <List>
          <ListItem>Fruits</ListItem>
          <Divider />
          <ListItem>Apple</ListItem>
          <ListItem>
            <div data-slot="headline">Banana</div>
            <div data-slot="supporting-text">Banana is a yellow fruit</div>
          </ListItem>
          <ListItem>
            <div data-slot="headline">Cucumber</div>
            <div data-slot="supporting-text">Cucumbers are long green fruits that are just as long as this multi-line description</div>
          </ListItem>
          <ListItem type="link" href="https://github.com/material-components/material-web" target="_blank">
            <Icon data-slot="end">open_in_new</Icon>
            <div data-slot="headline">Shop for Kiwis</div>
            <div data-slot="supporting-text">This will link you out in a new tab</div>
          </ListItem>
        </List>
      </div>
      <CodeBlock lang="svelte">
        {`<List>
  <ListItem>Fruits</ListItem>
  <Divider />
  <ListItem>Apple</ListItem>
  <ListItem>
    {#snippet slotHeadline()}
      <div slot="headline">Banana</div>
    {/snippet}
    {#snippet slotSupportingText()}
      <div slot="supporting-text">Banana is a yellow fruit</div>
    {/snippet}
  </ListItem>
  <ListItem>
    {#snippet slotHeadline()}
      <div slot="headline">Cucumber</div>
    {/snippet}
    {#snippet slotSupportingText()}
      <div slot="supporting-text">
        Cucumbers are long green fruits that are just as long as 
        this multi-line description
      </div>
    {/snippet}
  </ListItem>
  <ListItem 
    type="link" 
    href="https://github.com/material-components/material-web" 
    target="_blank"
  >
    {#snippet slotEnd()}
      <Icon slot="end">open_in_new</Icon>
    {/snippet}
    {#snippet slotHeadline()}
      <div slot="headline">Shop for Kiwis</div>
    {/snippet}
    {#snippet slotSupportingText()}
      <div slot="supporting-text">
        This will link you out in a new tab
      </div>
    {/snippet}
  </ListItem>
</List>`}
      </CodeBlock>
    </div>

    <div class="icon-items elevated-card">
      <Elevation />
      <h3>Icon Items</h3>
      <div class="fit-example">
        <List>
          <ListItem>
            <svg data-slot="start" style="height: 24px" viewBox="0 0 160 200">
              <path
                fill="currentColor"
                d="m160 80v80l-40-40zm-40 40v80l40-40zm0-80v80l-40-40zm-40 40v80l40-40zm-40-40v80l40-40zm40-40v80l-40-40zm-40 120v80l-40-40zm-40-40v80l40-40z"
              />
            </svg>
            Lit
          </ListItem>
          <Divider />
          <ListItem>
            <Icon data-slot="start">polymer</Icon>
            Polymer
          </ListItem>
          <Divider />
          <ListItem>
            <svg data-slot="start" style="height: 24px" viewBox="0 0 250 250">
              <polygon points="108,135.4 125,135.4 125,135.4 125,135.4 142,135.4 125,94.5" />
              <path
                d="M125,30L125,30L125,30L31.9,63.2l14.2,123.1L125,230l0,0l0,0l78.9-43.7l14.2-123.1L125,30z M183.1,182.6h-21.7h0
                  l-11.7-29.2H125h0h0h-24.7l-11.7,29.2h0H66.9h0L125,52.1l0,0l0,0l0,0l0,0L183.1,182.6L183.1,182.6z"
              />
            </svg>
            Angular
          </ListItem>
        </List>
      </div>
      <CodeBlock lang="svelte">
        {`<List>
  <ListItem>
    {#snippet slotStart()}
      <svg slot="start" style="height: 24px" viewBox="0 0 160 200">
        <path
          fill="currentColor"
          d="m160 80v80l-40-40zm-40 40v80l40-40zm0-80v80l-40-40zm-40 
          40v80l40-40zm-40-40v80l40-40zm40-40v80l-40-40zm-40 
          120v80l-40-40zm-40-40v80l40-40z"
        />
      </svg>
    {/snippet}
    Lit
  </ListItem>
  <Divider />
  <ListItem>
    {#snippet slotStart()}
      <Icon slot="start">polymer</Icon>
    {/snippet}
    Polymer
  </ListItem>
  <Divider />
  <ListItem>
    {#snippet slotStart()}
      <svg slot="start" style="height: 24px" viewBox="0 0 250 250">
        <polygon 
          points="108,135.4 125,135.4 125,135.4 125,135.4 
          142,135.4 125,94.5" 
        />
        <path
          d="M125,30L125,30L125,30L31.9,63.2l14.2,123.1
          L125,230l0,0l0,0l78.9-43.7l14.2-123.1L125,30z
          M183.1,182.6h-21.7h0l-11.7-29.2H125h0h0h-24.7
          l-11.7,29.2h0H66.9h0L125,52.1l0,0l0,0l0,0l0,0
          L183.1,182.6L183.1,182.6z"
        />
      </svg>
    {/snippet}
    Angular
  </ListItem>
</List>`}
      </CodeBlock>
    </div>

    <div class="image-items elevated-card">
      <Elevation />
      <h3>Image Items</h3>
      <div class="fit-example">
        <List>
          <ListItem>
            <img data-slot="start" alt="" src="https://picsum.photos/seed/1/50/50" />
            Cat
          </ListItem>
          <Divider />
          <ListItem>
            <img data-slot="start" alt="" src="https://picsum.photos/seed/2/50/50" />
            Kitty Cat
          </ListItem>
          <Divider />
          <ListItem>
            <img data-slot="start" alt="" src="https://picsum.photos/seed/3/50/50" />
            Cate
          </ListItem>
        </List>
      </div>
      <CodeBlock lang="svelte">
        {`<List>
  <ListItem>
    {#snippet slotStart()}
      <img slot="start" alt="" src="https://picsum.photos/seed/1/50/50" />
    {/snippet}
    Cat
  </ListItem>
  <Divider />
  <ListItem>
    {#snippet slotStart()}
      <img slot="start" alt="" src="https://picsum.photos/seed/2/50/50" />
    {/snippet}
    Kitty Cat
  </ListItem>
  <Divider />
  <ListItem>
    {#snippet slotStart()}
      <img slot="start" alt="" src="https://picsum.photos/seed/3/50/50" />
    {/snippet}
    Cate
  </ListItem>
</List>`}
      </CodeBlock>
    </div>

    <div class="theming elevated-card">
      <Elevation />
      <h3>Theming</h3>
      <div class="examples">
        <div class="filled-card">
          <h4>List</h4>
          <div class="list-example">
            <List>
              <ListItem>
                <div data-slot="headline">Apple</div>
                <div data-slot="supporting-text">In stock</div>
                <div data-slot="trailing-supporting-text">+100</div>
              </ListItem>
              <Divider />
              <ListItem>
                <div data-slot="headline">Banana</div>
                <div data-slot="supporting-text">In stock</div>
                <div data-slot="trailing-supporting-text">56</div>
              </ListItem>
              <Divider />
              <ListItem>
                <div data-slot="headline">Cucumber</div>
                <div data-slot="supporting-text">Low stock</div>
                <div data-slot="trailing-supporting-text">5</div>
              </ListItem>
            </List>
          </div>

          <CodeBlock lang="svelte">
            {`<List>
  <ListItem>
    {#snippet slotStart()}
      <div slot="headline">Apple</div>
    {/snippet}
    {#snippet slotSupportingText()}
      <div slot="supporting-text">In stock</div>
    {/snippet}
    {#snippet slotTrailingSupportingText()}
      <div slot="trailing-supporting-text">+100</div>
    {/snippet}
  </ListItem>
  <Divider />
  <ListItem>
    {#snippet slotStart()}
      <div slot="headline">Banana</div>
    {/snippet}
    {#snippet slotSupportingText()}
      <div slot="supporting-text">In stock</div>
    {/snippet}
    {#snippet slotTrailingSupportingText()}
      <div slot="trailing-supporting-text">56</div>
    {/snippet}
  </ListItem>
  <Divider />
  <ListItem>
    {#snippet slotStart()}
      <div slot="headline">Cucumber</div>
    {/snippet}
    {#snippet slotSupportingText()}
      <div slot="supporting-text">Low stock</div>
    {/snippet}
    {#snippet slotTrailingSupportingText()}
      <div slot="trailing-supporting-text">5</div>
    {/snippet}
  </ListItem>
</List>`}
          </CodeBlock>
          <CodeBlock lang="css">
            {`:root {
  --md-list-container-color: #f4fbfa;
  --md-list-item-label-text-color: #161d1d;
  --md-list-item-supporting-text-color: #3f4948;
  --md-list-item-trailing-supporting-text-color: #3f4948;
  --md-list-item-label-text-font: system-ui;
  --md-list-item-supporting-text-font: system-ui;
  --md-list-item-trailing-supporting-text-font: system-ui;
}
    
[slot='trailing-supporting-text'] {
    width: 30px;
    text-align: end;
}`}
          </CodeBlock>
        </div>
        <div class="filled-card">
          <h4>Icon List</h4>
          <div class="icon-list-example">
            <List>
              <ListItem>
                <Icon data-slot="start">egg</Icon>
                <Icon data-slot="end">recommend</Icon>
                <div data-slot="headline">Eggs</div>
              </ListItem>
              <Divider />
              <ListItem class="unhealthy">
                <Icon data-slot="start">icecream</Icon>
                <Icon data-slot="end">dangerous</Icon>
                <div data-slot="headline">Ice Cream</div>
              </ListItem>
              <Divider />
              <ListItem>
                <Icon data-slot="start">nutrition</Icon>
                <Icon data-slot="end">recommend</Icon>
                <div data-slot="headline">Orange</div>
              </ListItem>
            </List>
          </div>
          <CodeBlock lang="svelte">
            {`<List>
  <ListItem>
    {#snippet slotStart()}
      <Icon slot="start">egg</Icon>
    {/snippet}
    {#snippet slotEnd()}
      <Icon slot="end">recommend</Icon>
    {/snippet}
    {#snippet slotHeadline()}
      <div slot="headline">Eggs</div>
    {/snippet}
  </ListItem>
  <Divider />
  <ListItem class="unhealthy">
    {#snippet slotStart()}
      <Icon slot="start">icecream</Icon>
    {/snippet}
    {#snippet slotEnd()}
      <Icon slot="end">dangerous</Icon>
    {/snippet}
    {#snippet slotHeadline()}
      <div slot="headline">Ice Cream</div>
    {/snippet}
  </ListItem>
  <Divider />
  <ListItem>
    {#snippet slotStart()}
      <Icon slot="start">nutrition</Icon>
    {/snippet}
    {#snippet slotEnd()}
      <Icon slot="end">recommend</Icon>
    {/snippet}
    {#snippet slotHeadline()}
      <div slot="headline">Orange</div>
    {/snippet}
  </ListItem>
</List>`}
          </CodeBlock>
          <CodeBlock lang="css">
            {`:root {
  background-color: #f4fbfa;
  --md-list-container-color: #f4fbfa;
  --md-list-item-label-text-color: #161d1d;
  --md-list-item-leading-icon-color: #006a6a;
  --md-list-item-trailing-icon-color: #006a6a;
  --md-list-item-leading-icon-size: 20px;
  --md-list-item-trailing-icon-size: 20px;
}
    
.unhealthy {
  --md-list-item-trailing-icon-color: #ba1a1a;
}`}
          </CodeBlock>
        </div>

        <div class="filled-card">
          <h4>Image List</h4>
          <div class="image-list-example">
            <List>
              <ListItem>
                <img data-slot="start" alt="" src="https://picsum.photos/seed/4/100/50" />
                <div data-slot="headline">Wide cat</div>
              </ListItem>
              <Divider />
              <ListItem>
                <img data-slot="start" alt="" src="https://picsum.photos/seed/5/100/50" />
                <div data-slot="headline">Round kitty cat</div>
              </ListItem>
              <Divider />
              <ListItem>
                <img data-slot="start" alt="" src="https://picsum.photos/seed/6/100/50" />
                <div data-slot="headline">Soft cat</div>
              </ListItem>
            </List>
          </div>
          <CodeBlock lang="svelte">
            {`<List> 
  <ListItem>
    {#snippet slotStart()}
      <img slot="start" alt="" src="..." />
    {/snippet}
    {#snippet slotHeadline()}
      <div slot="headline">Wide cat</div>
    {/snippet}
  </ListItem>
  <Divider />
  <ListItem>
    {#snippet slotStart()}
      <img slot="start" alt="" src="..." />
    {/snippet}
    {#snippet slotHeadline()}
      <div slot="headline">Round kitty cat</div>
    {/snippet}
  </ListItem>
  <Divider />
  <ListItem>
    {#snippet slotStart()}
      <img slot="start" alt="" src="..." />
    {/snippet}
    {#snippet slotHeadline()}
      <div slot="headline">Soft cat</div>
    {/snippet}
  </ListItem>
</List>`}
          </CodeBlock>
          <CodeBlock lang="css">
            {`:root {
  background-color: #f4fbfa;
  --md-list-container-color: #f4fbfa;
  --md-list-item-label-text-color: #161d1d;
  --md-list-item-leading-image-height: 50px;
  --md-list-item-leading-image-width: 100px;
  --md-list-item-leading-image-shape: 25px;
}`}
          </CodeBlock>
        </div>
      </div>
    </div>
  {/if}
</Section>

<style lang="scss">
  @use '../lib/scss/mixin.scss';

  :global(.list-hero) {
    @include mixin.hero();
    background-color: var(--md-sys-color-surface-container);
    width: 432px;

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

  .usage-example {
    width: 40ch;
  }

  .fit-example {
    width: fit-content;
  }

  .examples {
    margin-block-start: 16px;
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
    align-items: flex-start;
  }

  .theming {
    :global(.list-example) {
      --md-list-container-color: #f4fbfa;
      --md-list-item-label-text-color: #161d1d;
      --md-list-item-supporting-text-color: #3f4948;
      --md-list-item-trailing-supporting-text-color: #3f4948;
      --md-list-item-label-text-font: system-ui;
      --md-list-item-supporting-text-font: system-ui;
      --md-list-item-trailing-supporting-text-font: system-ui;
      width: 150px;
    }

    :global([slot='trailing-supporting-text']) {
      width: 30px;
      text-align: end;
    }

    :global(.icon-list-example) {
      background-color: #f4fbfa;
      --md-list-container-color: #f4fbfa;
      --md-list-item-label-text-color: #161d1d;
      --md-list-item-leading-icon-color: #006a6a;
      --md-list-item-trailing-icon-color: #006a6a;
      --md-list-item-leading-icon-size: 20px;
      --md-list-item-trailing-icon-size: 20px;
      width: 200px;
    }

    :global(.unhealthy) {
      --md-list-item-trailing-icon-color: #ba1a1a;
    }

    :global(.image-list-example) {
      background-color: #f4fbfa;
      --md-list-container-color: #f4fbfa;
      --md-list-item-label-text-color: #161d1d;
      --md-list-item-leading-image-height: 50px;
      --md-list-item-leading-image-width: 100px;
      // --md-list-item-leading-image-shape: 25px;
    }

    :global(.image-list-example img) {
      border-radius: 25px;
    }
  }
</style>
