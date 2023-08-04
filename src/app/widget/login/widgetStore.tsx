import { create } from 'zustand';

interface Widget {
  name: string;
  logo_url: string;
  font: string;
  greeting: string;
  input_border: {
    radius: number;
    color: string;
  };
  widget_border: {
    style: number;
    radius: number;
    color: string;
  };
  color0: string;
  color1: string;
  color2: string;
  color3: string;
  color4: string;
  color5: string;
  color6: string;
  social: object; // Update this type to match the actual structure of the "social" property
  tnc: unknown; // Update this type to match the actual structure of the "tnc" property
  pp: unknown; // Update this type to match the actual structure of the "pp" property
  redirect_url: string;
}

interface Data {
  breach_pass_det: boolean;
  m2m: boolean;
  secret_m: boolean;
  key_m: boolean;
  card_m: boolean;
  fa2: boolean;
  strict_mfa: boolean;
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
  SSO: unknown[]; // Update this type to match the actual structure of the "SSO" property
  social: unknown; // Update this type to match the actual structure of the "social" property
  widget: Widget;
  callback_url: string;
}

interface OrgData {
  org_token: string;
  data: Data;
  setOrgData: (orgToken: string, data: Data) => void;
}

export const useOrgData = create<OrgData>(set => ({
  org_token: '',
  data: {
    breach_pass_det: false,
    m2m: false,
    secret_m: false,
    key_m: false,
    card_m: false,
    fa2: false,
    strict_mfa: false,
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
    SSO: [],
    social: {},
    widget: {
      name: '',
      logo_url: '',
      font: '',
      greeting: '',
      input_border: {
        radius: 0,
        color: ''
      },
      widget_border: {
        style: 0,
        radius: 0,
        color: ''
      },
      color0: '',
      color1: '',
      color2: '',
      color3: '',
      color4: '',
      color5: '',
      color6: '',
      social: {},
      tnc: null,
      pp: null,
      redirect_url: ''
    },
    callback_url: ''
  },
  setOrgData: (orgToken, data) =>
    set(() => ({
      org_token: orgToken,
      data: { ...data }
    }))
}));

interface userdata {
  consent: null | boolean;
  email: string;
  fa2: null | boolean;
  forbidden: boolean;
  full_name: string;
  img: null | undefined;
  is_email_verified: boolean;
  is_password_set: null | boolean;
  multi: boolean;
  passwordless: boolean;
  reg_date_utc: number;
}
interface userData {
  data: userdata;
  setUserData: (data: userdata) => void;
}

export const useUserData = create<userData>(set => ({
  data: {
    consent: null,
    email: '',
    fa2: null,
    forbidden: false,
    full_name: '',
    img: null,
    is_email_verified: false,
    is_password_set: null,
    multi: false,
    passwordless: false,
    reg_date_utc: 0
  },
  setUserData: data =>
    set(() => ({
      data: { ...data }
    }))
}));
