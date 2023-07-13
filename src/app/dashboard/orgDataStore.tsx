import { create } from 'zustand';

interface Organization {
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
  host: null | string;
  state: boolean;
  breach_pass_det: boolean;
  m2m: boolean;
  secret_m: boolean;
  strict_mfa: boolean;
  key_m: boolean;
  card_m: boolean;
  fa2: boolean;
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
  past_month_api_calls: Record<string, number>;
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
  manageOrgData: object;
  addData: (data: Organization[]) => void;
  setManageOrg: (manageOrg: string) => void;
  setManageOrgData: (manageOrg: object) => void;
}

const useOrgData = create<OrgDataState>(set => ({
  data: [],
  manageOrg: '',
  manageOrgData: {},
  addData: data => {
    set(state => ({ data: [...data] }));
  },
  setManageOrg: manageOrg => {
    set(state => ({ manageOrg: manageOrg }));
  },
  setManageOrgData: manageOrgData => {
    set(state => ({ manageOrgData: manageOrgData }));
  }
}));

export default useOrgData;
