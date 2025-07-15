<script lang="ts">
  // MARK: Types
  // ------------------------------------------------
  type Props = {
    /** The path to the image to load. */
    src: string;
    /** Css class to apply to the image. */
    class?: string;

    title?: string;
  };

  // MARK: Components
  // ------------------------------------------------
  // MARK: Stores
  // ------------------------------------------------
  // MARK: Properties
  // ------------------------------------------------
  let { src, title, class: propClass }: Props = $props();

  // MARK: Methods
  // ------------------------------------------------
  // MARK: Constants
  // ------------------------------------------------
  // MARK: Variables
  // ------------------------------------------------
  let root: HTMLObjectElement | undefined = $state();
  let svg: SVGElement | undefined | null = $state();

  // MARK: Contexts
  // ------------------------------------------------
  // MARK: Subscriptions
  // ------------------------------------------------
  // MARK: Reactive Rules
  // ------------------------------------------------

  $effect(() => {
    if (!svg || !propClass) return;
    svg.setAttribute('class', propClass);
  });

  // MARK: Events
  // ------------------------------------------------
  function onload() {
    if (!root) return;
    svg = root.contentDocument?.querySelector('svg');
    if (!svg) return;
    root.insertAdjacentElement('afterend', svg);
    root.remove();
  }

  // MARK: Lifecycle
  // ------------------------------------------------
</script>

<object bind:this={root} data={src} class={propClass} type="image/svg+xml" {title} {onload}></object>
