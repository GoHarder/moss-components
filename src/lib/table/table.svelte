<script lang="ts">
  import { type Snippet, onDestroy, onMount } from 'svelte';
  import type { Attachment } from 'svelte/attachments';
  import { MDCDataTable } from '@material/data-table';

  // MARK: Types
  // -----------------------------------------------------------------------------
  type Props = {
    /** The child elements to render. */
    children: Snippet;

    slot_head?: Snippet;

    slot_pagination?: Snippet;

    sticky?: boolean;
  };

  // MARK: Components
  // -----------------------------------------------------------------------------
  // MARK: Stores
  // -----------------------------------------------------------------------------
  // MARK: Properties
  // -----------------------------------------------------------------------------
  let { children, slot_head, slot_pagination, sticky }: Props = $props();

  // MARK: Globals
  // -----------------------------------------------------------------------------
  const attachment: Attachment = (element) => {
    // console.log(element);
    // element.addEventListener('MDCDataTable:sorted', onSort);
    return () => {
      // element.removeEventListener('MDCDataTable:sorted', onSort);
    };
  };

  // MARK: Helpers
  // -----------------------------------------------------------------------------
  // MARK: State
  // -----------------------------------------------------------------------------
  let root: HTMLDivElement | undefined = $state();
  let thead: HTMLTableSectionElement | undefined = $state();
  let mdComp: MDCDataTable | undefined = $state();

  // MARK: Derived
  // -----------------------------------------------------------------------------
  // MARK: Effects
  // -----------------------------------------------------------------------------
  // MARK: Contexts
  // -----------------------------------------------------------------------------
  // MARK: Subscriptions
  // -----------------------------------------------------------------------------
  // MARK: Events
  // -----------------------------------------------------------------------------
  function onSort(event: Event) {
    console.log(event);
  }

  // MARK: Lifecycle
  // -----------------------------------------------------------------------------
  onMount(() => {
    if (!root) return;

    if (slot_head && thead) {
      const headRow = thead.querySelector('tr');
      const headCells = thead.querySelectorAll('th');

      if (!headRow || !headCells) return;

      headRow.classList.remove('mdc-data-table__row');
      headRow.classList.add('mdc-data-table__header-row');
      headCells.forEach((cell) => {
        cell.classList.remove('mdc-data-table__cell');
        cell.classList.add('mdc-data-table__header-cell');
      });

      mdComp = new MDCDataTable(root);
    }
  });

  onDestroy(() => {
    if (!mdComp) return;
    mdComp.destroy();
  });
</script>

