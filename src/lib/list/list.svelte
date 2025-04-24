<script lang="ts">
  import '@material/web/list/list.js';

  // MARK: Types
  // ------------------------------------------------
  import { type Snippet } from 'svelte';

  type Props = {
    /** The child elements to render. */
    children: Snippet;
    [key: string]: any;
  };

  // MARK: Properties
  // ------------------------------------------------
  let { children, ...props }: Props = $props();
</script>

<md-list {...props}>
  {@render children()}
</md-list>
