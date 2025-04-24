<script lang="ts">
  import '@material/web/progress/circular-progress.js';

  // MARK: Types
  // ------------------------------------------------
  type Props = {
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

<md-circular-progress {...props}></md-circular-progress>
