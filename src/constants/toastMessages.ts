import { IToastGroup } from 'interfaces/toastMessages'

export const GENERIC: IToastGroup = {
  SUCCESS: {
    message: 'Success',
    severity: 'success',
  },
  ERROR: {
    message: 'Something went wrong.',
    severity: 'error',
  },
  USER_NOT_SELECTED: {
    message: 'Please select a user before proceeding.',
    severity: 'warning',
  },
}

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

export const GENERATE_NP_NP_SETTLEMENT: IToastGroup = {
  SUCCESS: {
    message: 'NP-NP settlement generated successfully.',
    severity: 'success',
  },
  ERROR: {
    message: 'Failed to generate NP-NP settlement.',
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

export const TOKEN_MESSAGES: IToastGroup = {
  ERROR: {
    message: 'Failed to sign token.',
    severity: 'error',
  },
  SUCCESS: {
    message: 'Token signed successfully.',
    severity: 'success',
  },
}

export const FILE_DOWNLOAD_MESSAGES: IToastGroup = {
  ERROR: {
    message: 'Failed to download file.',
    severity: 'error',
  },
  SUCCESS: {
    message: 'File downloaded successfully.',
    severity: 'success',
  },
}

export const CSV_EXPORT_MESSAGES: IToastGroup = {
  SUCCESS: {
    message: 'CSV file downloaded successfully!',
    severity: 'success',
  },
  ERROR: {
    message: 'Failed to export CSV file.',
    severity: 'error',
  },
  NO_DATA: {
    message: 'No orders available for export.',
    severity: 'warning',
  },
}

export const ORDER_PATCH_MESSAGES: IToastGroup = {
  ERROR: {
    message: 'Failed to update order.',
    severity: 'error',
  },
  SUCCESS: {
    message: 'Order updated successfully.',
    severity: 'success',
  },
}

export const SETTLEMENT_PATCH_MESSAGES: IToastGroup = {
  ERROR: {
    message: 'Failed to update settlement.',
    severity: 'error',
  },
  SUCCESS: {
    message: 'Settlement updated successfully.',
    severity: 'success',
  },
}
