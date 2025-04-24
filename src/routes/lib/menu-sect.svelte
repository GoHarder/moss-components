<script lang="ts">
  // MARK: Types
  // ------------------------------------------------
  // MARK: Components
  // ------------------------------------------------
  import Section from './custom/section.svelte';
  import Hero from './custom/hero.svelte';
  import PhoneTop from './custom/phone-top.svelte';
  import CodeBlock from './custom/code-block.svelte';
  import { Elevation } from '$lib/elevation/index.js';
  import { Divider } from '$lib/divider/index.js';
  import { Button } from '$lib/button/index.js';
  import { IconButton } from '$lib/icon-button/index.js';
  import { Icon } from '$lib/icon/index.js';
  import { MenuItem, Menu, SubMenu } from '$lib/menu/index.js';
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

  let title = $state('');

  let menu = $state({
    hero: false,
    usageDoc: false,
    usageFixed: false,
    usagePopover: false,
    usageSubmenu: false,
    theme: false,
  });

  let focused = $state(false);

  // $inspect(menu);

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

    const menuKey = (event.target.dataset?.menu as keyof typeof menu) || '';

    if (!menuKey) return;

    menu[menuKey] = !menu[menuKey];
  }

  function updateTitle(event: MouseEvent) {
    if (!(event.target instanceof HTMLElement)) return;
    let text = event.target.innerText;

    if (text.includes('_')) text = '';

    title = text;
  }

  function onfocus() {
    focused = true;
  }

  function onblur() {
    focused = false;
  }

  // MARK: Lifecycle
  // ------------------------------------------------
</script>

