<script lang="ts">
  // MARK: Types
  // ------------------------------------------------
  // MARK: Components
  // ------------------------------------------------
  import Section from './custom/section.svelte';
  import CodeBlock from './custom/code-block.svelte';
  import { Elevation } from '$lib/elevation/index.js';
  import Hero from './custom/hero.svelte';
  import PhoneTop from './custom/phone-top.svelte';
  import { Divider } from '$lib/divider/index.js';
  import { Icon } from '$lib/icon/index.js';
  import { AssistChip, ChipSet, FilterChip, InputChip, SuggestionChip } from '$lib/chip/index.js';
  import { TextField } from '$lib/text-field/index.js';

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
  let debug = $state(false);
  let expand = $state(false);

  let amenities = $state([
    { label: 'Washer / Dryer', selected: false },
    { label: 'Ramp access', selected: true },
    { label: 'Garden', selected: false },
    { label: 'Cats OK', selected: true },
    { label: 'Dogs OK', selected: false },
    { label: 'Smoke-free', selected: false },
  ]);

  let neighborhoods = $state([
    { label: 'Eagle Head', selected: true },
    { label: 'Rabbit Island', selected: true },
    { label: 'Downtown', selected: false },
    { label: 'Clinton Hill', selected: false },
    { label: 'Downtown Brooklyn', selected: false },
  ]);

  $inspect(amenities).with((type, amenities) => {
    if (!debug) return;
    console.log(type, 'amenities');
    console.table(amenities);
  });

  $inspect(neighborhoods).with((type, neighborhoods) => {
    if (!debug) return;
    console.log(type, 'amenities');
    console.table(neighborhoods);
  });

  // MARK: Contexts
  // ------------------------------------------------
  // MARK: Subscriptions
  // ------------------------------------------------
  // MARK: Reactive Rules
  // ------------------------------------------------
  // MARK: Events
  // ------------------------------------------------
  function assistClick(event: MouseEvent) {
    if (!debug) return;
    console.log('assist', event);
  }

  function inputClick(event: MouseEvent) {
    if (!debug) return;
    console.log('input', event);
  }

  function selectedClick(event: MouseEvent) {
    if (!debug) return;
    console.log('selected', event);
  }

  // MARK: Lifecycle
  // ------------------------------------------------
</script>

