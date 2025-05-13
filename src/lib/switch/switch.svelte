<script lang="ts" module>
  import '@material/web/switch/switch.js';
</script>

<script lang="ts">
  import { onDestroy, onMount } from 'svelte';

  // MARK: Types
  // ------------------------------------------------
  import { type MdSwitch } from '@material/web/switch/switch.js';

  type Props = {
    /**
     * Puts the switch in the selected state and sets the form submission value to the
     * value property.
     */
    selected?: boolean;
    /** Shows both the selected and deselected icons. */
    icons?: boolean;
    /**
     * Shows only the selected icon, and not the deselected icon.
     * If true, overrides the behavior of the icons property.
     */
    'show-only-selected-icon'?: boolean;
    /**
     * When true, require the switch to be selected when participating in form submission.
     *
     * [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/checkbox#validation)
     */
    required?: boolean;
    /**
     * The value associated with this switch on form submission.
     * `null` is submitted when selected is false.
     */
    value?: string;
    disabled?: boolean;
    [key: string]: any;
  };

  // MARK: Properties
  // ------------------------------------------------
  let { selected = $bindable(false), ...props }: Props = $props();

  // MARK: Variables
  // ------------------------------------------------
  let root: MdSwitch | undefined = $state();

  // MARK: Events
  // ------------------------------------------------
  function onchange(_event: Event) {
    if (!root) return;
    selected = root.selected;
  }

  // MARK: Lifecycle
  // ------------------------------------------------
  onMount(() => {
    if (!root) return;
    root.addEventListener('change', onchange);
  });

  onDestroy(() => {
    if (!root) return;
    root.removeEventListener('change', onchange);
  });
</script>

<md-switch bind:this={root} {selected} {...props}></md-switch>
