<script lang="ts" module>
  import '@material/web/radio/radio.js';
</script>

<script lang="ts">
  // MARK: Types
  // ------------------------------------------------
  type Props = {
    /**
     * Whether or not the radio is required.
     * If any radio is required in a group, all radios are implicitly required.
     */
    required?: boolean;
    /** The element value to use in form submission when checked. */
    value?: string;
    checked?: boolean;
    disabled?: boolean;
    name?: string;
    [key: string]: any;
  };

  // MARK: Properties
  // ------------------------------------------------
  let { ...props }: Props = $props();
</script>

<md-radio {...props}></md-radio>
