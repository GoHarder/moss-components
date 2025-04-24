<script lang="ts">
  import '@material/web/checkbox/checkbox.js';

  // MARK: Types
  // ------------------------------------------------
  import type { MdCheckbox } from '@material/web/checkbox/checkbox.js';

  type Props = {
    /** Whether or not the checkbox is selected. */
    checked?: boolean;
    /** Whether or not the checkbox is disabled. */
    disabled?: boolean;
    /**
     * Whether or not the checkbox is indeterminate.
     *
     * [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/checkbox#indeterminate_state_checkboxes)
     */
    indeterminate?: boolean;
    /**
     * When true, require the checkbox to be selected when participating in form submission.
     *
     * [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/checkbox#validation)
     */
    required?: boolean;
    /**
     * The value of the checkbox that is submitted with a form when selected.
     *
     * [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/checkbox#value)
     */
    value?: string;
    name?: string;
    [key: string]: any;
  };

  // MARK: Properties
  // ------------------------------------------------
  let { checked = $bindable(false), ...props }: Props = $props();

  // MARK: Variables
  // ------------------------------------------------
  let root: MdCheckbox;

  // MARK: Events
  // ------------------------------------------------
  function onchange() {
    if (!root) return;
    checked = root.checked;
  }
</script>

<md-checkbox bind:this={root} {onchange} {checked} {...props}></md-checkbox>
