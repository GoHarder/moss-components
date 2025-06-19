<script lang="ts">
  // MARK: Types
  // ------------------------------------------------
  // MARK: Components
  // ------------------------------------------------
  import Section from './custom/section.svelte';
  import Hero from './custom/hero.svelte';
  import CodeBlock from './custom/code-block.svelte';
  import { Elevation } from '$lib/elevation/index.js';
  import { Option, Select } from '$lib/select/index.js';

  // MARK: Stores
  // ------------------------------------------------
  // MARK: Properties
  // ------------------------------------------------
  // MARK: Methods
  // ------------------------------------------------
  // MARK: Constants
  // ------------------------------------------------
  const numbers = Array.from({ length: 20 }, (_, i) => i + 1);

  // MARK: Variables
  // ------------------------------------------------
  let debug = $state(false);
  let expand = $state(false);

  let options = [
    { name: '33-009', diameter: 22 },
    { name: '33-011', diameter: 24 },
    { name: '43-007', diameter: 20 },
    { name: '43-015', diameter: 28 },
    { name: '53-010', diameter: 22 },
    { name: '53-011', diameter: 25 },
  ];

  let value: string | undefined = $state();
  let selected: (typeof options)[number] | undefined = $state();
  let diameter = $derived(selected ? selected.diameter : undefined);

  let roping: number | undefined = $state();

  $inspect(value).with((type, value) => {
    if (!debug) return;
    console.log('value:   ', type, value);
    console.log('selected:', $state.snapshot(selected));
    console.log('diameter:', $state.snapshot(diameter));
  });

  $inspect(roping).with((type, roping) => {
    if (!debug) return;
    console.log('roping:  ', type, roping, typeof roping);
  });

  // MARK: Contexts
  // ------------------------------------------------
  // MARK: Subscriptions
  // ------------------------------------------------
  // MARK: Reactive Rules
  // ------------------------------------------------
  // MARK: Events
  // ------------------------------------------------
  // MARK: Lifecycle
  // ------------------------------------------------
</script>

<Section bind:expand bind:debug>
  {#snippet header()}
    <h2>Select</h2>
  {/snippet}

  {#snippet supportingText()}
    <p>Select menus display a list of choices on temporary surfaces and display the currently selected menu item above the menu.</p>
  {/snippet}

  {#snippet hero()}
    <Hero class="button-hero">
      {#if debug}
        <Select label="Sheave" outlined bind:value bind:selected {options}>
          {#each options as { name, diameter }}
            <Option value={name}>
              {name}
              <div data-slot="end">{diameter}"</div>
            </Option>
          {/each}
        </Select>
        <Select label="Roping" outlined bind:value={roping} type="number">
          <Option value="1">1:1</Option>
          <Option value="2">2:1</Option>
        </Select>
      {:else}
        <Select label="Label" value="2" outlined required>
          {#each numbers as i}
            <Option value={i.toString()}>Item {i}</Option>
          {/each}
        </Select>
      {/if}
    </Hero>
  {/snippet}

  {#if expand}
    <div class="usage elevated-card">
      <Elevation />
      <h3>Usage</h3>
      <Select value="apricot">
        <Option value="none" aria-label="blank"></Option>
        <Option value="apple">Apple</Option>
        <Option value="apricot">Apricot</Option>
      </Select>
      <CodeBlock lang="svelte">
        {`<Select value="apricot">
  <Option value="none" aria-label="blank">
  </Option>
  <Option value="apple">
    Apple
  </Option>
  <Option value="apricot">
    Apricot
  </Option>
</Select>`}
      </CodeBlock>
      <div class="icon filled-card">
        <h4 class="trim">Required select</h4>
        <Select required>
          <Option value="one">One</Option>
          <Option value="two">Two</Option>
        </Select>
        <CodeBlock lang="svelte">
          {`<Select required>
  <Option value="one">One</Option>
  <Option value="two">Two</Option>
</Select>`}
        </CodeBlock>
      </div>
    </div>

    <div class="theming elevated-card">
      <Elevation />
      <h3>Theming</h3>
      <div class="examples">
        <div class="filled-card">
          <h4>Filled Select</h4>
          <Select label="Label" value="2" class="filled-select">
            <Option value="1">Item 1</Option>
            <Option value="2">Item 2</Option>
            <Option value="3">Item 3</Option>
          </Select>
          <CodeBlock lang="css">
            {`:root {
  --md-filled-select-text-field-container-shape: 0px;
  --md-filled-select-text-field-container-color: #f7faf9;
  --md-filled-select-text-field-input-text-color: #005353;
  --md-filled-select-text-field-input-text-font: system-ui;
}

md-filled-select::part(menu) {
  --md-menu-container-color: #f4fbfa;
  --md-menu-container-shape: 0px;
}`}
          </CodeBlock>
        </div>
        <div class="filled-card">
          <h4>Outlined Select</h4>
          <Select label="Label" value="2" outlined class="outlined-select">
            <Option value="1">Item 1</Option>
            <Option value="2">Item 2</Option>
            <Option value="3">Item 3</Option>
          </Select>

          <CodeBlock lang="css">
            {`:root {
  --md-outlined-select-text-field-outline-color: #6e7979;
  --md-outlined-select-text-field-container-shape: 0px;
  --md-outlined-select-text-field-input-text-color: #005353;
  --md-outlined-select-text-field-input-text-font: system-ui;
}

md-outlined-select::part(menu) {
  --md-menu-container-color: #f4fbfa;
  --md-menu-container-shape: 0px;
}`}
          </CodeBlock>
        </div>
      </div>
    </div>
  {/if}
</Section>

<style lang="scss">
  .examples {
    margin-block-start: 16px;
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
    align-items: flex-start;
  }

  .theming {
    :global(.filled-select) {
      --md-filled-select-text-field-container-shape: 0px;
      --md-filled-select-text-field-container-color: #f7faf9;
      --md-filled-select-text-field-input-text-color: #005353;
      --md-filled-select-text-field-input-text-font: system-ui;
      --md-menu-container-color: #f4fbfa;
      --md-menu-container-shape: 0px;
    }

    :global(.outlined-select) {
      --md-outlined-select-text-field-outline-color: #6e7979;
      --md-outlined-select-text-field-container-shape: 0px;
      --md-outlined-select-text-field-input-text-color: #005353;
      --md-outlined-select-text-field-input-text-font: system-ui;
      --md-menu-container-color: #f4fbfa;
      --md-menu-container-shape: 0px;
    }
  }
</style>
