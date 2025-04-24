<script lang="ts">
  // MARK: Types
  // ------------------------------------------------
  // MARK: Components
  // ------------------------------------------------
  import Section from './custom/section.svelte';
  import CodeBlock from './custom/code-block.svelte';
  import Hero from './custom/hero.svelte';
  import { Elevation } from '$lib/elevation/index.js';
  import { Button } from '$lib/button/index.js';
  import { Dialog } from '$lib/dialog/index.js';
  import { Divider } from '$lib/divider/index.js';
  import { Radio } from '$lib/radio/index.js';

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

  let dialog = $state({
    hero: false,
    usage: false,
    openClose: false,
    returnValue: false,
    accessibility: false,
    alerts: false,
    theming: false,
  });

  let returnValue = $state('');

  $inspect(dialog).with((type, dialog) => {
    if (!debug) return;
    console.log(type, 'dialog');
    console.table(dialog);
  });

  $inspect(returnValue).with((type, returnValue) => {
    if (!debug) return;
    console.log(type, 'returnValue', returnValue || '<empty string>');
  });

  // MARK: Contexts
  // ------------------------------------------------
  // MARK: Subscriptions
  // ------------------------------------------------
  // MARK: Reactive Rules
  // ------------------------------------------------
  // MARK: Events
  // ------------------------------------------------
  function onclick(event: MouseEvent) {
    if (!(event.target instanceof HTMLElement)) return;
    const menuKey = (event.target.dataset?.dialog as keyof typeof dialog) || '';
    if (!menuKey) return;
    dialog[menuKey] = !dialog[menuKey];
  }

  // MARK: Lifecycle
  // ------------------------------------------------
</script>

