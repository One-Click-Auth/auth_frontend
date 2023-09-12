import { create } from 'zustand';

export interface Organization {
  alt_id: string;
  org_id: string;
  act_cnt: number;
  active_user: number;
  current_cost: number;
  recur_cost: number;
  email_cnt: number;
  validity: number;
  api_key: string;
  api_secret: string;
  name: string;
  subs_id: string;
  host: null | string;
  state: boolean;
  breach_pass_det: boolean;
  m2m: boolean;
  secret_m: boolean;
  strict_mfa: boolean;
  key_m: boolean;
  card_m: boolean;
  fa2: boolean;
  rtm?: boolean;
  ipat?: boolean;
  consent: boolean;
  booking: boolean;
  ref: boolean;
  phone_fa2: boolean;
  phone_passwordless: boolean;
  callbacks: boolean;
  passwordless: boolean;
  custom_email: boolean;
  DDoS: boolean;
  bot_det: boolean;
  brute_force: boolean;
  email_val: boolean;
  social_sign: boolean;
  SSO: Record<string, unknown>;
  social: Record<string, unknown>;
  email_provider: EmailProvider;
  email_temp: Record<string, unknown>;
  brute_force_cnt: number;
  breach_pass_det_cnt: number;
  m2m_cnt: number;
  secret_m_cnt: number;
  key_m_cnt: number;
  card_m_cnt: number;
  fa2_cnt: number;
  consent_cnt: number;
  booking_cnt: number;
  ref_cnt: number;
  phone_fa2_cnt: number;
  callbacks_cnt: number;
  allowed_iam: number;
  iam: Iam;
  widget: Widget;
  callback_url: string;
  past_month_api_calls: PastMonthApiCalls;
}
export interface PastMonthApiCalls {
  [key: string]: number;
}
interface EmailProvider {
  smtp: Record<string, unknown>;
  ses: Record<string, unknown>;
  mandrill: Record<string, unknown>;
  azure_comm: Record<string, unknown>;
  ms365: Record<string, unknown>;
  sendgrid: Record<string, unknown>;
  sparkPost: Record<string, unknown>;
  mailgun: Record<string, unknown>;
}

interface Iam {
  read: string[];
  put: string[];
  select: string[];
  delete: string[];
  manager: string[];
  all: string[];
}

interface Widget {
  name: string;
  logo_url: string;
  font: string;
  greeting: string;
  input_border: Border;
  widget_border: Border;
  color0: string;
  color1: string;
  color2: string;
  color3: string;
  color4: string;
  color5: string;
  color6: string;
  color7: string;
  color8: string;
  color9: string;
  color10: string;
  color11: string;
  color12: string;
  social: Record<string, unknown>;
  tnc: null | string;
  pp: null | string;
  redirect_url: string;
}

interface Border {
  radius: number;
  color: string;
}

interface OrgDataState {
  data: Organization[];
  manageOrg: string;
  manageOrgData: Organization;
  addData: (data: Organization[]) => void;
  setManageOrg: (manageOrg: string) => void;
  setManageOrgData: (manageOrg: Organization | undefined) => void;
}
export const defaultEmailProvider: EmailProvider = {
  smtp: {},
  ses: {},
  mandrill: {},
  azure_comm: {},
  ms365: {},
  sendgrid: {},
  sparkPost: {},
  mailgun: {}
};

export const defaultIam: Iam = {
  read: [],
  put: [],
  select: [],
  delete: [],
  manager: [],
  all: []
};

export const defaultWidget: Widget = {
  name: '',
  logo_url: '',
  font: '',
  greeting: '',
  input_border: { radius: 0, color: '' },
  widget_border: { radius: 0, color: '' },
  color0: '',
  color1: '',
  color2: '',
  color3: '',
  color4: '',
  color5: '',
  color6: '',
  color7: '',
  color8: '',
  color9: '',
  color10: '',
  color11: '',
  color12: '',
  social: {},
  tnc: null,
  pp: null,
  redirect_url: ''
};

export const defaultOrganization: Organization = {
  alt_id: '',
  org_id: '',
  act_cnt: 0,
  active_user: 0,
  current_cost: 0,
  recur_cost: 0,
  email_cnt: 0,
  validity: 0,
  api_key: '',
  api_secret: '',
  name: '',
  subs_id: '',
  host: null,
  state: false,
  breach_pass_det: false,
  m2m: false,
  secret_m: false,
  strict_mfa: false,
  key_m: false,
  card_m: false,
  fa2: false,
  consent: false,
  booking: false,
  ref: false,
  phone_fa2: false,
  phone_passwordless: false,
  callbacks: false,
  passwordless: false,
  custom_email: false,
  DDoS: false,
  bot_det: false,
  brute_force: false,
  email_val: false,
  social_sign: false,
  SSO: {},
  social: {},
  email_provider: defaultEmailProvider,
  email_temp: {},
  brute_force_cnt: 0,
  breach_pass_det_cnt: 0,
  m2m_cnt: 0,
  secret_m_cnt: 0,
  key_m_cnt: 0,
  card_m_cnt: 0,
  fa2_cnt: 0,
  consent_cnt: 0,
  booking_cnt: 0,
  ref_cnt: 0,
  phone_fa2_cnt: 0,
  callbacks_cnt: 0,
  allowed_iam: 0,
  iam: defaultIam,
  widget: defaultWidget,
  callback_url: '',
  past_month_api_calls: {}
};

// export const defaultOrgDataState: OrgDataState = {
//   data: [],
//   manageOrg: '',
//   manageOrgData:  { ...defaultOrganization },
//   addData: (data) => {},
//   setManageOrg: (manageOrg) => {},
//   setManageOrgData: (manageOrgData) => {},
// };

const useOrgData = create<OrgDataState>(set => ({
  data: [],
  manageOrg: '',
  manageOrgData: { ...defaultOrganization },
  addData: newData => {
    set(state => ({ data: [...newData] }));
  },
  setManageOrg: manageOrg => set({ manageOrg }),
  setManageOrgData: manageOrgData => set({ manageOrgData })
}));

export default useOrgData;
