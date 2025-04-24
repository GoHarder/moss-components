<script lang="ts">
  // MARK: Types
  // ------------------------------------------------
  // MARK: Components
  // ------------------------------------------------
  import { Icon } from '$lib/icon/index.js';

  // MARK: Stores
  // ------------------------------------------------
  // MARK: Properties
  // ------------------------------------------------
  let { class: cssClass = '' } = $props();

  // MARK: Methods
  // ------------------------------------------------
  // MARK: Constants
  // ------------------------------------------------
  // MARK: Variables
  // ------------------------------------------------
  const time = new Date().toLocaleTimeString(undefined, { timeStyle: 'short' });

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

<div class={['phone', cssClass]}>
  <p>{time.slice(0, -3)}</p>
  <div class="icons">
    <Icon>signal_wifi_4_bar</Icon>
    <Icon>signal_cellular_4_bar</Icon>
    <Icon>battery_4_bar</Icon>
  </div>
</div>

<style lang="scss">
  .phone {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-inline: 8px;

    p {
      margin: 0;
    }

    .icons {
      --md-icon-size: 20px;
    }
  }
</style>
