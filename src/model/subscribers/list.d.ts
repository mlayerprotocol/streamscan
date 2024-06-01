export interface SubscriberListModel {
  data: SubscriberData[];
  _meta: Meta;
}

export interface Meta {
  version: string;
}

export interface SubscriberData {
  CreatedAt: Date;
  UpdatedAt: Date;
  DeletedAt: any;
  id: string;
  top: string;
  ref: string;
  meta: string;
  snet: string;
  sub: string;
  st: number;
  rol: number;
  ts: number;
  h: string;
  e: E;
  agt: string;
}

export interface E {
  mod: string;
  h: string;
  val: string;
}
