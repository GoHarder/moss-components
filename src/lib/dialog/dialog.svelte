<script lang="ts" module>
  let context = false;
  let reducedMotion: boolean | undefined;
</script>

<script lang="ts">
  import '@material/web/dialog/dialog.js';
  import { setSlots } from '../internal/index.js';
  import { type Snippet, getContext, onDestroy, onMount } from 'svelte';

  // MARK: Types
  // ------------------------------------------------
  import { type MdDialog } from '@material/web/dialog/dialog.js';

  type Props = {
    /** The child elements to render. */
    children?: Snippet;
    /**
     * The slot for an  icon.
     * @example
     * {#snippet slotIcon()}
     *   <Icon slot="icon">send</Icon>
     * {/snippet}
     */
    slotIcon?: Snippet;
    /**
     * The slot for a headline.
     * @example
     * {#snippet slotHeadline()}
     *   <div slot="headline">Headline content</div>
     * {/snippet}
     */
    slotHeadline?: Snippet;
    /**
     * The slot for a main content.
     * @example
     * {#snippet slotContent()}
     *   <form slot="content">
     *     ...
     *   </form>
     * {/snippet}
     */
    slotContent?: Snippet;
    /**
     * The slot for action buttons.
     * @example
     * {#snippet slotActions()}
     *   <div slot="actions">
     *     <Button>Cancel</Button>
     *     <Button>Ok</Button>
     *   </div>
     * {/snippet}
     */
    slotActions?: Snippet;
    'return-value'?: string;
    /** Skips the opening and closing animations. */
    quick?: boolean;
    /**
     * The type of dialog for accessibility.
     * Set this to alert to announce a dialog as an alert dialog.
     */
    type?: MdDialog['type'];
    /**
     * Disables focus trapping, which by default keeps keyboard Tab navigation within the dialog.
     * When disabled, after focusing the last element of a dialog, pressing Tab again will release focus from the window back to the browser (such as the URL bar).
     * Focus trapping is recommended for accessibility, and should not typically be disabled.
     * Only turn this off if the use case of a dialog is more accessible without focus trapping.
     */
    'no-focus-trap'?: boolean;
    open?: boolean;
    [key: string]: any;
  };

  // MARK: Properties
  // ------------------------------------------------
  let { children, slotIcon, slotHeadline, slotContent, slotActions, returnvalue: returnValue = $bindable(), quick, open = $bindable(false), ...props }: Props = $props();

  // MARK: Contexts
  // ------------------------------------------------
  if (!context) reducedMotion = getContext('ReducedMotion');

  // MARK: State
  // ------------------------------------------------
  let root: MdDialog | undefined = $state();

  // MARK: Effects
  // ------------------------------------------------
  $effect.pre(() => {
    setSlots(root);
  });

  // MARK: Events
  // ------------------------------------------------
  function onclosed() {
    if (!root) return;
    returnValue = root.returnValue;
    open = root.open;
  }

  // MARK: Lifecycle
  // ------------------------------------------------
  onMount(() => {
    if (reducedMotion) quick = true;
    if (!root) return;
    root.addEventListener('closed', onclosed);
  });

  onDestroy(() => {
    if (!root) return;
    root.removeEventListener('closed', onclosed);
  });
</script>

<md-dialog bind:this={root} {open} {quick} {...props}>
  {@render children?.()}
  {@render slotIcon?.()}
  {@render slotHeadline?.()}
  {@render slotContent?.()}
  {@render slotActions?.()}
</md-dialog>

<style lang="scss">
  :global {
    md-dialog {
      scrollbar-color: var(--md-sys-color-on-surface-variant) var(--md-sys-color-surface-container-high);
    }
  }
</style>
