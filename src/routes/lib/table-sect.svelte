<script lang="ts">
  // MARK: Types
  // -----------------------------------------------------------------------------
  // MARK: Components
  // -----------------------------------------------------------------------------
  import Section from './custom/section.svelte';
  import Hero from './custom/hero.svelte';
  import { Cell, Nav, Row, Table } from '$lib/table/index.js';

  // MARK: Stores
  // -----------------------------------------------------------------------------
  // MARK: Properties
  // -----------------------------------------------------------------------------
  // MARK: Globals
  // -----------------------------------------------------------------------------
  // MARK: Helpers
  // -----------------------------------------------------------------------------
  // MARK: State
  // -----------------------------------------------------------------------------
  let debug = $state(false);
  let expand = $state(false);

  // MARK: Derived
  // -----------------------------------------------------------------------------
  // MARK: Effects
  // -----------------------------------------------------------------------------
  // MARK: Contexts
  // -----------------------------------------------------------------------------
  // MARK: Subscriptions
  // -----------------------------------------------------------------------------
  // MARK: Events
  // -----------------------------------------------------------------------------
  // MARK: Lifecycle
  // -----------------------------------------------------------------------------
</script>

<Section bind:expand bind:debug>
  {#snippet header()}
    <h2>Tables</h2>
  {/snippet}

  {#snippet supportingText()}
    <p>Table description</p>
  {/snippet}

  {#snippet hero()}
    <Hero class="button-hero">
      <Table>
        {#snippet slot_head()}
          <Row>
            <Cell scope="col" role="columnheader" sort="contract">Contract #</Cell>
            <Cell scope="col" role="columnheader" sort="jobName">Job Name</Cell>
            <Cell scope="col" role="columnheader" sort="carNo">Car #</Cell>
            <Cell scope="col" role="columnheader" sort="customer">Customer</Cell>
            <Cell scope="col" role="columnheader" sort="layout">Layout #</Cell>
            <Cell scope="col" role="columnheader">Created</Cell>
            <Cell scope="col" role="columnheader">Last Opened</Cell>
            <Cell scope="col" role="columnheader">Owned By</Cell>
          </Row>
        {/snippet}
        <Row>
          <Cell>000000</Cell>
          <Cell>Example Job</Cell>
          <Cell>1</Cell>
          <Cell>Example Customer</Cell>
          <Cell>L-0000</Cell>
          <Cell>2022-01-01</Cell>
          <Cell>2022-01-01</Cell>
          <Cell>Gary Miller</Cell>
        </Row>
        <Row>
          <Cell>000000</Cell>
          <Cell>Example Job</Cell>
          <Cell>1</Cell>
          <Cell>Example Customer</Cell>
          <Cell>L-0000</Cell>
          <Cell>2022-01-01</Cell>
          <Cell>2022-01-01</Cell>
          <Cell>Gary Miller</Cell>
        </Row>
        <Row>
          <Cell>000000</Cell>
          <Cell>Example Job</Cell>
          <Cell>1</Cell>
          <Cell>Example Customer</Cell>
          <Cell>L-0000</Cell>
          <Cell>2022-01-01</Cell>
          <Cell>2022-01-01</Cell>
          <Cell>Gary Miller</Cell>
        </Row>
        {#snippet slot_pagination()}
          <Nav page={1} length={10} total={100} maxRows={5} />
        {/snippet}
      </Table>
    </Hero>
  {/snippet}

  {#if expand}
    <p>Expanded content</p>
  {/if}
</Section>

<!-- <style lang="scss">
  @use '../lib/scss/mixin.scss';
</style> -->
