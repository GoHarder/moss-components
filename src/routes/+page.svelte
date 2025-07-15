<script lang="ts">
  import '../sass/index.scss';
  import { setContext, onMount } from 'svelte';

  // MARK: Types
  // ------------------------------------------------
  // MARK: Components
  // ------------------------------------------------
  import ButtonSect from './lib/button-sect.svelte';
  import CheckboxSect from './lib/checkbox-sect.svelte';
  import ChipSect from './lib/chip-sect.svelte';
  import DialogSect from './lib/dialog-sect.svelte';
  import DividerSect from './lib/divider-sect.svelte';
  import ElevationSect from './lib/elevation-sect.svelte';
  import FabSect from './lib/fab-sect.svelte';
  import FocusRingSect from './lib/focus-ring-sect.svelte';
  import IconButtonSect from './lib/icon-button-sect.svelte';
  import IconSect from './lib/icon-sect.svelte';
  import ListSect from './lib/list-sect.svelte';
  import MenuSect from './lib/menu-sect.svelte';
  import ProgressSect from './lib/progress-sect.svelte';
  import RadioSect from './lib/radio-sect.svelte';
  import RippleSect from './lib/ripple-sect.svelte';
  import SelectSect from './lib/select-sect.svelte';
  import SnackbarSect from './lib/snackbar-sect.svelte';
  import SvgSect from './lib/svg-sect.svelte';
  import SliderSect from './lib/slider-sect.svelte';
  import SwitchSect from './lib/switch-sect.svelte';
  import TabsSect from './lib/tabs-sect.svelte';
  import TextFieldSect from './lib/text-field-sect.svelte';
  import TooltipSect from './lib/tooltip-sect.svelte';

  // import { Rail, RailItem } from '$lib/navigation/index.js';
  // import { Icon } from '$lib/icon/index.js';

  // MARK: Stores
  // ------------------------------------------------
  // MARK: Properties
  // ------------------------------------------------
  // MARK: Methods
  // ------------------------------------------------
  // MARK: Constants
  // ------------------------------------------------
  // MARK: Variables
  // ------------------------------------------------
  // MARK: Contexts
  // ------------------------------------------------
  setContext('ComponentSettings', {
    select: {
      // noAsterisk: true,
      // variant: 'outlined',
    },
    textField: {
      // noAsterisk: true,
      // variant: 'outlined',
      noSpinner: true,
    },
  });

  // MARK: Subscriptions
  // ------------------------------------------------
  // MARK: Reactive Rules
  // ------------------------------------------------
  // MARK: Events
  // ------------------------------------------------
  // MARK: Lifecycle
  // ------------------------------------------------
  onMount(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    setContext('ReducedMotion', prefersReducedMotion);
  });
</script>

<!-- <Rail>
  <RailItem>
    <Icon>home</Icon>
  </RailItem>
  <RailItem>
    <Icon>dashboard</Icon>
  </RailItem>
  <RailItem>
    <Icon>calendar_month</Icon>
  </RailItem>
  <RailItem>
    <Icon>person</Icon>
  </RailItem>
</Rail> -->

<main>
  <SvgSect />

  <SnackbarSect />
  <ButtonSect />
  <CheckboxSect />
  <ChipSect />
  <DialogSect />
  <DividerSect />
  <ElevationSect />
  <FabSect />
  <FocusRingSect />
  <IconButtonSect />
  <IconSect />
  <ListSect />
  <MenuSect />
  <ProgressSect />
  <RadioSect />
  <RippleSect />
  <SelectSect />
  <SliderSect />
  <SwitchSect />
  <TabsSect />
  <TextFieldSect />
  <TooltipSect />
</main>

<style>
  main {
    /* height: 100dvh; */
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
    align-items: flex-start;
    padding: 16px;
  }
</style>
