<script lang="ts">
  import '@material/web/radio/radio.js';

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

  // MARK: Components
  // ------------------------------------------------
  // MARK: Stores
  // ------------------------------------------------
  // MARK: Properties
  // ------------------------------------------------
  let { ...props }: Props = $props();

  // MARK: Methods
  // ------------------------------------------------
  // MARK: Constants
  // ------------------------------------------------
  // MARK: Variables
  // ------------------------------------------------
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

<md-radio {...props}></md-radio>
