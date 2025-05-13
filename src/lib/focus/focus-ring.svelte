<script lang="ts" module>
  import '@material/web/focus/md-focus-ring.js';
</script>

<script lang="ts">
  // MARK: Types
  // ------------------------------------------------
  type Props = {
    /** Makes the focus ring visible. */
    visible?: boolean;
    /** Makes the focus ring animate inwards instead of outwards. */
    inward?: boolean;
    [key: string]: any;
  };

  // MARK: Properties
  // ------------------------------------------------
  let { ...props }: Props = $props();
</script>

<md-focus-ring {...props}></md-focus-ring>
