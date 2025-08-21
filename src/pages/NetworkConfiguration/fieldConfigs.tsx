// Field configuration objects to reduce repetitive code

export const basicFields = [
  {
    name: 'role' as const,
    label: 'Role',
    type: 'select',
    required: true,
    placeholder: 'Select Role',
    options: [
      { value: 'Seller App', label: 'Seller App' },
      { value: 'Buyer App', label: 'Buyer App' },
    ],
  },
  {
    name: 'domainCategory' as const,
    label: 'Domain/Category',
    type: 'select',
    required: true,
    placeholder: 'Select Domain Category',
    options: [], // Will be populated from DOMAIN_CATEGORIES
  },
  {
    name: 'selectedType' as const,
    label: 'Type',
    type: 'select',
    required: true,
    placeholder: 'Select Type',
    options: [
      { value: 'MSN', label: 'MSN' },
      { value: 'ISN', label: 'ISN' },
    ],
    showCondition: (role: string) => role === 'Seller App',
  },
  {
    name: 'subscriberUrl' as const,
    label: 'Subscriber URL',
    type: 'input',
    required: true,
    placeholder: 'Enter Subscriber URL',
    validation: {
      pattern: {
        value: /^(https?:\/\/)?([\\da-z.-]+)\\.([a-z.]{2,6})([\\/\\w.-]*)*\/?$/,
        message: 'Invalid URL',
      },
    },
  },
]

export const buyerTaxFields = [
  {
    section: 'left',
    fields: [
      {
        name: 'buyerNpToNpTcs' as const,
        label: 'NP-to-NP TCS (%)',
        type: 'number',
        required: true,
        placeholder: 'Enter NP-to-NP TCS (%)',
        hasTooltip: true,
        tooltipText: 'TCS applicable for Buyer NP to NP',
        validation: {
          min: { value: 0, message: 'TCS cannot be negative' },
          max: { value: 100, message: 'TCS cannot exceed 100%' },
        },
      },
      {
        name: 'effectiveDate1' as const,
        label: 'With Effective Date',
        type: 'date',
        required: true,
        placeholder: 'dd/mm/yyyy',
      },
    ],
  },
  {
    section: 'right',
    fields: [
      {
        name: 'buyerNpToNpTds' as const,
        label: 'NP to NP TDS (%)',
        type: 'number',
        required: true,
        placeholder: 'Enter NP to NP TDS (%)',
        hasTooltip: true,
        tooltipText: 'TDS applicable for Buyer NP to NP',
        validation: {
          min: { value: 0, message: 'TDS cannot be negative' },
          max: { value: 100, message: 'TDS cannot exceed 100%' },
        },
      },
      {
        name: 'effectiveDate2' as const,
        label: 'With Effective Date',
        type: 'date',
        required: true,
        placeholder: 'dd/mm/yyyy',
      },
    ],
  },
]

export const sellerTaxFields = [
  {
    section: 'left',
    fields: [
      {
        name: 'sellerNpToTcs' as const,
        label: 'NP-to-NP TCS (%)',
        type: 'number',
        required: true,
        placeholder: 'Enter NP-to-NP TCS (%)',
        hasTooltip: true,
        tooltipText: 'TCS applicable for Seller NP to NP',
        validation: {
          min: { value: 0, message: 'TCS cannot be negative' },
          max: { value: 100, message: 'TCS cannot exceed 100%' },
        },
      },
      {
        name: 'effectiveDate3' as const,
        label: 'With Effective Date',
        type: 'date',
        required: true,
        placeholder: 'dd/mm/yyyy',
      },
    ],
  },
  {
    section: 'right',
    fields: [
      {
        name: 'sellerNpToTds' as const,
        label: 'NP to NP TDS (%)',
        type: 'number',
        required: true,
        placeholder: 'Enter NP to NP TDS (%)',
        hasTooltip: true,
        tooltipText: 'TDS applicable for Seller NP to NP',
        validation: {
          min: { value: 0, message: 'TDS cannot be negative' },
          max: { value: 100, message: 'TDS cannot exceed 100%' },
        },
      },
      {
        name: 'effectiveDate4' as const,
        label: 'With Effective Date',
        type: 'date',
        required: true,
        placeholder: 'dd/mm/yyyy',
      },
    ],
  },
]

export const sellerProviderTaxFields = [
  {
    section: 'left',
    fields: [
      {
        name: 'sellerNpToProviderTcs' as const,
        label: 'NP-to-Provider TCS (%)',
        type: 'number',
        required: true,
        placeholder: 'Enter NP-to-Provider TCS (%)',
        hasTooltip: true,
        tooltipText: 'TCS applicable for Seller NP to Provider',
        validation: {
          min: { value: 0, message: 'TCS cannot be negative' },
          max: { value: 100, message: 'TCS cannot exceed 100%' },
        },
      },
      {
        name: 'effectiveDate5' as const,
        label: 'With Effective Date',
        type: 'date',
        required: true,
        placeholder: 'dd/mm/yyyy',
      },
    ],
  },
  {
    section: 'right',
    fields: [
      {
        name: 'sellerNpToProviderTds' as const,
        label: 'NP to Provider TDS (%)',
        type: 'number',
        required: true,
        placeholder: 'Enter NP to Provider TDS (%)',
        hasTooltip: true,
        tooltipText: 'TDS applicable for Seller NP to Provider',
        validation: {
          min: { value: 0, message: 'TDS cannot be negative' },
          max: { value: 100, message: 'TDS cannot exceed 100%' },
        },
      },
      {
        name: 'effectiveDate6' as const,
        label: 'With Effective Date',
        type: 'date',
        required: true,
        placeholder: 'dd/mm/yyyy',
      },
    ],
  },
]

export const applicabilityFields = [
  {
    name: 'tcs_applicability' as const,
    label: 'TCS Applicability',
    type: 'select',
    required: true,
    placeholder: 'Select',
    options: [
      { value: 'None', label: 'None' },
      { value: 'ISN', label: 'ISN' },
      { value: 'MSN', label: 'MSN' },
      { value: 'Both', label: 'Both' },
    ],
  },
  {
    name: 'tds_applicability' as const,
    label: 'TDS Applicability',
    type: 'select',
    required: true,
    placeholder: 'Select',
    options: [
      { value: 'None', label: 'None' },
      { value: 'ISN', label: 'ISN' },
      { value: 'MSN', label: 'MSN' },
      { value: 'Both', label: 'Both' },
    ],
  },
]

export const providerFields = [
  {
    name: 'providerId' as const,
    label: 'Provider ID',
    type: 'input',
    placeholder: 'Enter Provider ID',
    required: false,
  },
  {
    name: 'accountNumber' as const,
    label: 'Account Number',
    type: 'input',
    placeholder: 'Enter Account Number',
    required: false,
    validation: {
      pattern: {
        value: /^\d{9,18}$/,
        message: 'Must be 9-18 digits',
      },
    },
  },
  {
    name: 'ifscCode' as const,
    label: 'IFSC Code',
    type: 'input',
    placeholder: 'Enter IFSC Code',
    required: false,
    validation: {
      pattern: {
        value: /^[A-Z]{4}0[A-Z0-9]{6}$/,
        message: 'Invalid IFSC code',
      },
    },
  },
  {
    name: 'bankName' as const,
    label: 'Bank Name',
    type: 'input',
    placeholder: 'Enter Bank Name',
    required: false,
    validation: {
      minLength: {
        value: 3,
        message: 'Minimum 3 characters',
      },
    },
  },
]
