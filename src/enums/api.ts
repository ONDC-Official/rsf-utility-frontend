export enum APIRoute {
  USERS = '/ui/users',
  SETTLEMENTS_PAYLOAD = '/ui/rsf-payloads',
  GENERATE_MISC = '/ui/generate/{userId}/settle/misc',
  GENERATE_NIL = '/ui/generate/{userId}/settle/nil',
  GENERATE_NP_NP = '/ui/generate/{userId}/settle/np-np',
  TRIGGER_ACTION = '/ui/trigger/{userId}/{action}',
  ORDERS = '/ui/orders/{userId}',
  SETTLE_PREPARE = '/ui/settle/{userId}/prepare',
  SETTLEMENTS_LIST = '/ui/settle/{userId}',
}
