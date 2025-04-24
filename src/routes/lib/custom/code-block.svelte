<script lang="ts">
  import { type Snippet, onMount } from 'svelte';
  import hljs from 'highlight.js';
  // @ts-ignore
  import hljsSvelte from 'highlightjs-svelte';

  hljsSvelte(hljs);

  // MARK: Types
  // ------------------------------------------------
  type Props = {
    /** The child elements to render. */
    children: Snippet;

    lang: string;
  };

  // MARK: Components
  // ------------------------------------------------
  import { IconButton } from '$lib/icon-button/index.js';
  import { Icon } from '$lib/icon/index.js';

  // MARK: Stores
  // ------------------------------------------------
  // MARK: Properties
  // ------------------------------------------------
  let { children, lang }: Props = $props();

  // MARK: Methods
  // ------------------------------------------------
  // MARK: Constants
  // ------------------------------------------------
  // MARK: Variables
  // ------------------------------------------------
  let root: HTMLElement;

  // MARK: Contexts
  // ------------------------------------------------
  // MARK: Subscriptions
  // ------------------------------------------------
  // MARK: Reactive Rules
  // ------------------------------------------------
  // MARK: Events
  // ------------------------------------------------
  function onclick() {
    navigator.clipboard.writeText(root.innerText);
  }

  // MARK: Lifecycle
  // ------------------------------------------------
  onMount(() => {
    hljs.highlightElement(root);
  });
</script>

<div class="wrapper">
  <pre><code bind:this={root} class={['code', `language-${lang}`]}>
{@render children()}
  </code></pre>
  <IconButton {onclick}>
    <Icon>content_copy</Icon>
  </IconButton>
</div>

<style lang="scss">
  .wrapper {
    position: relative;

    :global(md-icon-button) {
      position: absolute;
      top: 0;
      right: 0;
    }
  }

  .code {
    /* padding-block: 0; */
    border-radius: var(--md-sys-shape-corner-medium);
    padding-block: 0;
    margin-block: 0;
    padding-inline-end: 40px;
  }
</style>
