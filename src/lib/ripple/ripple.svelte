<script lang="ts">
  import '@material/web/ripple/ripple';

  // MARK: Types
  // ------------------------------------------------
  type Props = {
    /** Whether or not the ripple is disabled. */
    disabled?: boolean;
    [key: string]: any;
  };

  // MARK: Properties
  // ------------------------------------------------

  let { ...props }: Props = $props();
</script>

<md-ripple {...props}></md-ripple>
