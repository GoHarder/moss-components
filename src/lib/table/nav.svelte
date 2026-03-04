<script lang="ts">
  // MARK: Types
  // -----------------------------------------------------------------------------
  type Props = {
    page: number;
    length: number;
    total: number;
    maxRows: number;
  };

  // MARK: Components
  // -----------------------------------------------------------------------------
  import { IconButton } from '../icon-button/index.js';
  import { Icon } from '../icon/index.js';

  // MARK: Stores
  // -----------------------------------------------------------------------------
  // MARK: Properties
  // -----------------------------------------------------------------------------
  let { page = 0, length = 0, total = 0, maxRows = 0 }: Props = $props();

  // MARK: Globals
  // -----------------------------------------------------------------------------
  const formatter = new Intl.NumberFormat('en-us', { notation: 'compact' });

  // MARK: Helpers
  // -----------------------------------------------------------------------------
  // MARK: State
  // -----------------------------------------------------------------------------
  // MARK: Derived
  // -----------------------------------------------------------------------------
  let maxRange = $derived((page - 1) * maxRows + length);
  let minRange = $derived(1 + maxRange - length);

  // MARK: Effects
  // -----------------------------------------------------------------------------
  // MARK: Contexts
  // -----------------------------------------------------------------------------
  // MARK: Subscriptions
  // -----------------------------------------------------------------------------
  // MARK: Events
  // -----------------------------------------------------------------------------
  function onFirst() {
    page = 1;
  }

  function onPrev() {
    page--;
  }

  function onNext() {
    page++;
  }

  function onLast() {
    page = Math.ceil(total / length);
  }

  // $inspect(page);

  // MARK: Lifecycle
  // -----------------------------------------------------------------------------
</script>

<div class="mdc-data-table__pagination-navigation">
  <div class="mdc-data-table__pagination-total">{minRange}-{maxRange} of {formatter.format(total)}</div>
  <IconButton onclick={onFirst} class="mdc-data-table__pagination-button">
    <Icon class="material-icons">first_page</Icon>
  </IconButton>
  <IconButton onclick={onPrev} class="mdc-data-table__pagination-button">
    <Icon class="material-icons">chevron_left</Icon>
  </IconButton>
  <IconButton onclick={onNext} class="mdc-data-table__pagination-button">
    <Icon class="material-icons">chevron_right</Icon>
  </IconButton>
  <IconButton onclick={onLast} class="mdc-data-table__pagination-button">
    <Icon class="material-icons">last_page</Icon>
  </IconButton>
</div>
