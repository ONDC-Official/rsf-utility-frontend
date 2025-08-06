export enum PrepareButtonState {
  DISABLED = 'disabled',
  PREPARE = 'prepare',
  GENERATE = 'generate',
}

export const ORDER_HEADER_LABELS = {
  title: 'Orders Ready',
  subtitle: 'Select orders to prepare for settlement',
  receiverLabel: 'Receiver ID',
  prepareZero: 'Prepare (0 selected)',
  prepareWithCount: (count: number) => `Prepare (${count} selected)`,
  generateWithCount: (count: number) => `Generate (${count} selected)`,
}
