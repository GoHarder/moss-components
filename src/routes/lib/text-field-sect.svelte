<script lang="ts">
  // MARK: Types
  // ------------------------------------------------
  // MARK: Components
  // ------------------------------------------------
  import Section from './custom/section.svelte';
  import Hero from './custom/hero.svelte';
  import CodeBlock from './custom/code-block.svelte';
  import { Divider } from '$lib/divider/index.js';
  import { Elevation } from '$lib/elevation/index.js';
  import { IconButton } from '$lib/icon-button/index.js';
  import { Icon } from '$lib/icon/index.js';
  import { LengthField, NumberField, TextField } from '$lib/text-field/index.js';

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
  let value = $state('');
  let passwordVisible = $state(false);
  let passwordInputType: 'text' | 'password' = $derived(passwordVisible ? 'text' : 'password');

  let lengthTest1: number | undefined = $state();
  let lengthTest2: number | undefined = $state(92.125);

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
    <h2>Text Fields</h2>
  {/snippet}

  {#snippet supportingText()}
    <div>
      <p>Text fields allow users to enter text into a UI.</p>
      <p>They typically appear in forms and dialogs.</p>
    </div>
  {/snippet}

  {#snippet hero()}
    <Hero class="text-field-hero">
      <div class="row">
        <Icon>person</Icon>
        <TextField label="First name" outlined value="Odette" />
      </div>
      <div class="row">
        <TextField label="Last name" outlined value="D'Ambricourt" />
      </div>
      <div class="row">
        <Icon>phone</Icon>
        <TextField label="Phone" outlined bind:value />
      </div>
      <div class="row">
        <Icon>location_on</Icon>
        <TextField label="Address" outlined />
      </div>
    </Hero>
  {/snippet}

  {#if expand}
    <div class="usage elevated-card">
      <Elevation />
      <h3>Usage</h3>
      <TextField label="Label" value="Value" />
      <TextField label="Label" outlined value="Value" />

      <div class="examples">
        <div class="filled-card">
          <h4>Input type</h4>
          <TextField label="Username" type="email" />
          <TextField label="Password" type="password" />
          <CodeBlock lang="svelte">
            {`<TextField label="Username" type="email" />
<TextField label="Password" type="password" />`}
          </CodeBlock>
        </div>

        <div class="filled-card">
          <h4>Labels</h4>
          <TextField label="Favorite food" />
          <TextField placeholder="email@domain.com" />
          <p>First name</p>
          <TextField aria-label="First name" />
        </div>

        <div class="filled-card">
          <h4>Textarea</h4>
          <TextField label="Vertical resize" type="textarea" rows={3} style="resize: vertical;" />
          <CodeBlock lang="svelte">
            {`<TextField
  label="Vertical 
  resize" 
  type="textarea" 
  rows={3} 
  class="vertical" 
/>`}
          </CodeBlock>
          <CodeBlock lang="css">
            {`.vertical {
  resize: vertical;
}`}
          </CodeBlock>
        </div>
        <div class="filled-card">
          <h4>Icons</h4>
          <TextField label="Search for messages" outlined>
            <Icon data-slot="leading-icon">search</Icon>
          </TextField>
          <TextField label="Password" outlined type={passwordInputType}>
            <IconButton data-slot="trailing-icon" toggle bind:selected={passwordVisible}>
              <Icon>visibility</Icon>
              <Icon data-slot="selected">visibility_off</Icon>
            </IconButton>
          </TextField>
          <TextField label="Username" error error-text="Username not available" outlined>
            <Icon data-slot="trailing-icon">error</Icon>
          </TextField>
          <CodeBlock lang="svelte">
            {`<TextField label="Search for messages" outlined>
  {#snippet slotLeadingIcon()}
    <Icon slot="leading-icon">search</Icon>
  {/snippet}
</TextField>

<TextField label="Password" type={inputType} outlined>
  {#snippet slotTrailingIcon()}
    <IconButton slot="trailing-icon" toggle bind:selected={passwordVisible}>
      <Icon>visibility</Icon>
      {#snippet slotSelected()}
        <Icon slot="selected">visibility_off</Icon>
      {/snippet}
    </IconButton>
  {/snippet}
</TextField>

<TextField label="Username" error error-text="Username not available" outlined>
  {#snippet slotTrailingIcon()}
    <Icon slot="trailing-icon">error</Icon>
  {/snippet}
</TextField>`}
          </CodeBlock>
        </div>
        <div class="filled-card">
          <h4>Prefix and suffix</h4>
          <TextField label="Dollar amount" prefix-text="$" suffix-text=".00" outlined value="0" type="number" />
          <CodeBlock lang="svelte">
            {`<TextField
  label="Dollar amount"
  prefix-text="$"
  suffix-text=".00"
  outlined
  value="0"
  type="number"
/>`}
          </CodeBlock>
        </div>
        <div class="filled-card">
          <h4>Supporting text</h4>
          <TextField label="Comments" supporting-text="Provide comments for the issue" />
          <TextField label="Name" supporting-text="*required" required />
          <CodeBlock lang="svelte">
            {`<TextField
  label="Comments"
  supporting-text="Provide comments for the issue"
/>
<TextField
  label="Name"
  supporting-text="*required"
  required
/>`}
          </CodeBlock>
        </div>
        <div class="filled-card">
          <h4>Character counter</h4>
          <TextField label="Title" value="Short" outlined maxlength={10} />
          <CodeBlock lang="svelte">
            {`<TextField
  label="Title"
  value="Short"
  outlined
  maxlength={10}
/>`}
          </CodeBlock>
        </div>
        <div class="filled-card">
          <h4>Validation</h4>
          <Divider />
          <h5>Constraint validation</h5>
          <form>
            <TextField name="name" label="Name" required />
            <TextField name="email" label="Email" pattern="[\w\d-]+" suffix-text="@gmail.com" />
            <IconButton>
              <Icon>output</Icon>
            </IconButton>
          </form>
          <CodeBlock lang="svelte">
            {`<form>
  <TextField 
    name="name"
    label="Name"
    required
  />
  <TextField
    name="email"
    label="Email"
    pattern="[\w\d-]+"
    suffix-text="@gmail.com"
  />
</form>`}
          </CodeBlock>
          <h5>Manual validation</h5>
          <TextField label="Username" outlined value="jdoe" error error-text="Username is not available" />
          <CodeBlock lang="svelte">
            {`<TextField
  label="Username"
  outlined
  value="jdoe"
  error
  error-text="Username is not available"
/>`}
          </CodeBlock>
        </div>
      </div>
    </div>

    <div class="accessibility elevated-card">
      <Elevation />
      <h3>Accessibility</h3>
      <div>Username</div>
      <TextField aria-label="Username" />
      <TextField label="First" aria-label="First name" />
      <CodeBlock lang="svelte">
        {`<TextField aria-label="Username" />
<TextField label="First" aria-label="First name" />`}
      </CodeBlock>
    </div>

    <div class="theming elevated-card">
      <Elevation />
      <h3>Theming</h3>
      <div class="examples">
        <div class="filled-card">
          <h4>Filled text field</h4>
          <TextField label="Filled" value="Value" class="filled" />
          <CodeBlock lang="css">
            {`:root {
  --md-filled-text-field-container-shape: 0px;
  --md-sys-typescale-body-large: 400 1rem system-ui;
  --md-sys-color-primary: #006a6a;
  --md-sys-color-surface-container-highest: #e0e3e2;
  --md-filled-text-field-label-text-color: #3f4948;
  --md-filled-text-field-input-text-color: #161d1d;
}`}
          </CodeBlock>
        </div>
        <div class="filled-card">
          <h4>Outlined text field</h4>
          <TextField label="Outlined" value="Value" outlined class="outlined" />
          <CodeBlock lang="css">
            {`:root {
  --md-outlined-text-field-container-shape: 0px;
  --md-sys-typescale-body-large: 400 1rem system-ui;
  --md-sys-color-primary: #006a6a;
  --md-outlined-text-field-label-text-color: #3f4948;
  --md-outlined-text-field-input-text-color: #161d1d;
}`}
          </CodeBlock>
        </div>
      </div>
    </div>

    <div class="theming elevated-card">
      <Elevation />
      <h3>Custom</h3>
      <div class="examples">
        <div class="filled-card">
          <h4>Number fields</h4>
          <div class="number-grid">
            <NumberField label="Arc of contact" type="angle" value={90} outlined no-spinner />
            <NumberField label="Platform area" type="area" value={1728} outlined no-spinner />
            <NumberField label="Pressure" type="pressure" value={0.00694} metric outlined no-spinner />
            <NumberField label="Car speed" type="speed" value={100} metric outlined no-spinner />
            <NumberField label="Torque" type="torque" value={1} metric outlined no-spinner />
            <NumberField label="Capacity" type="weight" value={1000} metric outlined no-spinner />
          </div>
          <CodeBlock lang="svelte">
            {`<NumberField label="Arc of contact" type="angle" value={90} outlined no-spinner />
<NumberField label="Platform area" type="area" value={1728} outlined no-spinner />
<NumberField label="Pressure" type="pressure" value={0.00694} metric outlined no-spinner />
<NumberField label="Car speed" type="speed" value={100} metric outlined no-spinner />
<NumberField label="Torque" type="torque" value={1} metric outlined no-spinner />
<NumberField label="Capacity" type="weight" value={1000} metric outlined no-spinner />`}
          </CodeBlock>
        </div>
        <div class="filled-card">
          <h4>Length fields</h4>
          <div class="length-container">
            <LengthField label="Rope drop" bind:value={lengthTest1} />
            <LengthField label="Car width" bind:value={lengthTest2} outlined />
          </div>
        </div>
      </div>
    </div>
  {/if}
</Section>

<style lang="scss">
  @use '../lib/scss/mixin.scss';

  :global(.text-field-hero) {
    @include mixin.hero();
    // Layout
    align-items: flex-end;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    width: max-content;
    // Other
    gap: 16px;

    .row {
      display: flex;
      align-items: center;
      gap: 12px;
    }
  }

  .examples {
    margin-block-start: 16px;
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
    align-items: flex-start;
  }

  .number-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 16px;
    align-items: start;
  }

  .length-container {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .theming {
    :global {
      .filled {
        --md-filled-text-field-container-shape: 0px;
        --md-sys-typescale-body-large: 400 1rem system-ui;
        --md-sys-color-primary: #006a6a;
        --md-sys-color-surface-container-highest: #e0e3e2;
        --md-filled-text-field-label-text-color: #3f4948;
        --md-filled-text-field-input-text-color: #161d1d;
      }
      .outlined {
        --md-outlined-text-field-container-shape: 0px;
        --md-sys-typescale-body-large: 400 1rem system-ui;
        --md-sys-color-primary: #006a6a;
        --md-outlined-text-field-label-text-color: #3f4948;
        --md-outlined-text-field-input-text-color: #161d1d;
      }
    }
  }
</style>
