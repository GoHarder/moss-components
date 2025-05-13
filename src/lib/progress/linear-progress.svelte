<script lang="ts" module>
  import '@material/web/progress/linear-progress.js';
</script>

<script lang="ts">
  // MARK: Types
  // ------------------------------------------------
  type Props = {
    /**
     * Buffer amount to display, a fraction between 0 and max.
     * If the value is 0 or negative, the buffer is not displayed.
     */
    buffer?: number;
    /** Progress to display, a fraction between 0 and max. */
    value?: number;
    /** Maximum progress to display, defaults to 1. */
    max?: number;
    /**
     * Whether or not to display indeterminate progress, which gives no indication to how
     * long an activity will take.
     */
    indeterminate?: boolean;
    /** Whether or not to render indeterminate mode using 4 colors instead of one. */
    'four-color'?: boolean;
    [key: string]: any;
  };

  // MARK: Properties
  // ------------------------------------------------
  let { ...props }: Props = $props();
</script>

<md-linear-progress {...props}></md-linear-progress>