<Section bind:expand bind:debug>
  {#snippet header()}
    <h2>Dialogs</h2>
  {/snippet}

  {#snippet supportingText()}
    <p>They can require an action, communicate information for making decisions, or help users accomplish a focused task.</p>
  {/snippet}

  {#snippet hero()}
    <Hero class="dialog-hero">
      <Button variant="filled" {onclick} data-dialog="hero">Select ringtone</Button>
      <Dialog bind:open={dialog.hero}>
        <div data-slot="headline">Phone ringtone</div>
        <form data-slot="content" id="hero-form-id" method="dialog">
          <Divider />
          <div class="option">
            <Radio id="radio-none" name="ringtone" value="none" />
            <label for="radio-none">None</label>
          </div>
          <div class="option">
            <Radio id="radio-callisto" name="ringtone" value="callisto" />
            <label for="radio-callisto">Callisto</label>
          </div>
          <div class="option">
            <Radio id="radio-ganymede" name="ringtone" value="ganymede" />
            <label for="radio-ganymede">Ganymede</label>
          </div>
          <div class="option">
            <Radio id="radio-luna" name="ringtone" value="luna" />
            <label for="radio-luna">Luna</label>
          </div>
          <Divider />
        </form>
        <div data-slot="actions">
          <Button form="hero-form-id">Cancel</Button>
          <Button form="hero-form-id">Ok</Button>
        </div>
      </Dialog>
    </Hero>
  {/snippet}

  {#if expand}
    <div class="usage elevated-card">
      <Elevation />
      <h3>Usage</h3>
      <Button variant="tonal" {onclick} data-dialog="usage">Usage example</Button>
      <Dialog bind:open={dialog.usage}>
        <div data-slot="headline">Dialog title</div>
        <form data-slot="content" id="usage-form-id" method="dialog">A simple dialog with free-form content.</form>
        <div data-slot="actions">
          <Button form="usage-form-id">Ok</Button>
        </div>
      </Dialog>
      <CodeBlock lang="svelte">
        {`<Dialog bind:open={dialog.usage}>
  {#snippet slotHeadline()}
    <div slot="headline">Dialog title</div>
  {/snippet}
  {#snippet slotContent()}
    <form slot="content" id="usage-form-id" method="dialog">
      A simple dialog with free-form content.
    </form>
  {/snippet}
  {#snippet slotActions()}
    <div slot="actions">
      <Button form="usage-form-id">Ok</Button>
    </div>
  {/snippet}
</Dialog>`}
      </CodeBlock>
      <div class="examples">
        <div class="filled-card">
          <h4>Opening and closing</h4>
          <Button variant="elevated" {onclick} data-dialog="openClose">Open and close example</Button>
          <Dialog bind:open={dialog.openClose}>
            <div data-slot="content">
              <p>A dialog that is opened by default.</p>
              <p>Not really in this case because that would be annoying.</p>
            </div>
          </Dialog>
          <CodeBlock lang="svelte">
            {`<Dialog open>
  {#snippet slotContent()}
    <div slot="content">
      A dialog that is opened by default.
    </div>
  {/snippet}
</Dialog>`}
          </CodeBlock>
        </div>
        <div class="filled-card">
          <h4>Return value</h4>
          <Button variant="elevated" {onclick} data-dialog="returnValue">Return Value example</Button>
          <Dialog bind:open={dialog.returnValue} bind:returnvalue={returnValue}>
            <form data-slot="content" id="return-value-form-id" method="dialog">...</form>
            <div data-slot="actions">
              <Button form="return-value-form-id" value="cancel">Cancel</Button>
              <Button form="return-value-form-id" value="ok">Ok</Button>
            </div>
          </Dialog>
          <CodeBlock lang="svelte">
            {`<Dialog bind:open={dialog.returnValue}>
  {#snippet slotContent()}
    <form 
      slot="content"
      id="return-value-form-id"
      method="dialog"
    >
      ...
    </form>
  {/snippet}
  {#snippet slotActions()}
    <div slot="actions">
      <Button
        form="return-value-form-id"
        value="cancel"
      >
        Cancel
      </Button>
      <Button 
        form="return-value-form-id"
        value="ok"
      >
        Ok
      </Button>
    </div>
  {/snippet}
</Dialog>`}
          </CodeBlock>
        </div>
      </div>
    </div>
    <div class="usage elevated-card">
      <Elevation />
      <h3>Accessibility</h3>
      <Button variant="tonal" {onclick} data-dialog="accessibility">Accessibility example</Button>
      <Dialog bind:open={dialog.accessibility} aria-label="Error message">
        <div data-slot="content">An error occurred, details ...</div>
      </Dialog>
      <CodeBlock lang="svelte">
        {`<Dialog bind:open={dialog.accessibility} aria-label="Error message">
  {#snippet slotContent()}
    <div slot="content">An error occurred, details ...</div>
  {/snippet}
</Dialog>`}
      </CodeBlock>
      <div class="filled-card">
        <h4>Alerts</h4>
        <Button variant="elevated" {onclick} data-dialog="alerts">Alerts example</Button>
        <Dialog bind:open={dialog.alerts} type="alert">
          <div data-slot="headline">Confirm deletion</div>
          <form data-slot="content" id="alerts-form-id" method="dialog">Are you sure you wish to delete this item?</form>
          <div data-slot="actions">
            <Button form="alerts-form-id" value="cancel">Cancel</Button>
            <Button form="alerts-form-id" value="delete">Delete</Button>
          </div>
        </Dialog>
        <CodeBlock lang="svelte">
          {`<Dialog bind:open={dialog.alerts} type="alert">
  {#snippet slotHeadline()}
    <div slot="headline">Confirm deletion</div>
  {/snippet}
  {#snippet slotContent()}
    <form slot="content" id="alerts-form-id" method="dialog">
      Are you sure you wish to delete this item?
    </form>
  {/snippet}
  {#snippet slotActions()}
    <div slot="actions">
      <Button form="alerts-form-id" value="cancel">Cancel</Button>
      <Button form="alerts-form-id" value="delete">Delete</Button>
    </div>
  {/snippet}
</Dialog>`}
        </CodeBlock>
      </div>
    </div>
    <div class="theming elevated-card">
      <Elevation />
      <h3>Theming</h3>
      <Button variant="tonal" {onclick} data-dialog="theming">Theming example</Button>
      <Dialog class="dialog" bind:open={dialog.theming}>
        <div data-slot="headline">Title</div>
        <div data-slot="content">Dialog content</div>
      </Dialog>
      <CodeBlock lang="css">
        {`:root {
  /* System tokens */
  --md-sys-color-surface-container-high: #dde4e3;
  --md-sys-color-on-surface: #161d1d;
  --md-sys-color-on-surface-variant: #3f4948;
  --md-sys-typescale-body-medium: system-ui 16px/24px;
  --md-sys-typescale-headline-small: system-ui 24px/32px;
  /* Component tokens */
  --md-dialog-container-shape: 0px;
}`}
      </CodeBlock>
    </div>
  {/if}
</Section>

<style lang="scss">
  @use '../lib/scss/mixin.scss';

  .option {
    display: grid;
    align-items: center;
    justify-items: center;

    grid-template-columns: 40px 1fr;
    height: 40px;

    label {
      justify-self: start;
    }
  }

  .examples {
    margin-block-start: 16px;
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
    align-items: flex-start;
  }

  .theming {
    :global {
      .dialog {
        /* System tokens */
        --md-sys-color-surface-container-high: #dde4e3;
        --md-sys-color-on-surface: #161d1d;
        --md-sys-color-on-surface-variant: #3f4948;
        --md-sys-typescale-body-medium: system-ui 16px/24px;
        --md-sys-typescale-headline-small: system-ui 24px/32px;
        /* Component tokens */
        --md-dialog-container-shape: 0px;
      }
    }
  }
</style>
