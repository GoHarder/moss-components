<script lang="ts" module>
  import '@material/web/icon/icon.js';
</script>

<script lang="ts">
  import { type Snippet } from 'svelte';

  // MARK: Types
  // ------------------------------------------------
  type Props = {
    /** The child elements to render. */
    children: Snippet;
    [key: string]: any;
  };

  // MARK: Properties
  // ------------------------------------------------
  let { children, ...props }: Props = $props();
</script>

<md-icon {...props}>
  {@render children()}
</md-icon>
