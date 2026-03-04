declare global {
  interface ElementEventMap {
    'MDCDataTable:sorted': SortedEvent;
  }

  interface SortedEvent extends Event {
    detail: {
      columnId: string;
      columnIndex: number;
      sortValue: 'ascending' | 'descending';
    };
  }
}

export {};
