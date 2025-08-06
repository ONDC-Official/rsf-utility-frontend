export enum SettlementType {
  MISC = 'MISC',
  NP_NP = 'NP-NP',
  NIL = 'NIL',
}

export enum APIRoute {
  USERS = '/ui/users',
  SETTLEMENTS_PAYLOAD = '/ui/rsf-payloads',
  GENERATE_MISC = '/ui/generate/{userId}/settle/misc',
  GENERATE_NIL = '/ui/generate/{userId}/settle/nil',
  TRIGGER_ACTION = '/ui/trigger/{userId}/{action}',
}
