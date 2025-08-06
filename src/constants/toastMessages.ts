import { IToastGroup } from 'interfaces/toastMessages'

export const GENERATE_MISC_SETTLEMENT: IToastGroup = {
  SUCCESS: {
    message: 'Misc settlement generated successfully.',
    severity: 'success',
  },
  ERROR: {
    message: 'Failed to generate misc settlement.',
    severity: 'error',
  },
}

export const GENERATE_NIL_SETTLEMENT: IToastGroup = {
  SUCCESS: {
    message: 'Nil settlement triggered successfully.',
    severity: 'success',
  },
  ERROR: {
    message: 'Failed to trigger nil settlement.',
    severity: 'error',
  },
}

export const TRIGGER_ACTION: IToastGroup = {
  SUCCESS: {
    message: 'Trigger completed successfully.',
    severity: 'success',
  },
  ERROR: {
    message: 'Something went wrong while triggering.',
    severity: 'error',
  },
}

export const NETWORK_CONFIGURATION: IToastGroup = {
  SUCCESS: {
    message: 'Configuration saved successfully.',
    severity: 'success',
  },
  ERROR: {
    message: 'Failed to save configuration.',
    severity: 'error',
  },
}