<Section bind:expand bind:debug>
  {#snippet header()}
    <h2>Chips</h2>
  {/snippet}

  {#snippet supportingText()}
    <p>Chips help people enter information, make selections, filter content, or trigger actions.</p>
  {/snippet}

  {#snippet hero()}
    <Hero class="chip-hero">
      <PhoneTop />
      <div class="label">
        <Icon>rule</Icon>
        <p>Amenities</p>
      </div>
      <div class="wrapper">
        <ChipSet>
          {#each amenities as chip}
            <FilterChip label={chip.label} bind:selected={chip.selected} />
          {/each}
        </ChipSet>
      </div>
      <Divider />
      <div class="label">
        <Icon>map</Icon>
        <p>Neighborhoods</p>
      </div>
      <div class="wrapper">
        <ChipSet>
          {#each neighborhoods as chip}
            <FilterChip label={chip.label} bind:selected={chip.selected} />
          {/each}
        </ChipSet>
      </div>
    </Hero>
  {/snippet}

  {#if expand}
    <div class="types elevated-card">
      <Elevation />
      <h3>Types</h3>
      <div class="examples">
        <div class="filled-card">
          <h4>Assist Chips</h4>
          <Divider />
          <p>A restaurant location</p>
          <ChipSet>
            <AssistChip label="Add to my itinerary">
              <Icon data-slot="icon">edit_calendar</Icon>
            </AssistChip>
            <AssistChip label="12 mins from hotel">
              <Icon data-slot="icon">map</Icon>
            </AssistChip>
          </ChipSet>
          <CodeBlock lang="svelte">
            {`<p>A restaurant location</p>
<ChipSet>
  <AssistChip label="Add to my itinerary">
    {#snippet slotIcon()}
      <Icon slot="icon">edit_calendar</Icon>
    {/snippet}
  </AssistChip>
  <AssistChip label="12 mins from hotel">
    {#snippet slotIcon()}
      <Icon slot="icon">map</Icon>
    {/snippet}
  </AssistChip>
</ChipSet>`}
          </CodeBlock>
        </div>
        <div class="filled-card">
          <h4>Filter Chips</h4>
          <Divider />
          <p>Choose where to share</p>
          <ChipSet>
            <FilterChip label="Docs" />
            <FilterChip label="Slides" selected />
            <FilterChip label="Sheets" selected />
            <FilterChip label="Images" />
          </ChipSet>
          <CodeBlock lang="svelte">
            {`<p>Choose where to share</p>
<ChipSet>
  <FilterChip label="Docs" />
  <FilterChip label="Slides" selected />
  <FilterChip label="Sheets" selected />
  <FilterChip label="Images" />
</ChipSet>`}
          </CodeBlock>
          <h5>Removable</h5>
          <Divider />
          <p>Colors</p>
          <ChipSet>
            <FilterChip label="Red" removable selected />
            <FilterChip label="Yellow" removable />
            <FilterChip label="Blue" removable />
            <FilterChip label="Green" removable />
          </ChipSet>
          <CodeBlock lang="svelte">
            {`<p>Colors</p>
<ChipSet>
  <FilterChip label="Red" removable selected />
  <FilterChip label="Yellow" removable />
  <FilterChip label="Blue" removable />
  <FilterChip label="Green" removable />
</ChipSet>`}
          </CodeBlock>
        </div>
        <div class="filled-card">
          <h4>Input Chips</h4>
          <TextField label="Attendees" type="email" outlined />
          <ChipSet>
            <InputChip label="Ping Qiang" avatar>
              <img alt="Avatar" data-slot="icon" src="https://avatar.iran.liara.run/public/1" />
            </InputChip>
            <InputChip label="Thea Schröder" avatar>
              <img alt="Avatar" data-slot="icon" src="https://avatar.iran.liara.run/public/2" />
            </InputChip>
          </ChipSet>
          <CodeBlock lang="svelte">
            {`<TextField label="Attendees" type="email" outlined />
<ChipSet>
  <InputChip label="Ping Qiang" avatar>
    {#snippet slotIcon()}
      <img alt="Avatar" slot="icon" src="..." />
    {/snippet}
  </InputChip>
  <InputChip label="Thea Schröder" avatar>
    {#snippet slotIcon()}
      <img alt="Avatar" slot="icon" src="..." />
    {/snippet}
  </InputChip>
</ChipSet>`}
          </CodeBlock>
          <h5>Remove-only</h5>
          <Divider />
          <p>Favorite movies</p>
          <ChipSet>
            <InputChip label="Star Wars" remove-only />
            <InputChip label="Star Trek" remove-only />
          </ChipSet>
          <CodeBlock lang="svelte">
            {`<p>Favorite movies</p>
<ChipSet>
  <InputChip label="Star Wars" remove-only />
  <InputChip label="Star Trek" remove-only />
</ChipSet>`}
          </CodeBlock>
        </div>
        <div class="filled-card">
          <h4>Suggestion Chips</h4>
          <Divider />
          <p>Suggested reply</p>
          <ChipSet>
            <SuggestionChip label="I agree" />
            <SuggestionChip label="Looks good to me" />
            <SuggestionChip label="Thank you" />
          </ChipSet>
          <CodeBlock lang="svelte">
            {`<p>Suggested reply</p>
<ChipSet>
  <SuggestionChip label="I agree" />
  <SuggestionChip label="Looks good to me" />
  <SuggestionChip label="Thank you" />
</ChipSet>`}
          </CodeBlock>
        </div>
      </div>
    </div>
    <div class="usage elevated-card">
      <Elevation />
      <h3>Usage</h3>
      <ChipSet>
        <AssistChip label="Assist" onclick={assistClick} />
        <FilterChip label="Filter" />
        <InputChip label="Input" onclick={inputClick} />
        <SuggestionChip label="Suggestion" onclick={selectedClick} />
      </ChipSet>
      <CodeBlock lang="svelte">
        {`<ChipSet>
  <AssistChip label="Assist" />
  <FilterChip label="Filter" />
  <InputChip label="Input" />
  <SuggestionChip label="Suggestion" />
</ChipSet>`}
      </CodeBlock>
      <div class="examples">
        <div class="filled-card">
          <h4>Chip Sets</h4>
          <Divider />
          <p>New event</p>
          <ChipSet>
            <FilterChip label="All day" />
            <AssistChip label="Add to calendar" />
            <AssistChip label="Set a reminder" />
          </ChipSet>
          <CodeBlock lang="svelte">
            {`<h3>New event</h3>
<ChipSet>
  <FilterChip label="All day" />
  <AssistChip label="Add to calendar" />
  <AssistChip label="Set a reminder" />
</ChipSet>`}
          </CodeBlock>
        </div>
        <div class="filled-card">
          <h4>Icons</h4>
          <ChipSet>
            <AssistChip label="Add to calendar">
              <Icon data-slot="icon">event</Icon>
            </AssistChip>
            <InputChip label="Ping Qiang">
              <img alt="Avatar" data-slot="icon" src="https://avatar.iran.liara.run/public" />
            </InputChip>
          </ChipSet>
          <CodeBlock lang="svelte">
            {`<ChipSet>
  <AssistChip label="Add to calendar">
    {#snippet slotIcon()}
      <Icon slot="icon">event</Icon>
    {/snippet}
  </AssistChip>
  <InputChip label="Ping Qiang">
    {#snippet slotIcon()}
      <img alt="Avatar" slot="icon" src="..." />
    {/snippet}
  </InputChip>
</ChipSet>`}
          </CodeBlock>
        </div>
        <div class="filled-card">
          <h4>Elevated</h4>
          <ChipSet>
            <SuggestionChip label="Share" elevated />
            <SuggestionChip label="Favorite" elevated />
          </ChipSet>
          <CodeBlock lang="svelte">
            {`<ChipSet>
  <SuggestionChip label="Share" elevated />
  <SuggestionChip label="Favorite" elevated />
</ChipSet>`}
          </CodeBlock>
        </div>
      </div>
    </div>
    <div class="accessibility elevated-card">
      <Elevation />
      <h3>Accessibility</h3>
      <Divider />
      <p id="dates-label">Dates</p>
      <ChipSet aria-labelledby="dates-label">
        <FilterChip label="Mon" aria-label="Monday" />
        <FilterChip label="Tue" aria-label="Tuesday" />
        <FilterChip label="Wed" aria-label="Wednesday" />
      </ChipSet>
      <CodeBlock lang="svelte">
        {`<p id="dates-label">Dates</p>
<ChipSet aria-labelledby="dates-label">
  <FilterChip label="Mon" aria-label="Monday" />
  <FilterChip label="Tue" aria-label="Tuesday" />
  <FilterChip label="Wed" aria-label="Wednesday" />
</ChipSet>`}
      </CodeBlock>
      <div class="filled-card">
        <h4>Focusable and disabled</h4>
        <ChipSet aria-label="Actions">
          <AssistChip label="Copy" soft-disabled />
          <AssistChip label="Paste" soft-disabled />
        </ChipSet>
        <CodeBlock lang="svelte">
          {`<ChipSet aria-label="Actions">
  <AssistChip label="Copy" soft-disabled />
  <AssistChip label="Paste" soft-disabled />
</ChipSet>`}
        </CodeBlock>
      </div>
    </div>
    <div class="theming elevated-card">
      <Elevation />
      <h3>Theming</h3>
      <div class="examples">
        <div class="filled-card">
          <h4>Assist Chips</h4>
          <AssistChip label="Assist" class="custom-assist" />
          <CodeBlock lang="css">
            {`:root {
  --md-assist-chip-container-shape: 0px;
  --md-assist-chip-label-text-font: system-ui;
  --md-sys-color-outline: #6f7979;
  --md-sys-color-on-surface: #191c1c;
}`}
          </CodeBlock>
        </div>
        <div class="filled-card">
          <h4>Filter Chips</h4>
          <FilterChip label="Filter" class="custom-filter" />
          <CodeBlock lang="css">
            {`:root {
  --md-filter-chip-container-shape: 0px;
  --md-filter-chip-label-text-font: system-ui;
  --md-sys-color-outline: #6f7979;
  --md-sys-color-on-surface: #191c1c;
  --md-sys-color-secondary-container: #cce8e7;
}`}
          </CodeBlock>
        </div>
        <div class="filled-card">
          <h4>Input Chips</h4>
          <InputChip label="Input" class="custom-input" />
          <CodeBlock lang="css">
            {`:root {
  --md-input-chip-container-shape: 0px;
  --md-input-chip-label-text-font: system-ui;
  --md-sys-color-outline: #6f7979;
  --md-sys-color-on-surface: #191c1c;
}`}
          </CodeBlock>
        </div>
        <div class="filled-card">
          <h4>Suggestion Chips</h4>
          <SuggestionChip label="Suggestion" class="custom-suggestion" />
          <CodeBlock lang="css">
            {`:root {
  --md-suggestion-chip-container-shape: 0px;
  --md-suggestion-chip-label-text-font: system-ui;
  --md-sys-color-outline: #6f7979;
  --md-sys-color-on-surface: #191c1c;
}`}
          </CodeBlock>
        </div>
      </div>
    </div>
  {/if}
</Section>

<style lang="scss">
  @use '../lib/scss/mixin.scss';

  :global(.chip-hero) {
    @include mixin.hero();
    width: 432px;

    .wrapper {
      margin-block-end: 12px;

      &:last-child {
        margin-block-end: 0;
      }
    }

    .label {
      display: flex;
      align-items: center;
      height: 48px;

      p {
        @include mixin.text('title-small');
        margin: 0;
        margin-inline-start: 8px;
      }
    }
  }

  .examples {
    margin-block-start: 16px;
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
    align-items: flex-start;
  }

  .theming :global(.custom-assist) {
    --md-assist-chip-container-shape: 0px;
    --md-assist-chip-label-text-font: system-ui;
    --md-sys-color-outline: #6f7979;
    --md-sys-color-on-surface: #191c1c;
  }

  .theming :global(.custom-filter) {
    --md-filter-chip-container-shape: 0px;
    --md-filter-chip-label-text-font: system-ui;
    --md-sys-color-outline: #6f7979;
    --md-sys-color-on-surface: #191c1c;
    --md-sys-color-secondary-container: #cce8e7;
  }

  .theming :global(.custom-input) {
    --md-input-chip-container-shape: 0px;
    --md-input-chip-label-text-font: system-ui;
    --md-sys-color-outline: #6f7979;
    --md-sys-color-on-surface: #191c1c;
  }

  .theming :global(.custom-suggestion) {
    --md-suggestion-chip-container-shape: 0px;
    --md-suggestion-chip-label-text-font: system-ui;
    --md-sys-color-outline: #6f7979;
    --md-sys-color-on-surface: #191c1c;
  }
</style>
