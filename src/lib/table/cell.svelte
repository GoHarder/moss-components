<script lang="ts">
  import { type Snippet } from 'svelte';

  // MARK: Types
  // -----------------------------------------------------------------------------
  type Props = {
    /** The child elements to render. */
    children: Snippet;
    /** The class to apply to the root element. */
    class?: string;

    scope?: 'col' | 'colgroup' | 'row' | 'rowgroup' | null;

    sort?: string;

    [key: string]: any;
  };

  // MARK: Components
  // -----------------------------------------------------------------------------
  // MARK: Stores
  // -----------------------------------------------------------------------------
  // MARK: Properties
  // -----------------------------------------------------------------------------
  let { children, scope, sort, class: propClass, ...props }: Props = $props();

  // MARK: Globals
  // -----------------------------------------------------------------------------
  // MARK: Helpers
  // -----------------------------------------------------------------------------
  // MARK: State
  // -----------------------------------------------------------------------------
  // MARK: Derived
  // -----------------------------------------------------------------------------
  let cellClass = $derived(['mdc-data-table__cell', sort && 'mdc-data-table__header-cell--with-sort', propClass]);

  // MARK: Effects
  // -----------------------------------------------------------------------------
  // MARK: Contexts
  // -----------------------------------------------------------------------------
  // MARK: Subscriptions
  // -----------------------------------------------------------------------------
  // MARK: Events
  // -----------------------------------------------------------------------------
  // MARK: Lifecycle
  // -----------------------------------------------------------------------------
</script>

{#if scope}
  <!-- on:click -->
  <th class={cellClass} {scope} {...props} data-column-id={sort}>
    {#if sort}
      <div class="mdc-data-table__header-cell-wrapper">
        <div class="mdc-data-table__header-cell-label">
          {@render children()}
        </div>
        <button
          class="mdc-icon-button material-icons mdc-data-table__sort-icon-button material-symbols-outlined"
          aria-label="Sort by {sort}"
          aria-describedby="{sort}-table-label"
        >
          arrow_drop_up
        </button>
        <div class="mdc-data-table__sort-status-label" aria-hidden="true" id="{sort}-table-label"></div>
      </div>
    {:else}
      {@render children()}
    {/if}
  </th>
{:else}
  <!-- on:click -->
  <td class={cellClass} {...props}>
    {@render children()}
  </td>
{/if}
