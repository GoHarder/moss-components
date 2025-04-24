<script lang="ts">
  import '@material/web/slider/slider.js';
  import { onDestroy, onMount } from 'svelte';

  // MARK: Types
  // ------------------------------------------------
  import { MdSlider } from '@material/web/slider/slider.js';

  type Props = {
    /** The slider minimum value*/
    min?: number;
    /** The slider maximum value */
    max?: number;
    /** The slider value displayed when range is false. */
    value?: number;
    /** The slider start value displayed when range is true. */
    valuestart?: number;
    /** The slider end value displayed when range is true. */
    valueend?: number;
    /**
     * An optional label for the slider's value displayed when range is false;
     * if not set, the label is the value itself.
     */
    'value-label'?: string;
    /**
     * An optional label for the slider's start value displayed when range is true;
     * if not set, the label is the valueStart itself.
     */
    'value-label-start'?: string;
    /**
     * An optional label for the slider's end value displayed when range is true;
     * if not set, the label is the valueEnd itself.
     */
    'value-label-end'?: string;
    /** Aria label for the slider's start handle displayed when range is true. */
    'aria-label-start'?: string;
    /** Aria value text for the slider's start value displayed when range is true. */
    'aria-valuetext-start'?: string;
    /** Aria label for the slider's end handle displayed when range is true. */
    'aria-label-end'?: string;
    /** Aria value text for the slider's end value displayed when range is true. */
    'aria-valuetext-end'?: string;
    /** The step between values. */
    step?: number;
    /** Whether or not to show tick marks. */
    ticks?: boolean;
    /** Whether or not to show a value label when activated. */
    labeled?: boolean;
    /**
     * Whether or not to show a value range.
     * When false, the slider displays a slide-able handle for the value property;
     * when true, it displays slide-able handles for the `valueStart` and `valueEnd` properties.
     */
    range?: boolean;
    disabled?: boolean;
    [key: string]: any;
  };

  // MARK: Properties
  // ------------------------------------------------
  let { value = $bindable(), valuestart = $bindable(), valueend = $bindable(), ...props }: Props = $props();

  // MARK: Variables
  // ------------------------------------------------
  let root: MdSlider | undefined = $state();

  // MARK: Events
  // ------------------------------------------------
  function onchange(_event: Event) {
    if (!root) return;
    value = root.value;
    valuestart = root.valueStart;
    valueend = root.valueEnd;
  }

  // MARK: Lifecycle
  // ------------------------------------------------
  onMount(() => {
    if (!root) return;
    root.addEventListener('change', onchange);
  });

  onDestroy(() => {
    if (!root) return;
    root.removeEventListener('change', onchange);
  });
</script>

<md-slider bind:this={root} {value} value-start={valuestart} value-end={valueend} {...props}></md-slider>
