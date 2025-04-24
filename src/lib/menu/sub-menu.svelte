<script lang="ts">
  import '@material/web/menu/sub-menu.js';
  import { setSlots } from '../internal/index.js';

  // MARK: Types
  // ------------------------------------------------
  import { type Snippet } from 'svelte';
  import { MdSubMenu } from '@material/web/menu/sub-menu.js';

  type Props = {
    /** The child elements to render. */
    children?: Snippet;
    /**
     * The slot for the item of the sub menu.
     * @example
     * {#snippet slotItem()}
     *   <MenuItem slot="item">
     *     ...
     *   </MenuItem>
     * {/snippet}
     */
    slotItem?: Snippet;
    /**
     * The slot for the menu of the sub menu.
     * @example
     * {#snippet slotMenu()}
     *   <Menu slot="menu">
     *     ...
     *   </Menu>
     * {/snippet}
     */
    slotMenu?: Snippet;
    [key: string]: any;
  };

  // MARK: Properties
  // ------------------------------------------------
  let { children, slotItem, slotMenu, ...props }: Props = $props();

  // MARK: Variables
  // ------------------------------------------------
  let root: MdSubMenu | undefined = $state();

  // MARK: Effects
  // ------------------------------------------------
  $effect.pre(() => {
    setSlots(root);
  });
</script>

<md-sub-menu bind:this={root} {...props}>
  {@render children?.()}
  {@render slotItem?.()}
  {@render slotMenu?.()}
</md-sub-menu>