<!-- {@attach attachment} -->
<!-- <div class={divClass} {...props}> -->
<div bind:this={root} class={{ 'mdc-data-table': true, 'mdc-data-table--sticky-header': sticky }}>
  <div class="mdc-data-table__table-container">
    <table class="mdc-data-table__table">
      {#if slot_head}
        <thead bind:this={thead}>
          {@render slot_head()}
        </thead>
      {/if}

      <tbody class="mdc-data-table__content">
        {@render children()}
      </tbody>
    </table>
  </div>

  {#if slot_pagination}
    <div class="mdc-data-table__pagination">
      <div class="mdc-data-table__pagination-trailing">
        {@render slot_pagination()}
      </div>
    </div>
  {/if}
</div>

<style lang="scss" global>
  @use '@material/data-table/data-table';
  @use '@material/data-table/data-table-theme';
  @include data-table.core-styles;
  @include data-table.theme-baseline;

  // sort-icon-active-color,
  // row-fill-color,
  // selected-row-fill-color,
  // checked-icon-color,
  // row-hover-fill-color,
  // shape-radius,
  // stroke-size,
  // stroke-color,

  .mdc-data-table {
    @include data-table-theme.header-row-fill-color(var(--md-sys-color-surface, #fff));
    @include data-table-theme.header-row-text-color(var(--md-sys-color-on-surface, #000));
    @include data-table-theme.fill-color(var(--md-sys-color-surface, #fff));
    @include data-table-theme.row-text-color(var(--md-sys-color-on-surface-variant, #000));
    @include data-table-theme.divider-color(var(--md-sys-color-outline-variant, #fff));
    @include data-table-theme.sort-icon-color(var(--md-sys-color-on-surface, #000));
    // --mdc-theme-surface: var(--md-sys-color-surface, #fff);
    // --mdc-shape-medium: var(--md-sys-shape-corner-medium, 4px);
  }

  .mdc-data-table__sort-icon-button {
    background-color: var(--md-sys-color-surface, #fff);
    border: none;
  }

  // :global(.mdc-data-table__content) {
  //   font-family: var(--mdc-typography-body2-font-family, var(--mdc-typography-font-family, Roboto, sans-serif));
  //   font-size: var(--mdc-typography-body2-font-size, 0.875rem);
  //   line-height: var(--mdc-typography-body2-line-height, 1.25rem);
  //   font-weight: var(--mdc-typography-body2-font-weight, 400);
  //   letter-spacing: var(--mdc-typography-body2-letter-spacing, 0.0178571429em);
  //   text-decoration: var(--mdc-typography-body2-text-decoration, inherit);
  //   text-transform: var(--mdc-typography-body2-text-transform, inherit);
  // }

  // :global(.mdc-data-table__header-cell) {
  //   background-color: #fff;
  //   /* @alternate */
  //   background-color: var(--mdc-theme-surface, #fff);
  // }

  // :global(.mdc-data-table__row--selected) {
  //   background-color: rgba(98, 0, 238, 0.04);
  // }

  // :global(.mdc-data-table__pagination-rows-per-page-select:not(.mdc-select--disabled)) :global(.mdc-notched-outline__leading),
  // :global(.mdc-data-table__pagination-rows-per-page-select:not(.mdc-select--disabled)) :global(.mdc-notched-outline__notch),
  // :global(.mdc-data-table__pagination-rows-per-page-select:not(.mdc-select--disabled)) :global(.mdc-notched-outline__trailing) {
  //   border-color: rgba(0, 0, 0, 0.12);
  // }

  // :global(.mdc-data-table__row:not(.mdc-data-table__row--selected):hover) {
  //   background-color: rgba(0, 0, 0, 0.04);
  // }

  // :global(.mdc-data-table__header-cell) {
  //   color: rgba(0, 0, 0, 0.87);
  // }

  // :global(.mdc-data-table__pagination-total),
  // :global(.mdc-data-table__pagination-rows-per-page-label),
  // :global(.mdc-data-table__cell) {
  //   color: rgba(0, 0, 0, 0.87);
  // }

  // :global(.mdc-data-table__row) {
  //   height: 52px;
  // }

  // :global(.mdc-data-table__pagination) {
  //   min-height: 52px;
  // }

  // :global(.mdc-data-table__header-row) {
  //   height: 56px;
  // }

  // :global(.mdc-data-table__cell),
  // :global(.mdc-data-table__header-cell) {
  //   padding: 0 16px 0 16px;
  // }

  // :global(.mdc-data-table__header-cell--checkbox),
  // :global(.mdc-data-table__cell--checkbox) {
  //   /* @noflip */ /*rtl:ignore*/
  //   padding-left: 4px;
  //   /* @noflip */ /*rtl:ignore*/
  //   padding-right: 0;
  // }

  // :global(.mdc-data-table__cell) {
  //   -moz-osx-font-smoothing: grayscale;
  //   -webkit-font-smoothing: antialiased;
  //   font-family: Roboto, sans-serif;
  //   /* @alternate */
  //   font-family: var(--mdc-typography-body2-font-family, var(--mdc-typography-font-family, Roboto, sans-serif));
  //   font-size: 0.875rem;
  //   /* @alternate */
  //   font-size: var(--mdc-typography-body2-font-size, 0.875rem);
  //   line-height: 1.25rem;
  //   /* @alternate */
  //   line-height: var(--mdc-typography-body2-line-height, 1.25rem);
  //   font-weight: 400;
  //   /* @alternate */
  //   font-weight: var(--mdc-typography-body2-font-weight, 400);
  //   letter-spacing: 0.0178571429em;
  //   /* @alternate */
  //   letter-spacing: var(--mdc-typography-body2-letter-spacing, 0.0178571429em);
  //   text-decoration: inherit;
  //   /* @alternate */
  //   text-decoration: var(--mdc-typography-body2-text-decoration, inherit);
  //   text-transform: inherit;
  //   /* @alternate */
  //   text-transform: var(--mdc-typography-body2-text-transform, inherit);
  //   box-sizing: border-box;
  //   overflow: hidden;
  //   text-align: left;
  //   text-overflow: ellipsis;
  // }

  // :global(.mdc-data-table__header-cell) {
  //   -moz-osx-font-smoothing: grayscale;
  //   -webkit-font-smoothing: antialiased;
  //   font-family: Roboto, sans-serif;
  //   /* @alternate */
  //   font-family: var(--mdc-typography-subtitle2-font-family, var(--mdc-typography-font-family, Roboto, sans-serif));
  //   font-size: 0.875rem;
  //   /* @alternate */
  //   font-size: var(--mdc-typography-subtitle2-font-size, 0.875rem);
  //   line-height: 1.375rem;
  //   /* @alternate */
  //   line-height: var(--mdc-typography-subtitle2-line-height, 1.375rem);
  //   font-weight: 500;
  //   /* @alternate */
  //   font-weight: var(--mdc-typography-subtitle2-font-weight, 500);
  //   letter-spacing: 0.0071428571em;
  //   /* @alternate */
  //   letter-spacing: var(--mdc-typography-subtitle2-letter-spacing, 0.0071428571em);
  //   text-decoration: inherit;
  //   /* @alternate */
  //   text-decoration: var(--mdc-typography-subtitle2-text-decoration, inherit);
  //   text-transform: inherit;
  //   /* @alternate */
  //   text-transform: var(--mdc-typography-subtitle2-text-transform, inherit);
  //   box-sizing: border-box;
  //   text-overflow: ellipsis;
  //   overflow: hidden;
  //   outline: none;
  //   /* @noflip */ /*rtl:ignore*/
  //   text-align: left;
  // }
  // :global([dir=rtl]) :global(.mdc-data-table__header-cell), :global(.mdc-data-table__header-cell[dir=rtl]) {
  //   /*rtl:begin:ignore*/
  //   /* @noflip */ /*rtl:ignore*/
  //   text-align: right;
  //   /*rtl:end:ignore*/
  // }

  // :global(.mdc-data-table__header-cell--checkbox) {
  //   width: 1px;
  // }

  // :global(.mdc-data-table__header-cell--numeric) {
  //   text-align: right;
  // }
  // :global([dir=rtl]) :global(.mdc-data-table__header-cell--numeric), :global(.mdc-data-table__header-cell--numeric[dir=rtl]) {
  //   /*rtl:begin:ignore*/
  //   /* @noflip */ /*rtl:ignore*/
  //   text-align: left;
  //   /*rtl:end:ignore*/
  // }

  // :global(.mdc-data-table__sort-icon-button) {
  //   width: 28px;
  //   height: 28px;
  //   padding: 2px;
  //   transform: rotate(0.0001deg);
  //   /* @noflip */ /*rtl:ignore*/
  //   margin-left: 4px;
  //   /* @noflip */ /*rtl:ignore*/
  //   margin-right: 0;
  //   transition: transform 150ms 0ms cubic-bezier(0.4, 0, 0.2, 1);
  //   opacity: 0;
  // }
  // :global(.mdc-data-table__sort-icon-button) :global(.mdc-icon-button__focus-ring) {
  //   display: none;
  // }
  // :global(.mdc-data-table__sort-icon-button.mdc-ripple-upgraded--background-focused) :global(.mdc-icon-button__focus-ring), :global(.mdc-data-table__sort-icon-button:not(.mdc-ripple-upgraded):focus) :global(.mdc-icon-button__focus-ring) {
  //   display: block;
  //   max-height: 28px;
  //   max-width: 28px;
  // }
  // @media screen and (forced-colors: active) {
  //   :global(.mdc-data-table__sort-icon-button.mdc-ripple-upgraded--background-focused) :global(.mdc-icon-button__focus-ring), :global(.mdc-data-table__sort-icon-button:not(.mdc-ripple-upgraded):focus) :global(.mdc-icon-button__focus-ring) {
  //     pointer-events: none;
  //     border: 2px solid transparent;
  //     border-radius: 6px;
  //     box-sizing: content-box;
  //     position: absolute;
  //     top: 50%;
  //     /* @noflip */ /*rtl:ignore*/
  //     left: 50%;
  //     /* @noflip */ /*rtl:ignore*/
  //     transform: translate(-50%, -50%);
  //     height: 100%;
  //     width: 100%;
  //   }
  // }
  // @media screen and (forced-colors: active) and (forced-colors: active) {
  //   :global(.mdc-data-table__sort-icon-button.mdc-ripple-upgraded--background-focused) :global(.mdc-icon-button__focus-ring), :global(.mdc-data-table__sort-icon-button:not(.mdc-ripple-upgraded):focus) :global(.mdc-icon-button__focus-ring) {
  //     border-color: CanvasText;
  //   }
  // }
  // @media screen and (forced-colors: active) {
  //   :global(.mdc-data-table__sort-icon-button.mdc-ripple-upgraded--background-focused) :global(.mdc-icon-button__focus-ring::after), :global(.mdc-data-table__sort-icon-button:not(.mdc-ripple-upgraded):focus) :global(.mdc-icon-button__focus-ring::after) {
  //     content: "";
  //     border: 2px solid transparent;
  //     border-radius: 8px;
  //     display: block;
  //     position: absolute;
  //     top: 50%;
  //     /* @noflip */ /*rtl:ignore*/
  //     left: 50%;
  //     /* @noflip */ /*rtl:ignore*/
  //     transform: translate(-50%, -50%);
  //     height: calc(100% + 4px);
  //     width: calc(100% + 4px);
  //   }
  // }
  // @media screen and (forced-colors: active) and (forced-colors: active) {
  //   :global(.mdc-data-table__sort-icon-button.mdc-ripple-upgraded--background-focused) :global(.mdc-icon-button__focus-ring::after), :global(.mdc-data-table__sort-icon-button:not(.mdc-ripple-upgraded):focus) :global(.mdc-icon-button__focus-ring::after) {
  //     border-color: CanvasText;
  //   }
  // }
  // :global(.mdc-data-table__sort-icon-button.mdc-icon-button--reduced-size) :global(.mdc-icon-button__ripple) {
  //   width: 28px;
  //   height: 28px;
  //   margin-top: 0px;
  //   margin-bottom: 0px;
  //   margin-right: 0px;
  //   margin-left: 0px;
  // }
  // :global(.mdc-data-table__sort-icon-button.mdc-icon-button--reduced-size.mdc-ripple-upgraded--background-focused) :global(.mdc-icon-button__focus-ring), :global(.mdc-data-table__sort-icon-button.mdc-icon-button--reduced-size:not(.mdc-ripple-upgraded):focus) :global(.mdc-icon-button__focus-ring) {
  //   max-height: 28px;
  //   max-width: 28px;
  // }
  // :global(.mdc-data-table__sort-icon-button) :global(.mdc-icon-button__touch) {
  //   position: absolute;
  //   top: 50%;
  //   height: 28px;
  //   /* @noflip */ /*rtl:ignore*/
  //   left: 50%;
  //   width: 28px;
  //   transform: translate(-50%, -50%);
  // }
  // :global([dir=rtl]) :global(.mdc-data-table__sort-icon-button), :global(.mdc-data-table__sort-icon-button[dir=rtl]) {
  //   /*rtl:begin:ignore*/
  //   /* @noflip */ /*rtl:ignore*/
  //   margin-left: 0;
  //   /* @noflip */ /*rtl:ignore*/
  //   margin-right: 4px;
  //   /*rtl:end:ignore*/
  // }

  // :global(.mdc-data-table__header-cell--numeric) :global(.mdc-data-table__sort-icon-button) {
  //   /* @noflip */ /*rtl:ignore*/
  //   margin-left: 0;
  //   /* @noflip */ /*rtl:ignore*/
  //   margin-right: 4px;
  // }
  // :global([dir=rtl]) :global(.mdc-data-table__header-cell--numeric) :global(.mdc-data-table__sort-icon-button), :global(.mdc-data-table__header-cell--numeric) :global(.mdc-data-table__sort-icon-button[dir=rtl]) {
  //   /*rtl:begin:ignore*/
  //   /* @noflip */ /*rtl:ignore*/
  //   margin-left: 4px;
  //   /* @noflip */ /*rtl:ignore*/
  //   margin-right: 0;
  //   /*rtl:end:ignore*/
  // }

  // :global(.mdc-data-table__header-cell--sorted-descending) :global(.mdc-data-table__sort-icon-button) {
  //   transform: rotate(-180deg);
  // }
  // :global(.mdc-data-table__sort-icon-button:focus), :global(.mdc-data-table__header-cell:hover) :global(.mdc-data-table__sort-icon-button), :global(.mdc-data-table__header-cell--sorted) :global(.mdc-data-table__sort-icon-button) {
  //   opacity: 1;
  // }

  // :global(.mdc-data-table__header-cell-wrapper) {
  //   align-items: center;
  //   display: inline-flex;
  //   vertical-align: middle;
  // }

  // :global(.mdc-data-table__header-cell--with-sort) {
  //   cursor: pointer;
  // }

  // :global(.mdc-data-table__sort-status-label) {
  //   clip: rect(1px, 1px, 1px, 1px);
  //   height: 1px;
  //   overflow: hidden;
  //   position: absolute;
  //   white-space: nowrap; /* added line */
  //   width: 1px;
  // }

  // :global(.mdc-data-table--sticky-header) :global(.mdc-data-table__header-cell) {
  //   position: sticky;
  //   top: 0;
  //   z-index: 1;
  // }

  // :global(.mdc-data-table__sort-icon-button) {
  //   color: rgba(0, 0, 0, 0.6);
  // }
  // :global(.mdc-data-table__sort-icon-button) :global(.mdc-icon-button__ripple::before), :global(.mdc-data-table__sort-icon-button) :global(.mdc-icon-button__ripple::after) {
  //   background-color: rgba(0, 0, 0, 0.6);
  //   /* @alternate */
  //   background-color: var(--mdc-ripple-color, rgba(0, 0, 0, 0.6));
  // }
  // :global(.mdc-data-table__sort-icon-button:hover) :global(.mdc-icon-button__ripple::before), :global(.mdc-data-table__sort-icon-button.mdc-ripple-surface--hover) :global(.mdc-icon-button__ripple::before) {
  //   opacity: 0.04;
  //   /* @alternate */
  //   opacity: var(--mdc-ripple-hover-opacity, 0.04);
  // }
  // :global(.mdc-data-table__sort-icon-button.mdc-ripple-upgraded--background-focused) :global(.mdc-icon-button__ripple::before), :global(.mdc-data-table__sort-icon-button:not(.mdc-ripple-upgraded):focus) :global(.mdc-icon-button__ripple::before) {
  //   transition-duration: 75ms;
  //   opacity: 0.12;
  //   /* @alternate */
  //   opacity: var(--mdc-ripple-focus-opacity, 0.12);
  // }
  // :global(.mdc-data-table__sort-icon-button:not(.mdc-ripple-upgraded)) :global(.mdc-icon-button__ripple::after) {
  //   transition: opacity 150ms linear;
  // }
  // :global(.mdc-data-table__sort-icon-button:not(.mdc-ripple-upgraded):active) :global(.mdc-icon-button__ripple::after) {
  //   transition-duration: 75ms;
  //   opacity: 0.12;
  //   /* @alternate */
  //   opacity: var(--mdc-ripple-press-opacity, 0.12);
  // }
  // :global(.mdc-data-table__sort-icon-button.mdc-ripple-upgraded) {
  //   --mdc-ripple-fg-opacity: var(--mdc-ripple-press-opacity, 0.12);
  // }

  // :global(.mdc-data-table__header-cell--sorted) :global(.mdc-data-table__sort-icon-button) {
  //   color: rgba(0, 0, 0, 0.87);
  // }
  // :global(.mdc-data-table__header-cell--sorted) :global(.mdc-data-table__sort-icon-button) :global(.mdc-icon-button__ripple::before), :global(.mdc-data-table__header-cell--sorted) :global(.mdc-data-table__sort-icon-button) :global(.mdc-icon-button__ripple::after) {
  //   background-color: rgba(0, 0, 0, 0.87);
  //   /* @alternate */
  //   background-color: var(--mdc-ripple-color, rgba(0, 0, 0, 0.87));
  // }
  // :global(.mdc-data-table__header-cell--sorted) :global(.mdc-data-table__sort-icon-button:hover) :global(.mdc-icon-button__ripple::before), :global(.mdc-data-table__header-cell--sorted) :global(.mdc-data-table__sort-icon-button.mdc-ripple-surface--hover) :global(.mdc-icon-button__ripple::before) {
  //   opacity: 0.04;
  //   /* @alternate */
  //   opacity: var(--mdc-ripple-hover-opacity, 0.04);
  // }
  // :global(.mdc-data-table__header-cell--sorted) :global(.mdc-data-table__sort-icon-button.mdc-ripple-upgraded--background-focused) :global(.mdc-icon-button__ripple::before), :global(.mdc-data-table__header-cell--sorted) :global(.mdc-data-table__sort-icon-button:not(.mdc-ripple-upgraded):focus) :global(.mdc-icon-button__ripple::before) {
  //   transition-duration: 75ms;
  //   opacity: 0.12;
  //   /* @alternate */
  //   opacity: var(--mdc-ripple-focus-opacity, 0.12);
  // }
  // :global(.mdc-data-table__header-cell--sorted) :global(.mdc-data-table__sort-icon-button:not(.mdc-ripple-upgraded)) :global(.mdc-icon-button__ripple::after) {
  //   transition: opacity 150ms linear;
  // }
  // :global(.mdc-data-table__header-cell--sorted) :global(.mdc-data-table__sort-icon-button:not(.mdc-ripple-upgraded):active) :global(.mdc-icon-button__ripple::after) {
  //   transition-duration: 75ms;
  //   opacity: 0.12;
  //   /* @alternate */
  //   opacity: var(--mdc-ripple-press-opacity, 0.12);
  // }
  // :global(.mdc-data-table__header-cell--sorted) :global(.mdc-data-table__sort-icon-button.mdc-ripple-upgraded) {
  //   --mdc-ripple-fg-opacity: var(--mdc-ripple-press-opacity, 0.12);
  // }

  // :global(.mdc-data-table__progress-indicator) {
  //   display: none;
  //   position: absolute;
  //   width: 100%;
  // }
  // :global(.mdc-data-table--in-progress) :global(.mdc-data-table__progress-indicator) {
  //   display: block;
  // }

  // :global(.mdc-data-table__scrim) {
  //   background-color: #fff;
  //   /* @alternate */
  //   background-color: var(--mdc-theme-surface, #fff);
  //   height: 100%;
  //   opacity: 0.32;
  //   position: absolute;
  //   top: 0;
  //   width: 100%;
  // }

  // :global(.mdc-data-table__pagination) {
  //   -moz-osx-font-smoothing: grayscale;
  //   -webkit-font-smoothing: antialiased;
  //   font-family: Roboto, sans-serif;
  //   /* @alternate */
  //   font-family: var(--mdc-typography-body2-font-family, var(--mdc-typography-font-family, Roboto, sans-serif));
  //   font-size: 0.875rem;
  //   /* @alternate */
  //   font-size: var(--mdc-typography-body2-font-size, 0.875rem);
  //   line-height: 1.25rem;
  //   /* @alternate */
  //   line-height: var(--mdc-typography-body2-line-height, 1.25rem);
  //   font-weight: 400;
  //   /* @alternate */
  //   font-weight: var(--mdc-typography-body2-font-weight, 400);
  //   letter-spacing: 0.0178571429em;
  //   /* @alternate */
  //   letter-spacing: var(--mdc-typography-body2-letter-spacing, 0.0178571429em);
  //   text-decoration: inherit;
  //   /* @alternate */
  //   text-decoration: var(--mdc-typography-body2-text-decoration, inherit);
  //   text-transform: inherit;
  //   /* @alternate */
  //   text-transform: var(--mdc-typography-body2-text-transform, inherit);
  //   box-sizing: border-box;
  //   display: flex;
  //   justify-content: flex-end;
  // }

  // :global(.mdc-data-table__pagination-trailing) {
  //   /* @noflip */ /*rtl:ignore*/
  //   margin-left: 4px;
  //   /* @noflip */ /*rtl:ignore*/
  //   margin-right: 0;
  //   align-items: center;
  //   display: flex;
  //   flex-wrap: wrap;
  //   justify-content: flex-end;
  // }
  // :global([dir=rtl]) :global(.mdc-data-table__pagination-trailing), :global(.mdc-data-table__pagination-trailing[dir=rtl]) {
  //   /*rtl:begin:ignore*/
  //   /* @noflip */ /*rtl:ignore*/
  //   margin-left: 0;
  //   /* @noflip */ /*rtl:ignore*/
  //   margin-right: 4px;
  //   /*rtl:end:ignore*/
  // }

  // :global(.mdc-data-table__pagination-navigation) {
  //   align-items: center;
  //   display: flex;
  // }

  // :global(.mdc-data-table__pagination-button) {
  //   /* @noflip */ /*rtl:ignore*/
  //   margin-left: 0;
  //   /* @noflip */ /*rtl:ignore*/
  //   margin-right: 4px;
  // }
  // :global([dir=rtl]) :global(.mdc-data-table__pagination-button) :global(.mdc-button__icon), :global(.mdc-data-table__pagination-button) :global(.mdc-button__icon[dir=rtl]) {
  //   /*rtl:begin:ignore*/
  //   /* @noflip */ /*rtl:ignore*/
  //   transform: rotate(180deg);
  //   /*rtl:end:ignore*/
  // }

  // :global([dir=rtl]) :global(.mdc-data-table__pagination-button), :global(.mdc-data-table__pagination-button[dir=rtl]) {
  //   /*rtl:begin:ignore*/
  //   /* @noflip */ /*rtl:ignore*/
  //   margin-left: 4px;
  //   /* @noflip */ /*rtl:ignore*/
  //   margin-right: 0;
  //   /*rtl:end:ignore*/
  // }

  // :global(.mdc-data-table__pagination-total) {
  //   /* @noflip */ /*rtl:ignore*/
  //   margin-left: 14px;
  //   /* @noflip */ /*rtl:ignore*/
  //   margin-right: 36px;
  //   white-space: nowrap;
  // }
  // :global([dir=rtl]) :global(.mdc-data-table__pagination-total), :global(.mdc-data-table__pagination-total[dir=rtl]) {
  //   /*rtl:begin:ignore*/
  //   /* @noflip */ /*rtl:ignore*/
  //   margin-left: 36px;
  //   /* @noflip */ /*rtl:ignore*/
  //   margin-right: 14px;
  //   /*rtl:end:ignore*/
  // }

  // :global(.mdc-data-table__pagination-rows-per-page) {
  //   /* @noflip */ /*rtl:ignore*/
  //   margin-left: 0;
  //   /* @noflip */ /*rtl:ignore*/
  //   margin-right: 22px;
  //   align-items: center;
  //   display: inline-flex;
  // }
  // :global([dir=rtl]) :global(.mdc-data-table__pagination-rows-per-page), :global(.mdc-data-table__pagination-rows-per-page[dir=rtl]) {
  //   /*rtl:begin:ignore*/
  //   /* @noflip */ /*rtl:ignore*/
  //   margin-left: 22px;
  //   /* @noflip */ /*rtl:ignore*/
  //   margin-right: 0;
  //   /*rtl:end:ignore*/
  // }

  // :global(.mdc-data-table__pagination-rows-per-page-label) {
  //   /* @noflip */ /*rtl:ignore*/
  //   margin-left: 0;
  //   /* @noflip */ /*rtl:ignore*/
  //   margin-right: 12px;
  //   white-space: nowrap;
  // }
  // :global([dir=rtl]) :global(.mdc-data-table__pagination-rows-per-page-label), :global(.mdc-data-table__pagination-rows-per-page-label[dir=rtl]) {
  //   /*rtl:begin:ignore*/
  //   /* @noflip */ /*rtl:ignore*/
  //   margin-left: 12px;
  //   /* @noflip */ /*rtl:ignore*/
  //   margin-right: 0;
  //   /*rtl:end:ignore*/
  // }

  // :global(.mdc-data-table__pagination-rows-per-page-select) {
  //   min-width: 80px;
  //   /* @alternate */
  //   min-width: var(--mdc-menu-min-width, 80px);
  //   margin: 8px 0;
  // }
  // :global(.mdc-data-table__pagination-rows-per-page-select) :global(.mdc-select__anchor) {
  //   width: 100%;
  //   min-width: 80px;
  // }
  // :global(.mdc-data-table__pagination-rows-per-page-select) :global(.mdc-select__anchor) {
  //   height: 36px;
  // }
  // :global(.mdc-data-table__pagination-rows-per-page-select) :global(.mdc-select__anchor) :global(.mdc-floating-label--float-above) {
  //   transform: translateY(-27.25px) scale(1);
  // }
  // :global(.mdc-data-table__pagination-rows-per-page-select) :global(.mdc-select__anchor) :global(.mdc-floating-label--float-above) {
  //   font-size: 0.75rem;
  // }
  // :global(.mdc-data-table__pagination-rows-per-page-select) :global(.mdc-select__anchor.mdc-notched-outline--upgraded) :global(.mdc-floating-label--float-above),
  // :global(.mdc-data-table__pagination-rows-per-page-select) :global(.mdc-select__anchor) :global(.mdc-notched-outline--upgraded) :global(.mdc-floating-label--float-above) {
  //   transform: translateY(-24.75px) scale(0.75);
  // }
  // :global(.mdc-data-table__pagination-rows-per-page-select) :global(.mdc-select__anchor.mdc-notched-outline--upgraded) :global(.mdc-floating-label--float-above),
  // :global(.mdc-data-table__pagination-rows-per-page-select) :global(.mdc-select__anchor) :global(.mdc-notched-outline--upgraded) :global(.mdc-floating-label--float-above) {
  //   font-size: 1rem;
  // }
  // :global(.mdc-data-table__pagination-rows-per-page-select) :global(.mdc-select__anchor) :global(.mdc-floating-label--shake) {
  //   animation: mdc-floating-label-shake-float-above-select-outlined-36px 250ms 1;
  // }
  // @keyframes -global-mdc-floating-label-shake-float-above-select-outlined-36px {
  //   0% {
  //     /* @noflip */ /*rtl:ignore*/
  //     transform: translateX(calc(0 - 0%)) translateY(-24.75px) scale(0.75);
  //   }
  //   33% {
  //     animation-timing-function: cubic-bezier(0.5, 0, 0.701732, 0.495819);
  //     /* @noflip */ /*rtl:ignore*/
  //     transform: translateX(calc(4% - 0%)) translateY(-24.75px) scale(0.75);
  //   }
  //   66% {
  //     animation-timing-function: cubic-bezier(0.302435, 0.381352, 0.55, 0.956352);
  //     /* @noflip */ /*rtl:ignore*/
  //     transform: translateX(calc(-4% - 0%)) translateY(-24.75px) scale(0.75);
  //   }
  //   100% {
  //     /* @noflip */ /*rtl:ignore*/
  //     transform: translateX(calc(0 - 0%)) translateY(-24.75px) scale(0.75);
  //   }
  // }
  // :global(.mdc-data-table__pagination-rows-per-page-select) :global(.mdc-select__dropdown-icon) {
  //   width: 20px;
  //   height: 20px;
  // }
  // :global(.mdc-data-table__pagination-rows-per-page-select.mdc-select--outlined) :global(.mdc-select__anchor) :global(:not(.mdc-notched-outline--notched)) :global(.mdc-notched-outline__notch) {
  //   max-width: calc(100% - 56px);
  // }
  // :global(.mdc-data-table__pagination-rows-per-page-select) :global(.mdc-list-item.mdc-list-item--with-one-line) {
  //   height: 36px;
  // }

  // :global(.mdc-data-table__header-row-checkbox.mdc-checkbox--selected) :global(.mdc-checkbox__ripple::before), :global(.mdc-data-table__header-row-checkbox.mdc-checkbox--selected) :global(.mdc-checkbox__ripple::after), :global(.mdc-data-table__row-checkbox.mdc-checkbox--selected) :global(.mdc-checkbox__ripple::before), :global(.mdc-data-table__row-checkbox.mdc-checkbox--selected) :global(.mdc-checkbox__ripple::after) {
  //   background-color: #6200ee;
  //   /* @alternate */
  //   background-color: var(--mdc-ripple-color, var(--mdc-theme-primary, #6200ee));
  // }
  // :global(.mdc-data-table__header-row-checkbox.mdc-checkbox--selected:hover) :global(.mdc-checkbox__ripple::before), :global(.mdc-data-table__header-row-checkbox.mdc-checkbox--selected.mdc-ripple-surface--hover) :global(.mdc-checkbox__ripple::before), :global(.mdc-data-table__row-checkbox.mdc-checkbox--selected:hover) :global(.mdc-checkbox__ripple::before), :global(.mdc-data-table__row-checkbox.mdc-checkbox--selected.mdc-ripple-surface--hover) :global(.mdc-checkbox__ripple::before) {
  //   opacity: 0.04;
  //   /* @alternate */
  //   opacity: var(--mdc-ripple-hover-opacity, 0.04);
  // }
  // :global(.mdc-data-table__header-row-checkbox.mdc-checkbox--selected.mdc-ripple-upgraded--background-focused) :global(.mdc-checkbox__ripple::before), :global(.mdc-data-table__header-row-checkbox.mdc-checkbox--selected:not(.mdc-ripple-upgraded):focus) :global(.mdc-checkbox__ripple::before), :global(.mdc-data-table__row-checkbox.mdc-checkbox--selected.mdc-ripple-upgraded--background-focused) :global(.mdc-checkbox__ripple::before), :global(.mdc-data-table__row-checkbox.mdc-checkbox--selected:not(.mdc-ripple-upgraded):focus) :global(.mdc-checkbox__ripple::before) {
  //   transition-duration: 75ms;
  //   opacity: 0.12;
  //   /* @alternate */
  //   opacity: var(--mdc-ripple-focus-opacity, 0.12);
  // }
  // :global(.mdc-data-table__header-row-checkbox.mdc-checkbox--selected:not(.mdc-ripple-upgraded)) :global(.mdc-checkbox__ripple::after),
  // :global(.mdc-data-table__row-checkbox.mdc-checkbox--selected:not(.mdc-ripple-upgraded)) :global(.mdc-checkbox__ripple::after) {
  //   transition: opacity 150ms linear;
  // }
  // :global(.mdc-data-table__header-row-checkbox.mdc-checkbox--selected:not(.mdc-ripple-upgraded):active) :global(.mdc-checkbox__ripple::after),
  // :global(.mdc-data-table__row-checkbox.mdc-checkbox--selected:not(.mdc-ripple-upgraded):active) :global(.mdc-checkbox__ripple::after) {
  //   transition-duration: 75ms;
  //   opacity: 0.12;
  //   /* @alternate */
  //   opacity: var(--mdc-ripple-press-opacity, 0.12);
  // }
  // :global(.mdc-data-table__header-row-checkbox.mdc-checkbox--selected.mdc-ripple-upgraded),
  // :global(.mdc-data-table__row-checkbox.mdc-checkbox--selected.mdc-ripple-upgraded) {
  //   --mdc-ripple-fg-opacity: var(--mdc-ripple-press-opacity, 0.12);
  // }
  // :global(.mdc-data-table__header-row-checkbox.mdc-ripple-upgraded--background-focused.mdc-checkbox--selected) :global(.mdc-checkbox__ripple::before),
  // :global(.mdc-data-table__header-row-checkbox.mdc-ripple-upgraded--background-focused.mdc-checkbox--selected) :global(.mdc-checkbox__ripple::after),
  // :global(.mdc-data-table__row-checkbox.mdc-ripple-upgraded--background-focused.mdc-checkbox--selected) :global(.mdc-checkbox__ripple::before),
  // :global(.mdc-data-table__row-checkbox.mdc-ripple-upgraded--background-focused.mdc-checkbox--selected) :global(.mdc-checkbox__ripple::after) {
  //   background-color: #6200ee;
  //   /* @alternate */
  //   background-color: var(--mdc-ripple-color, var(--mdc-theme-primary, #6200ee));
  // }
  // :global(.mdc-data-table__header-row-checkbox) :global(.mdc-checkbox__native-control:enabled:not(:checked):not(:indeterminate):not([data-indeterminate=true])) ~ :global(.mdc-checkbox__background),
  // :global(.mdc-data-table__row-checkbox) :global(.mdc-checkbox__native-control:enabled:not(:checked):not(:indeterminate):not([data-indeterminate=true])) ~ :global(.mdc-checkbox__background) {
  //   border-color: rgba(0, 0, 0, 0.54);
  //   /* @alternate */
  //   border-color: var(--mdc-checkbox-unchecked-color, rgba(0, 0, 0, 0.54));
  //   background-color: transparent;
  // }
  // :global(.mdc-data-table__header-row-checkbox) :global(.mdc-checkbox__native-control:enabled:checked) ~ :global(.mdc-checkbox__background),
  // :global(.mdc-data-table__header-row-checkbox) :global(.mdc-checkbox__native-control:enabled:indeterminate) ~ :global(.mdc-checkbox__background),
  // :global(.mdc-data-table__header-row-checkbox) :global(.mdc-checkbox__native-control[data-indeterminate=true]:enabled) ~ :global(.mdc-checkbox__background),
  // :global(.mdc-data-table__row-checkbox) :global(.mdc-checkbox__native-control:enabled:checked) ~ :global(.mdc-checkbox__background),
  // :global(.mdc-data-table__row-checkbox) :global(.mdc-checkbox__native-control:enabled:indeterminate) ~ :global(.mdc-checkbox__background),
  // :global(.mdc-data-table__row-checkbox) :global(.mdc-checkbox__native-control[data-indeterminate=true]:enabled) ~ :global(.mdc-checkbox__background) {
  //   border-color: #6200ee;
  //   /* @alternate */
  //   border-color: var(--mdc-checkbox-checked-color, var(--mdc-theme-secondary, #6200ee));
  //   background-color: #6200ee;
  //   /* @alternate */
  //   background-color: var(--mdc-checkbox-checked-color, var(--mdc-theme-secondary, #6200ee));
  // }
  // @keyframes -global-mdc-checkbox-fade-in-background-8A000000FF6200EE00000000FF6200EE {
  //   0% {
  //     border-color: rgba(0, 0, 0, 0.54);
  //     /* @alternate */
  //     border-color: var(--mdc-checkbox-unchecked-color, rgba(0, 0, 0, 0.54));
  //     background-color: transparent;
  //   }
  //   50% {
  //     border-color: #6200ee;
  //     /* @alternate */
  //     border-color: var(--mdc-checkbox-checked-color, var(--mdc-theme-secondary, #6200ee));
  //     background-color: #6200ee;
  //     /* @alternate */
  //     background-color: var(--mdc-checkbox-checked-color, var(--mdc-theme-secondary, #6200ee));
  //   }
  // }
  // @keyframes -global-mdc-checkbox-fade-out-background-8A000000FF6200EE00000000FF6200EE {
  //   0%, 80% {
  //     border-color: #6200ee;
  //     /* @alternate */
  //     border-color: var(--mdc-checkbox-checked-color, var(--mdc-theme-secondary, #6200ee));
  //     background-color: #6200ee;
  //     /* @alternate */
  //     background-color: var(--mdc-checkbox-checked-color, var(--mdc-theme-secondary, #6200ee));
  //   }
  //   100% {
  //     border-color: rgba(0, 0, 0, 0.54);
  //     /* @alternate */
  //     border-color: var(--mdc-checkbox-unchecked-color, rgba(0, 0, 0, 0.54));
  //     background-color: transparent;
  //   }
  // }
  // :global(.mdc-data-table__header-row-checkbox.mdc-checkbox--anim-unchecked-checked) :global(.mdc-checkbox__native-control:enabled) ~ :global(.mdc-checkbox__background), :global(.mdc-data-table__header-row-checkbox.mdc-checkbox--anim-unchecked-indeterminate) :global(.mdc-checkbox__native-control:enabled) ~ :global(.mdc-checkbox__background), :global(.mdc-data-table__row-checkbox.mdc-checkbox--anim-unchecked-checked) :global(.mdc-checkbox__native-control:enabled) ~ :global(.mdc-checkbox__background), :global(.mdc-data-table__row-checkbox.mdc-checkbox--anim-unchecked-indeterminate) :global(.mdc-checkbox__native-control:enabled) ~ :global(.mdc-checkbox__background) {
  //   animation-name: mdc-checkbox-fade-in-background-8A000000FF6200EE00000000FF6200EE;
  // }
  // :global(.mdc-data-table__header-row-checkbox.mdc-checkbox--anim-checked-unchecked) :global(.mdc-checkbox__native-control:enabled) ~ :global(.mdc-checkbox__background), :global(.mdc-data-table__header-row-checkbox.mdc-checkbox--anim-indeterminate-unchecked) :global(.mdc-checkbox__native-control:enabled) ~ :global(.mdc-checkbox__background), :global(.mdc-data-table__row-checkbox.mdc-checkbox--anim-checked-unchecked) :global(.mdc-checkbox__native-control:enabled) ~ :global(.mdc-checkbox__background), :global(.mdc-data-table__row-checkbox.mdc-checkbox--anim-indeterminate-unchecked) :global(.mdc-checkbox__native-control:enabled) ~ :global(.mdc-checkbox__background) {
  //   animation-name: mdc-checkbox-fade-out-background-8A000000FF6200EE00000000FF6200EE;
  // }
</style>