<Section bind:expand bind:debug>
  {#snippet header()}
    <h2>Menus</h2>
  {/snippet}

  {#snippet supportingText()}
    <div>
      <p>Menus display a list of choices on a temporary surface.</p>
      <p>They appear when users interact with a button, action, or other control.</p>
    </div>
  {/snippet}

  {#snippet hero()}
    <Hero class="menu-hero">
      <PhoneTop />
      <div class="top-app-bar">
        <span class="left">
          <IconButton onclick={updateTitle}>
            <Icon>arrow_back</Icon>
          </IconButton>
          <p>{title}</p>
        </span>
        <span>
          <IconButton>
            <Icon>star</Icon>
          </IconButton>
          <span style="position: relative">
            <IconButton id="hero-menu" {onclick} data-menu="hero">
              <Icon>more_vert</Icon>
            </IconButton>
            <Menu anchor="hero-menu" bind:open={menu.hero} menu-corner="start-end" anchor-corner="end-end">
              <MenuItem onclick={updateTitle}>Revert</MenuItem>
              <MenuItem onclick={updateTitle}>Settings</MenuItem>
              <MenuItem onclick={updateTitle}>Send Feedback</MenuItem>
              <MenuItem onclick={updateTitle}>Help</MenuItem>
            </Menu>
          </span>
        </span>
      </div>
    </Hero>
  {/snippet}

  {#if expand}
    <div class="usage elevated-card">
      <Elevation />
      <h3>Usage</h3>
      <div class="examples">
        <div class="filled-card">
          <h4>Submenus</h4>
          <span style="position: relative">
            <Button id="usage-submenu" variant="filled" {onclick} data-menu="usageSubmenu">Menu with submenus</Button>
            <Menu has-overflow anchor="usage-submenu" bind:open={menu.usageSubmenu}>
              <SubMenu>
                <MenuItem data-slot="item">
                  <div data-slot="headline">Fruits with A</div>
                  <Icon data-slot="end">arrow_right</Icon>
                </MenuItem>
                <Menu data-slot="menu">
                  <MenuItem>Apricot</MenuItem>
                  <MenuItem>Avocado</MenuItem>
                  <SubMenu menu-corner="start-end" anchor-corner="start-start">
                    <MenuItem data-slot="item">
                      <div data-slot="headline">Apples</div>
                      <Icon data-slot="start">arrow_left</Icon>
                    </MenuItem>
                    <Menu data-slot="menu" menu-corner="start-end" anchor-corner="start-start">
                      <MenuItem>Fuji</MenuItem>
                      <MenuItem>Granny Smith</MenuItem>
                      <MenuItem>Red Delicious</MenuItem>
                    </Menu>
                  </SubMenu>
                </Menu>
              </SubMenu>
              <MenuItem>Banana</MenuItem>
              <MenuItem>Cucumber</MenuItem>
            </Menu>
          </span>
          <CodeBlock lang="svelte">
            {`<Menu has-overflow anchor="usage-submenu" bind:open={menu.usageSubmenu}>
  <SubMenu>
    {#snippet slotItem()}
      <MenuItem slot="item">
        {#snippet slotHeadline()}
          <div slot="headline">Fruits with A</div>
        {/snippet}
        {#snippet slotEnd()}
          <Icon slot="end">arrow_right</Icon>
        {/snippet}
      </MenuItem>
    {/snippet}
    {#snippet slotMenu()}
      <Menu slot="menu">
        <MenuItem>Apricot</MenuItem>
        <MenuItem>Avocado</MenuItem>
        <SubMenu menu-corner="start-end" anchor-corner="start-start">
          {#snippet slotItem()}
            <MenuItem slot="item">
              {#snippet slotHeadline()}
                <div slot="headline">Apples</div>
              {/snippet}
              {#snippet slotStart()}
                <Icon slot="start">arrow_left</Icon>
              {/snippet}
            </MenuItem>
          {/snippet}
          {#snippet slotMenu()}
            <Menu
              slot="menu"
              menu-corner="start-end"
              anchor-corner="start-start"
            >
              <MenuItem>Fuji</MenuItem>
              <MenuItem>Granny Smith</MenuItem>
              <MenuItem>Red Delicious</MenuItem>
            </Menu>
          {/snippet}
        </SubMenu>
      </Menu>
    {/snippet}
  </SubMenu>
  <MenuItem>Banana</MenuItem>
  <MenuItem>Cucumber</MenuItem>
</Menu>`}
          </CodeBlock>
        </div>
        <div class="filled-card">
          <h4>Popover-positioned menus</h4>
          <span style="position: relative">
            <Button id="usage-popover" variant="filled" {onclick} data-menu="usagePopover">Open popover menu</Button>
            <Menu anchor="usage-popover" bind:open={menu.usagePopover}>
              <MenuItem>Apple</MenuItem>
              <MenuItem>Banana</MenuItem>
              <MenuItem>Cucumber</MenuItem>
            </Menu>
          </span>
          <CodeBlock lang="svelte">
            {`<Menu
  anchor="usage-popover"
  bind:open={menu.usagePopover}
>
  <MenuItem>Apple</MenuItem>
  <MenuItem>Banana</MenuItem>
  <MenuItem>Cucumber</MenuItem>
</Menu>`}
          </CodeBlock>
        </div>
        <div class="filled-card">
          <h4>Fixed-positioned menus</h4>
          <Button id="usage-fixed" variant="filled" {onclick} data-menu="usageFixed">Open fixed menu</Button>
          <Menu positioning="fixed" anchor="usage-fixed" bind:open={menu.usageFixed}>
            <MenuItem>Apple</MenuItem>
            <MenuItem>Banana</MenuItem>
            <MenuItem>Cucumber</MenuItem>
          </Menu>
          <CodeBlock lang="svelte">
            {`<Menu
  positioning="fixed"
  anchor="usage-fixed"
  bind:open={menu.usageFixed}
>
  <MenuItem>Apple</MenuItem>
  <MenuItem>Banana</MenuItem>
  <MenuItem>Cucumber</MenuItem>
</Menu>`}
          </CodeBlock>
        </div>
        <div class="filled-card">
          <h4>Document-positioned menus</h4>
          <Button id="usage-doc" variant="filled" {onclick} data-menu="usageDoc">Open document menu</Button>
          <Menu positioning="document" anchor="usage-doc" bind:open={menu.usageDoc}>
            <MenuItem>Apple</MenuItem>
            <MenuItem>Banana</MenuItem>
            <MenuItem>Cucumber</MenuItem>
          </Menu>
          <CodeBlock lang="svelte">
            {`<Menu
  positioning="document"
  anchor="usage-doc"
  bind:open={menu.usageDoc}
>
  <MenuItem>Apple</MenuItem>
  <MenuItem>Banana</MenuItem>
  <MenuItem>Cucumber</MenuItem>
</Menu>`}
          </CodeBlock>
        </div>
      </div>
    </div>
    <div class="elevated-card">
      <Elevation />
      <h3>Accessibility</h3>
      <span style="position: relative">
        <TextField {onfocus} {onblur} id="textfield" aria-controls="menu" aria-autocomplete="list" aria-expanded="true" aria-activedescendant="1" value="Ala" />
        <Menu id="menu" anchor="textfield" role="listbox" aria-label="states" default-focus="none" bind:open={focused}>
          <MenuItem type="option" id="0">Alabama</MenuItem>
          <Divider role="separator" tabindex="-1" />
          <MenuItem type="option" id="1" selected aria-selected="true">Alabama</MenuItem>
        </Menu>
      </span>
      <CodeBlock lang="svelte">
        {`<!--
  A simplified example of an autocomplete component 
  missing javascript logic for interaction.
-->
<TextField
  id="textfield"
  type="combobox"
  aria-controls="menu"
  aria-autocomplete="list"
  aria-expanded="true"
  aria-activedescendant="1"
  value="Ala"
/>
<Menu id="menu" anchor="textfield" role="listbox" aria-label="states" open>
  <MenuItem type="option" id="0">Alabama</MenuItem>
  <Divider role="separator" tabindex="-1" />
  <MenuItem type="option" id="1" selected aria-selected="true">
    Alabama
  </MenuItem>
</Menu>`}
      </CodeBlock>
    </div>

    <div class="theming elevated-card">
      <Elevation />
      <h3>Theming</h3>

      <span style="position: relative">
        <Button id="theming-submenu" variant="filled" {onclick} data-menu="theme">Themed menu</Button>
        <Menu anchor="theming-submenu" bind:open={menu.theme}>
          <MenuItem>Apple</MenuItem>
          <MenuItem>Banana</MenuItem>
          <MenuItem>Cucumber</MenuItem>
        </Menu>
      </span>

      <CodeBlock lang="css">
        {`:root {
  background-color: #f4fbfa;
  --md-menu-container-color: #f4fbfa;
  --md-menu-container-shape: 0px;
  --md-sys-color-on-surface: #161d1d;
  --md-sys-typescale-body-large-font: system-ui;
}
md-menu-item {
  border-radius: 28px;
}
md-menu-item::part(focus-ring) {
  border-radius: 28px;
}
/* Styles for button and not relevant to menu */
md-filled-button {
  --md-sys-color-primary: #006a6a;
  --md-sys-color-on-primary: #ffffff;
}`}
      </CodeBlock>
    </div>
  {/if}
</Section>

<style lang="scss">
  @use '../lib/scss/mixin.scss';

  :global(.menu-hero) {
    @include mixin.hero();
    width: 432px;

    .left {
      display: flex;
      align-items: center;
      gap: 8px;

      p {
        @include mixin.text('title-large');
        margin-block: 0;
      }
    }

    .top-app-bar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 64px;
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
      md-menu {
        background-color: #f4fbfa;
        --md-menu-container-color: #f4fbfa;
        --md-menu-container-shape: 0px;
        --md-sys-color-on-surface: #161d1d;
        --md-sys-typescale-body-large-font: system-ui;
      }

      md-menu-item {
        border-radius: 28px;
      }

      md-menu-item::part(focus-ring) {
        border-radius: 28px;
      }

      md-filled-button {
        --md-sys-color-primary: #006a6a;
        --md-sys-color-on-primary: #ffffff;
      }
    }
  }
</style>
