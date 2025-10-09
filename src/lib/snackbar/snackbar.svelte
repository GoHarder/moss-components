<script lang="ts">
  import { type Snippet, onDestroy, onMount } from 'svelte';
  import type { Attachment } from 'svelte/attachments';
  import { MDCSnackbar } from '@material/snackbar';

  // MARK: Types
  // ------------------------------------------------
  type Props = {
    /** The child elements to render. */
    children: Snippet;
    /** Actions items for the snackbar. */
    slot_actions?: Snippet;
    /**
     * Gets/sets the automatic dismiss timeout in milliseconds.
     * Value must be between 4000 and 10000 (or -1 to disable
     * the timeout completely) or an error will be thrown.
     * Defaults to 5000 (5 seconds).
     */
    timeout?: number;
    /** Gets/sets the open state of the snackbar. */
    open?: boolean;
  };

  // MARK: Components
  // ------------------------------------------------
  // MARK: Stores
  // ------------------------------------------------
  // MARK: Properties
  // ------------------------------------------------
  let { children, slot_actions, timeout, open = $bindable(false) }: Props = $props();

  // MARK: Methods
  // ------------------------------------------------
  // MARK: Constants
  // ------------------------------------------------
  const attachment: Attachment = (element) => {
    element.addEventListener('MDCSnackbar:closed', onclose);
    element.addEventListener('MDCSnackbar:opened', onopen);
    return () => {
      element.removeEventListener('MDCSnackbar:closed', onclose);
      element.removeEventListener('MDCSnackbar:opened', onopen);
    };
  };

  // MARK: Variables
  // ------------------------------------------------
  let root: HTMLElement | undefined = $state();
  let mdComp: MDCSnackbar | undefined = $state();

  $effect(() => {
    if (!timeout || !mdComp) return;
    mdComp.timeoutMs = timeout;
  });

  $effect(() => {
    if (open) {
      mdComp?.open();
    } else {
      mdComp?.close();
    }
  });

  // MARK: Contexts
  // ------------------------------------------------
  // MARK: Subscriptions
  // ------------------------------------------------
  // MARK: Reactive Rules
  // ------------------------------------------------
  // MARK: Events
  // ------------------------------------------------
  function onclose() {
    open = false;
  }

  function onopen() {
    open = true;
  }

  // MARK: Lifecycle
  // ------------------------------------------------
  onMount(() => {
    if (!root) return;
    mdComp = new MDCSnackbar(root);
  });

  onDestroy(() => {
    if (!mdComp) return;
    mdComp.destroy();
  });
</script>

<aside bind:this={root} {@attach attachment} class={['mdc-snackbar', 'moss-snackbar']}>
  <div class="mdc-snackbar__surface" role="status" aria-relevant="additions">
    <div class="mdc-snackbar__label" aria-atomic="false">
      {@render children()}
    </div>

    {#if slot_actions}
      <div class="mdc-snackbar__actions" aria-atomic="true">
        {@render slot_actions()}
      </div>
    {/if}
  </div>
</aside>

<style lang="scss" global>
  @use '@material/snackbar';
  @use '@material/snackbar/mdc-snackbar';
  .moss-snackbar {
    @include snackbar.fill-color(var(--md-sys-color-inverse-surface));
    @include snackbar.label-ink-color(var(--md-sys-color-inverse-on-surface));
    --mdc-shape-small: var(--md-sys-shape-corner-extra-small);
    --mdc-typography-body2-font-family: var(--md-sys-typescale-body-medium-font);
    --mdc-typography-body2-font-size: var(--md-sys-typescale-body-medium-size);
    --mdc-typography-body2-line-height: var(--md-sys-typescale-body-medium-line-height);
    --mdc-typography-body2-font-weight: var(--md-sys-typescale-body-medium-weight);
    --mdc-typography-body2-letter-spacing: var(--md-sys-typescale-body-medium-tracking);

    md-text-button {
      --md-sys-color-primary: var(--md-sys-color-inverse-primary, #6750a4);
    }

    md-icon {
      color: var(--md-sys-color-inverse-on-surface);
    }
  }
</style>
