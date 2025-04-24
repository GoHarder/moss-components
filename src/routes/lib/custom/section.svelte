<script lang="ts">
  import { type Snippet } from 'svelte';

  // MARK: Types
  // ------------------------------------------------
  type Props = {
    /** The child elements to render. */
    children: Snippet;
    /**
     * The title of the section.
     * @example <h2>{title}</h2>
     */
    header: Snippet;

    id?: string;

    hero?: Snippet;
    /**
     * The supporting text of the section.
     * @example <p>{supportingText}</p>
     */
    supportingText?: Snippet;
    expand?: boolean;

    debug?: boolean;

    plain?: boolean;

    [key: string]: any;
  };

  // MARK: Components
  // ------------------------------------------------
  import { Elevation } from '$lib/elevation/index.js';
  import { IconButton } from '$lib/icon-button/index.js';
  import { Icon } from '$lib/icon/index.js';

  // MARK: Stores
  // ------------------------------------------------
  // MARK: Properties
  // ------------------------------------------------
  let { children, id, hero, header, supportingText, expand = $bindable(false), debug = $bindable(false), plain = false, ...props }: Props = $props();

  // MARK: Methods
  // ------------------------------------------------
  // MARK: Constants
  // ------------------------------------------------
  // MARK: Variables
  // ------------------------------------------------
  let root: HTMLElement | undefined = $state();

  // MARK: Contexts
  // ------------------------------------------------
  // MARK: Subscriptions
  // ------------------------------------------------
  // MARK: Reactive Rules
  // ------------------------------------------------
  // $effect(() => {
  //   if (!expand) return;
  //   root?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  // });

  // MARK: Events
  // ------------------------------------------------
  // MARK: Lifecycle
  // ------------------------------------------------
</script>

<section bind:this={root} class={{ expand }} {...props}>
  <Elevation />
  <header>
    <div class="row-1">
      {@render header()}
      <div>
        {#if !plain}
          <IconButton bind:selected={debug} toggle>
            <Icon>bug_report</Icon>
          </IconButton>
        {/if}
        <IconButton bind:selected={expand} toggle>
          <Icon>expand_content</Icon>
          {#snippet slotSelected()}
            <Icon slot="selected">collapse_content</Icon>
          {/snippet}
        </IconButton>
      </div>
    </div>

    {#if expand}
      {@render supportingText?.()}
    {/if}
  </header>

  <div class={{ split: expand }}>
    {@render hero?.()}

    <div class="content">
      {@render children()}
    </div>
  </div>
</section>

<style lang="scss">
  @mixin text($style) {
    font-family: var(--md-sys-typescale-#{$style}-font);
    font-size: var(--md-sys-typescale-#{$style}-size);
    font-weight: var(--md-sys-typescale-#{$style}-weight);
    line-height: var(--md-sys-typescale-#{$style}-line-height);
    letter-spacing: var(--md-sys-typescale-#{$style}-tracking);
  }

  section {
    // position: relative;
    // --md-elevation-level: 1;
    // background-color: var(--md-sys-color-surface-container-low);
    // border-radius: var(--md-sys-shape-corner-medium);
    // padding: 16px;

    background-color: var(--md-sys-color-surface);
    border-radius: var(--md-sys-shape-corner-medium);
    border-color: var(--md-sys-color-outline-variant);
    border-width: 1px;
    border-style: solid;
    padding: 16px;

    :global(h3) {
      @include text('title-medium');
      margin: 0 0 0.5rem;
    }

    :global(h4) {
      @include text('title-small');
      margin: 0.5rem 0;
    }

    :global(h5) {
      @include text('title-small');
      margin: 0.5rem 0;
    }

    &.expand {
      width: 100%;
    }
  }

  .split {
    display: grid;
    grid-template-columns: min-content 1fr;
    gap: 16px;
    align-items: start;
  }

  .content {
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
    align-items: flex-start;
  }

  header {
    display: flex;
    flex-direction: column;
    gap: 14px;
    margin-block-end: 14px;

    .row-1 {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    :global(h2) {
      @include text('title-medium');
      margin: 0;
    }

    :global(p) {
      @include text('body-medium');
      margin: 0;
    }
  }
</style>
