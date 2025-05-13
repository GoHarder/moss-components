<script lang="ts" module>
  import '@material/web/divider/divider.js';
</script>

<script lang="ts">
  // MARK: Types
  // ------------------------------------------------
  type Props = {
    /** Indents the divider with equal padding on both sides. */
    inset?: boolean;
    /** Indents the divider with padding on the leading side. */
    insetStart?: boolean;
    /** Indents the divider with padding on the trailing side. */
    insetEnd?: boolean;
    [key: string]: any;
  };

  // MARK: Properties
  // ------------------------------------------------
  let { ...props }: Props = $props();
</script>

<md-divider {...props}></md-divider>
