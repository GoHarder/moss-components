<script lang="ts">
  import { type Snippet, onDestroy, onMount } from 'svelte';
  import { MDCTooltip } from '@material/tooltip';

  // MARK: Types
  // ------------------------------------------------
  type Props = {
    /** The child elements to render. */
    children: Snippet;
    /** The tooltip id. */
    id: string;
    /** The class to apply to the root element. */
    class?: string;
  };

  // MARK: Properties
  // ------------------------------------------------
  let { children, id, class: propClass }: Props = $props();

  // MARK: State
  // ------------------------------------------------
  let root: HTMLDivElement | undefined = $state();
  let mdComp: MDCTooltip | undefined = $state();

  // MARK: Lifecycle
  // ------------------------------------------------
  onMount(() => {
    if (!root) return;
    const body = document.body;
    body.appendChild(root);
    mdComp = new MDCTooltip(root);
  });

  onDestroy(() => {
    mdComp?.destroy();
  });
</script>

<div bind:this={root} {id} class={['mdc-tooltip', 'moss-tooltip', propClass]} role="tooltip" aria-hidden="true">
  <div class="mdc-tooltip__surface mdc-tooltip__surface-animation">
    <span class="mdc-tooltip__label">{@render children()}</span>
  </div>
</div>

<style lang="scss" global>
  @use '@material/tooltip';
  @use '@material/tooltip/styles';
  .moss-tooltip {
    @include tooltip.fill-color(var(--md-sys-color-inverse-surface));
    @include tooltip.label-ink-color(var(--md-sys-color-inverse-on-surface));
    --mdc-shape-small: var(--md-sys-shape-corner-extra-small);
    --mdc-typography-caption-font-family: var(--md-sys-typescale-body-small-font);
    --mdc-typography-caption-font-size: var(--md-sys-typescale-body-small-size);
    --mdc-typography-caption-font-weight: var(--md-sys-typescale-body-small-weight);
    --mdc-typography-caption-letter-spacing: var(--md-sys-typescale-body-small-tracking);
  }
</style>
