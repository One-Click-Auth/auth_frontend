import { create, StateCreator } from 'zustand';

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
    radius: number;
    color: string;
    width: number;
  };
  button: {
    radius: number;
    bc: string;
    width: number;
  };
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
  social: object; // Update this type to match the actual structure of the "social" property
  tnc: unknown; // Update this type to match the actual structure of the "tnc" property
  pp: unknown; // Update this type to match the actual structure of the "pp" property
  redirect_url: string;
}
export type Social = {
  [name: string]: {
    CLIENT_ID?: string;
    CLIENT_SECRET?: string;
  };
};
export interface Data {
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
  social: Social; // Update this type to match the actual structure of the "social" property
  widget: Widget;
  callback_url: string;
}

export interface OrgData {
  org_token: string;
  data: Data;
  setOrgData: (orgToken: string, data: Data) => void;
}
//just a interface not used in widget, but in widget/profile
export interface UserProfileData {
  email: string;
  data: {
    partner: {
      [key: string]: {
        uid: string | null;
        img: string | null;
        m2m: any | null;
        secret_m: any | null;
        role: any | null;
        read_only: boolean;
        access: any | null;
        access_type: any | null;
        key_m: any | null;
        card_m: any | null;
        fa2: any | null;
        consent: any | null;
        booking: any | null;
        phone_fa2: any | null;
        forbidden: boolean;
        full_name: string;
        password: boolean;
        reg_date_utc: number;
        social: any;
        others: any | null;
        act: any | null;
      };
    };
  };
  fa2: boolean;
  email_verified: boolean;
  ip: string;
  otp: boolean | null;
  host: string;
  scope: number;
  pass_trial: number;
  otp_trial: number;
  exp: number;
  time_limit: number;
  alt_id: string;
  org_id: string;
  validity: string;
  api_key: string;
  api_secret: string;
  reset_password: boolean;
  new_password: boolean | null;
  reset_totp: boolean;
  mfa_action: boolean | null;
  breach_pass_det: boolean;
  strict_mfa: boolean;
  rtm: boolean;
  callbacks: boolean;
  passwordless: boolean;
  custom_email: boolean;
  DDoS: boolean;
  brute_force: boolean;
  email_val: boolean;
  social_sign: boolean;
  SSO: any;
  widget: {
    name: string;
    logo_url: string;
    social: any;
    redirect_url: string;
  };
  callback_url: string;
}

interface ProfileData_strore {
  data: UserProfileData;
  setProfileData: (data: UserProfileData) => void;
}

const sampleProfileData: UserProfileData = {
  email: '',
  data: {
    partner: {
      '': {
        uid: '',
        img: 'https://openauthx.s3.ap-south-1.amazonaws.com/Group+39554+(1).svg',
        m2m: null,
        secret_m: null,
        role: null,
        read_only: false,
        access: null,
        access_type: null,
        key_m: null,
        card_m: null,
        fa2: null,
        consent: null,
        booking: null,
        phone_fa2: null,
        forbidden: false,
        full_name: '',
        password: true,
        reg_date_utc: 0,
        social: {},
        others: null,
        act: null
      }
    }
  },
  fa2: false,
  email_verified: false,
  ip: '',
  otp: null,
  host: '',
  scope: 0,
  pass_trial: 0,
  otp_trial: 0,
  exp: 0,
  time_limit: 0,
  alt_id: '',
  org_id: '',
  validity: '',
  api_key: '',
  api_secret: '',
  reset_password: false,
  new_password: null,
  reset_totp: false,
  mfa_action: null,
  breach_pass_det: false,
  strict_mfa: false,
  rtm: false,
  callbacks: false,
  passwordless: false,
  custom_email: false,
  DDoS: false,
  brute_force: false,
  email_val: false,
  social_sign: false,
  SSO: {},
  widget: {
    name: '',
    logo_url:
      'https://openauthx.s3.ap-south-1.amazonaws.com/78f9802728f3132332091655a4498552_79-2.gif',
    social: {},
    redirect_url: ''
  },
  callback_url: ''
};
// to be used in the widget/profile
export const useUserProfileData = create<ProfileData_strore>(set => ({
  data: sampleProfileData,
  setProfileData: (data: UserProfileData) =>
    set(state => ({
      data: { ...data }
    }))
}));

interface ProfileSlice {
  email: string;
  setEmail: (email: string) => void;
  username: string;
  setUsername: (username: string) => void;
  image: string | null;
  setImage: (image: string | null) => void;
}
interface SecuritySlice {
  mfa: boolean | null;
  setMfa: (mfa: boolean | null) => void;
  password: boolean;
  setPassword: (password: boolean) => void;
}

type ProfileState = {
  username: string;
  image: string | null;
  email: string;
};

const initialProfileState: ProfileState = {
  username: 'None',
  email: 'anyone@gmail.com',
  image: 'https://openauthx.s3.ap-south-1.amazonaws.com/Group+39554+(1).svg'
};
type SecurityState = {
  mfa: boolean | null;
  password: boolean;
};
const initialSecurityState: SecurityState = {
  mfa: false,
  password: false
};
export const profileStateCreator: StateCreator<ProfileSlice> = set => ({
  ...initialProfileState,
  setEmail: email => set(state => ({ ...state, email })),
  setUsername: username => set(state => ({ ...state, username })),
  setImage: image => set(state => ({ ...state, image }))
});

export const securityStateCreator: StateCreator<SecuritySlice> = set => ({
  ...initialSecurityState,
  setMfa: (mfa: boolean | null) => set(state => ({ ...state, mfa })),
  setPassword: password => set(state => ({ ...state, password }))
});

export const useProfileStore = create(profileStateCreator);
export const useSecurityStore = create(securityStateCreator);

type UseToken = {
  user_token: string;
  set_user_token: (token: string) => void;
};

export const useToken = create<UseToken>(set => ({
  user_token: '',
  set_user_token: (token: string) => set(() => ({ user_token: token }))
}));

const socialDefaults: Social = {
  github: {
    CLIENT_ID: '',
    CLIENT_SECRET: ''
  },
  google: {
    CLIENT_ID: '',
    CLIENT_SECRET: ''
  },
  discord: {
    CLIENT_ID: '',
    CLIENT_SECRET: ''
  },
  microsoft: {
    CLIENT_ID: '',
    CLIENT_SECRET: ''
  },
  facebook: {
    CLIENT_ID: '',
    CLIENT_SECRET: ''
  },
  figma: {
    CLIENT_ID: '',
    CLIENT_SECRET: ''
  },
  tiktok: {
    CLIENT_ID: '',
    CLIENT_SECRET: ''
  },
  linkedin: {
    CLIENT_ID: '',
    CLIENT_SECRET: ''
  },
  twitter: {
    CLIENT_ID: '',
    CLIENT_SECRET: ''
  },
  whatsapp: {
    CLIENT_ID: '',
    CLIENT_SECRET: ''
  },
  apple: {
    CLIENT_ID: '',
    CLIENT_SECRET: ''
  }
};

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
    social: socialDefaults,
    widget: {
      name: 'Org',
      logo_url: '',
      font: '',
      greeting: '',
      input_border: {
        radius: 0,
        color: ''
      },
      widget_border: {
        radius: 0,
        color: '',
        width: 0
      },
      button: {
        radius: 0,
        bc: '',
        width: 0
      },
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
