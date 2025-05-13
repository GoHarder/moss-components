<script lang="ts" module>
  import '@material/web/menu/menu.js';
  let context = false;
  let reducedMotion: boolean | undefined;
</script>

<script lang="ts">
  import { type Snippet, getContext, onDestroy, onMount } from 'svelte';

  // MARK: Types
  // ------------------------------------------------
  import { MdMenu } from '@material/web/menu/menu.js';

  type Props = {
    /** The child elements to render. */
    children: Snippet;
    /**
     * The ID of the element in the same root node in which the menu should align to.
     * Overrides setting `anchorElement = elementReference`.
     *
     * NOTE: anchor or anchorElement must either be an HTMLElement or resolve to an HTMLElement in order for menu to open.
     */
    anchor?: string;
    /**
     * Whether the positioning algorithm should calculate relative to the parent of the anchor element (`absolute`), relative to the window (`fixed`), or relative to the document (`document`).
     * `popover` will use the popover API to render the menu in the top-layer.
     * If your browser does not support the popover API, it will fall back to `fixed`.
     *
     * Examples for `position = 'fixed'`:
     * - If there is no `position:relative` in the given parent tree and the surface is `position:absolute`
     * - If the surface is `position:fixed`
     * - If the surface is in the "top layer"
     * - The anchor and the surface do not share a common `position:relative` ancestor
     *
     * When using `positioning=fixed`, in most cases, the menu should position itself above most other `position:absolute` or `position:fixed` elements when placed inside of them.
     * e.g. using a menu inside of an `md-dialog`.
     *
     * NOTE: Fixed menus will not scroll with the page and will be fixed to the window instead.
     *
     * Examples for `position = 'document'`:
     * - There is no parent that creates a relative positioning context e.g. `position: relative`, `position: absolute`, `transform: translate(x, y)`, etc.
     * - You put the effort into hoisting the menu to the top of the DOM like the end of the `<body>` to render over everything or in a top-layer.
     * - You are reusing a single `md-menu` element that dynamically renders content.
     *
     * Examples for `position = 'popover'`:
     * - Your browser supports popover.
     * - Most cases. Once popover is in browsers, this will become the default.
     */
    positioning?: MdMenu['positioning'];
    /** Skips the opening and closing animations. */
    quick?: boolean;
    /**
     * Displays overflow content like a submenu.
     * Not required in most cases when using `positioning="popover"`.
     *
     * NOTE: This may cause adverse effects if you set `md-menu {max-height:...}` and have items overflowing items in the "y" direction.
     */
    'has-overflow'?: boolean;
    /**
     * Opens the menu and makes it visible.
     * Alternative to the `.show()` and `.close()` methods
     */
    open?: boolean;
    /**
     * Offsets the menu's block alignment from the anchor by the given number in pixels.
     * This value is direction aware and will follow the LTR / RTL direction.
     * - LTR: positive -> right, negative -> left
     * - RTL: positive -> left, negative -> right
     */
    'x-offset'?: number;
    /**
     * Offsets the menu's block alignment from the anchor by the given number in pixels.
     * - positive -> down
     * - negative -> up
     */
    'y-offset'?: number;
    /** Disable the `flip` behavior that usually happens on the horizontal axis when the surface would render outside the viewport. */
    'no-horizontal-flip'?: boolean;
    /** Disable the `flip` behavior that usually happens on the vertical axis when the surface would render outside the viewport. */
    'no-vertical-flip'?: boolean;
    /** The max time between the keystrokes of the typeahead menu behavior before it clears the typeahead buffer. */
    'typeahead-delay'?: number;
    /**
     * The corner of the anchor which to align the menu in the standard logical property style of - e.g. `'end-start'`.
     *
     * NOTE: This value may not be respected by the menu positioning algorithm if the menu would render outside the viewport.
     * Use `no-horizontal-flip` or `no-vertical-flip` to force the usage of the value.
     */
    'anchor-corner'?: MdMenu['anchorCorner'];
    /**
     * The corner of the menu which to align the anchor in the standard logical property style of - e.g. `'start-start'`.
     *
     * NOTE: This value may not be respected by the menu positioning algorithm if the menu would render outside the viewport.
     * Use no-horizontal-flip or no-vertical-flip to force the usage of the value.
     */
    'menu-corner'?: MdMenu['menuCorner'];
    /**
     * Keeps the user clicks outside the menu.
     *
     * NOTE: clicking outside may still cause focusout to close the menu so see `stayOpenOnFocusout`.
     */
    'stay-open-on-outside-click'?: boolean;
    /**
     * Keeps the menu open when focus leaves the menu's composed subtree.
     *
     * NOTE: Focusout behavior will stop propagation of the focusout event.
     * Set this property to true to opt-out of menu's focusout handling altogether.
     */
    'stay-open-on-focusout'?: boolean;
    /** After closing, does not restore focus to the last focused element before the menu was opened. */
    'skip-restore-focus'?: boolean;
    /**
     * The element that should be focused by default once opened.
     *
     * NOTE: When setting default focus to 'LIST_ROOT', remember to change `tabindex` to `0` and change md-menu's display to something other than `display: contents` when necessary.
     */
    'default-focus'?: MdMenu['defaultFocus'];
    /**
     * Turns off navigation wrapping.
     * By default, navigating past the end of the menu items will wrap focus back to the beginning and vice versa.
     * Use this for ARIA patterns that do not wrap focus, like combobox.
     */
    'no-navigation-wrap'?: boolean;
    [key: string]: any;
  };

  // MARK: Properties
  // ------------------------------------------------
  let { children, positioning = 'popover', quick = false, open = $bindable(false), ...props }: Props = $props();

  // MARK: Variables
  // ------------------------------------------------
  let root: MdMenu | undefined = $state();

  // MARK: Contexts
  // ------------------------------------------------
  if (!context) reducedMotion = getContext('ReducedMotion');

  // MARK: Events
  // ------------------------------------------------
  function onclosed() {
    if (!root) return;
    open = root.open;
  }

  // MARK: Lifecycle
  // ------------------------------------------------
  onMount(() => {
    if (reducedMotion) quick = true;
    if (!root) return;
    root.addEventListener('closed', onclosed);
  });

  onDestroy(() => {
    if (!root) return;
    root.removeEventListener('closed', onclosed);
  });
</script>

<md-menu bind:this={root} {open} {quick} {positioning} {...props}>
  {@render children()}
</md-menu>
