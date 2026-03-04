<script lang="ts">
  import { SvelteMap } from 'svelte/reactivity';

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
  function sortString(str1: string, str2: string, direction: 'none' | 'ascending' | 'descending') {
    if (direction === 'none') return 0;
    if (direction === 'ascending') return str1.localeCompare(str2);
    return str2.localeCompare(str1);
  }

  function sortNumber(num1: number, num2: number, direction: 'none' | 'ascending' | 'descending') {
    if (direction === 'none') return 0;
    if (direction === 'ascending') return num1 - num2;
    return num2 - num1;
  }

  // MARK: State
  // -----------------------------------------------------------------------------
  let debug = $state(false);
  let expand = $state(false);
  let rows = $state([
    {
      contract: '000000',
      jobName: 'Example Job 0',
      carNo: 1,
      customer: 'Example Customer 0',
      layoutNo: 'L-0003',
      created: '2022-01-01,',
      lastOpened: '2022-01-01,',
      createdBy: 'Gary Miller,',
    },
    {
      contract: '000000',
      jobName: 'Example Job 1',
      carNo: 1,
      customer: 'Example Customer 1',
      layoutNo: 'L-0000',
      created: '2022-01-01',
      lastOpened: '2022-01-01',
      createdBy: 'John Miller',
    },
    {
      contract: '000002',
      jobName: 'Example Job 2',
      carNo: 2,
      customer: 'Example Customer 2',
      layoutNo: 'L-0002',
      created: '2022-01-01',
      lastOpened: '2022-01-01',
      createdBy: 'Steve Miller',
    },
  ]);

  let sortState = new SvelteMap<string, 'none' | 'ascending' | 'descending'>([
    ['contract', 'none'],
    ['jobName', 'none'],
    ['carNo', 'none'],
    ['customer', 'none'],
    ['layoutNo', 'none'],
  ]);

  // MARK: Derived
  // -----------------------------------------------------------------------------
  // MARK: Effects
  // -----------------------------------------------------------------------------
  $effect(() => {
    rows.sort((a, b) => {
      const contract = sortString(a.contract, b.contract, sortState.get('contract')!);
      const jobName = sortString(a.jobName, b.jobName, sortState.get('jobName')!);
      const carNo = sortNumber(a.carNo, b.carNo, sortState.get('carNo')!);
      const customer = sortString(a.customer, b.customer, sortState.get('customer')!);
      const layoutNo = sortString(a.layoutNo, b.layoutNo, sortState.get('layoutNo')!);
      // console.log(contract, jobName, carNo, customer, layoutNo);
      // console.log(contract || jobName || carNo || customer || layoutNo);

      return contract || jobName || carNo || customer || layoutNo;
    });
  });

  // MARK: Contexts
  // -----------------------------------------------------------------------------
  // MARK: Subscriptions
  // -----------------------------------------------------------------------------
  // MARK: Events
  // -----------------------------------------------------------------------------
  function onSort(event: SortedEvent) {
    const { columnId, sortValue } = event.detail;
    sortState.set(columnId, sortValue);
  }

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
      <Table {onSort}>
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
        {#each rows as row}
          <Row>
            <Cell>{row.contract}</Cell>
            <Cell>{row.jobName}</Cell>
            <Cell>{row.carNo}</Cell>
            <Cell>{row.customer}</Cell>
            <Cell>{row.layoutNo}</Cell>
            <Cell>{row.created}</Cell>
            <Cell>{row.lastOpened}</Cell>
            <Cell>{row.createdBy}</Cell>
          </Row>
        {/each}
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
