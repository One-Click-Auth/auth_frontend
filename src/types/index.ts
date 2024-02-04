import { Organization } from '@/app/dashboard/orgDataStore';

export type ApiResponse = {
  is_ok: boolean;
  status: number;
  msg: string;
  detail?: string;
};

export type UserResponse = {
  is_pool: boolean;
  fa2: boolean;
  status: number;
  msg: string;
  detail?: string;
};

export type OrgKeys = {
  key: string;
  secret: string;
  id: string;
};

export type PartialOrg = Partial<Organization>;

export type $TsFixMe = any;
