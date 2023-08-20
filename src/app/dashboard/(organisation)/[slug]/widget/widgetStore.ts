import { StateCreator, create } from 'zustand';
import { Color, toColor } from 'react-color-palette';
import '@total-typescript/ts-reset';

type WidgetStore = BrandingSlice &
  CustomisationSlice &
  ConsentAndDevSettingsSlice &
  EmailSettingSlice;

export type Social = {
  [key: string]: boolean;
};

export type OrgObject = {
  name: string;
  host: string;
  widget: {
    name: string;
    logo_url: string;
    font: string;
    greeting: string;
    input_border: {
      radius: string;
      color: string;
    };
    widget_border: {
      radius: string;
      color: string;
      width: string;
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
    // color12:string;
    social: Social;
  };
  callback_url?: string;
  redirect_url?: string;
  tnc_url?: string;
  pp_url?: string;
};

const socialDefaults: Social = {
  github: false,
  microsoft: false,
  google: false,
  apple: false,
  whatsapp: false,
  tiktok: false,
  facebook: false,
  linkedin: false,
  twitter: false
};

interface BrandingSlice {
  displayName: string;
  greeting: string;
  logoImage: string;
  logo: File | undefined;
  button2Status: boolean;
  button3Status: boolean;
  color: Color;
  color1: Color;
  color2: Color;
  color9: Color;
  setDisplayName: (displayName: string) => void;
  setGreeting: (greeting: string) => void;
  setLogoImage: (logoImage: string) => void;
  setLogo: (logo: File | undefined) => void;
  setButton2Status: (button2Status: boolean) => void;
  setButton3Status: (button3Status: boolean) => void;
  setColor: (color: Color) => void;
  setColor1: (color: Color) => void;
  setColor2: (color: Color) => void;
  setColor9: (color: Color) => void;
  resetBranding: () => void;
}

type BrandingState = {
  displayName: string;
  greeting: string;
  logoImage: string;
  logo: undefined;
  button2Status: boolean;
  button3Status: boolean;
  color: Color;
  color1: Color;
  color2: Color;
  color9: Color;
};

let initialBrandingState: BrandingState = {
  displayName: 'Flitchcoin',
  greeting: 'Continue to Log in to Flitchcoin',
  logoImage: '/flitchcoin-logo.svg',
  logo: undefined,
  button2Status: false,
  button3Status: false,
  color: toColor('hex', '#121212'),
  color1: toColor('hex', '#121212'),
  color2: toColor('hex', '#121212'),
  color9: toColor('hex', '#FFFFFF')
};

const createBrandingSlice: StateCreator<
  WidgetStore,
  [],
  [],
  BrandingSlice
> = set => ({
  ...initialBrandingState,
  setDisplayName: (displayName: string) => set({ displayName }),
  setGreeting: (greeting: string) => set({ greeting }),
  setLogoImage: (logoImage: string) => set({ logoImage }),
  setLogo: (logo: File | undefined) => set({ logo }),
  setButton2Status: (button2Status: boolean) => set({ button2Status }),
  setButton3Status: (button3Status: boolean) => set({ button3Status }),
  setColor: (color: Color) => set({ color }),
  setColor1: (color1: Color) => set({ color1 }),
  setColor2: (color2: Color) => set({ color2 }),
  setColor9: (color9: Color) => set({ color9 }),
  resetBranding: () => set(initialBrandingState)
});

interface CustomisationSlice {
  inputBorderColor: Color;
  widgetBorderColor: Color;
  widgetColor: Color;
  widgetColor2: Color;
  widget2Status: boolean;
  widgetBgColor: Color;
  widgetBgColor2: Color;
  widgetBgColor3: Color;
  widgetBg2Status: boolean;
  widgetBg3Status: boolean;
  shadowColor: Color;
  inputBoxRadius: string;
  widgetBoxRadius: string;
  widgetBorderWidth: string;
  nameFontColor: Color;
  greetingFontColor: Color;
  setInputBorderColor: (inputBorderColor: Color) => void;
  setWidgetBorderColor: (widgetBorderColor: Color) => void;
  setWidgetColor: (widgetColor: Color) => void;
  setWidgetColor2: (widgetColor2: Color) => void;
  setWidget2Status: (widget2Status: boolean) => void;
  setWidgetBgColor: (widgetBgColor: Color) => void;
  setWidgetBgColor2: (widgetBgColor2: Color) => void;
  setWidgetBgColor3: (widgetBgColor3: Color) => void;
  setWidgetBg2Status: (widgetBg2Status: boolean) => void;
  setWidgetBg3Status: (widgetBg3Status: boolean) => void;
  setShadowColor: (shadowColor: Color) => void;
  setInputBoxRadius: (inputBoxRadius: string) => void;
  setWidgetBoxRadius: (widgetBoxRadius: string) => void;
  setWidgetBorderWidth: (widgetBorderWidth: string) => void;
  setNameFontColor: (nameFontColor: Color) => void;
  setGreetingFontColor: (greetingFontColor: Color) => void;
  resetCustomisation: () => void;
}

type CustomisationState = {
  inputBorderColor: Color;
  widgetBorderColor: Color;
  nameFontColor: Color;
  greetingFontColor: Color;
  widgetColor: Color;
  widgetColor2: Color;
  widget2Status: boolean;
  widgetBgColor: Color;
  widgetBgColor2: Color;
  widgetBgColor3: Color;
  widgetBg2Status: boolean;
  widgetBg3Status: boolean;
  shadowColor: Color;
  inputBoxRadius: string;
  widgetBoxRadius: string;
  widgetBorderWidth: string;
};

let initialCustomisationState: CustomisationState = {
  inputBorderColor: toColor('hex', '#121212'),
  widgetBorderColor: toColor('hex', '#FFFFFF'),
  widgetColor: toColor('hex', '#FFFFFF'),
  widgetColor2: toColor('hex', '#FFFFFF'),
  widget2Status: false,
  widgetBgColor: toColor('hex', '#EEF5F1'),
  widgetBgColor2: toColor('hex', '#EEF5F1'),
  widgetBgColor3: toColor('hex', '#EEF5F1'),
  widgetBg2Status: false,
  widgetBg3Status: false,
  shadowColor: toColor('hex', '#121212'),
  inputBoxRadius: '6',
  widgetBoxRadius: '8',
  widgetBorderWidth: '1',
  nameFontColor: toColor('hex', '#121212'),
  greetingFontColor: toColor('hex', '#121212')
};

const createCustomisationSlice: StateCreator<
  WidgetStore,
  [],
  [],
  CustomisationSlice
> = set => ({
  ...initialCustomisationState,
  setInputBorderColor: (inputBorderColor: Color) => set({ inputBorderColor }),
  setWidgetBorderColor: (widgetBorderColor: Color) =>
    set({ widgetBorderColor }),
  setWidgetColor: (widgetColor: Color) => set({ widgetColor }),
  setWidgetColor2: (widgetColor2: Color) => set({ widgetColor2 }),
  setWidget2Status: (widget2Status: boolean) => set({ widget2Status }),

  setWidgetBgColor: (widgetBgColor: Color) => set({ widgetBgColor }),
  setWidgetBgColor2: (widgetBgColor2: Color) => set({ widgetBgColor2 }),
  setWidgetBgColor3: (widgetBgColor3: Color) => set({ widgetBgColor3 }),
  setWidgetBg2Status: (widgetBg2Status: boolean) => set({ widgetBg2Status }),
  setWidgetBg3Status: (widgetBg3Status: boolean) => set({ widgetBg3Status }),
  setShadowColor: (shadowColor: Color) => set({ shadowColor }),
  setInputBoxRadius: (inputBoxRadius: string) => set({ inputBoxRadius }),
  setWidgetBoxRadius: (widgetBoxRadius: string) => set({ widgetBoxRadius }),
  setWidgetBorderWidth: (widgetBorderWidth: string) =>
    set({ widgetBorderWidth }),
  setNameFontColor: (nameFontColor: Color) => set({ nameFontColor }),
  setGreetingFontColor: (greetingFontColor: Color) =>
    set({ greetingFontColor }),
  resetCustomisation: () => set(initialCustomisationState)
});

interface ConsentAndDevSettingsSlice {
  tncURL: string;
  ppURL: string;
  hostURL: string;
  callbackURL: string;
  redirectURL: string;
  social: Social;
  setTncURL: (tncURL: string) => void;
  setPpURL: (ppURL: string) => void;
  setHostURL: (hostURL: string) => void;
  setCallbackURL: (callbackURL: string) => void;
  setRedirectURL: (redirectURL: string) => void;
  setSocial: (newSocial: { [x: string]: boolean }) => void;
  resetConsent: () => void;
  resetDevSettings: () => void;
}

type ConsentState = {
  tncURL: string;
  ppURL: string;
};

let initialConsentState: ConsentState = {
  tncURL: '',
  ppURL: ''
};

type DevSettingState = {
  hostURL: string;
  callbackURL: string;
  redirectURL: string;
  social: Social;
};

let initialDevSettingState: DevSettingState = {
  hostURL: '',
  callbackURL: '',
  redirectURL: '',
  social: socialDefaults
};

const createConsentAndDevSettingsSlice: StateCreator<
  WidgetStore,
  [],
  [],
  ConsentAndDevSettingsSlice
> = set => ({
  ...initialConsentState,
  ...initialDevSettingState,
  setTncURL: (tncURL: string) => set({ tncURL }),
  setPpURL: (ppURL: string) => set({ ppURL }),
  setHostURL: (hostURL: string) => set({ hostURL }),
  setCallbackURL: (callbackURL: string) => set({ callbackURL }),
  setRedirectURL: (redirectURL: string) => set({ redirectURL }),
  setSocial: (newSocial: { [x: string]: boolean }) =>
    set(state => ({
      social: {
        ...state.social,
        ...newSocial
      }
    })),
  resetConsent: () => set(initialConsentState),
  resetDevSettings: () => set(initialDevSettingState)
});

interface EmailSettingSlice {
  smtpProvider: string;
  smtpPort: string;
  userOrEmail: string;
  password: string;
  setSmtpProvider: (smtpProvider: string) => void;
  setSmtpPort: (smtpPort: string) => void;
  setUserOrEmail: (userOrEmail: string) => void;
  setPassword: (password: string) => void;
}

let initialEmailSettingState = {
  smtpProvider: '',
  smtpPort: '',
  userOrEmail: '',
  password: ''
};

const createEmailSettingSlice: StateCreator<
  WidgetStore,
  [],
  [],
  EmailSettingSlice
> = set => ({
  ...initialEmailSettingState,
  setSmtpProvider: (smtpProvider: string) => set({ smtpProvider }),
  setSmtpPort: (smtpPort: string) => set({ smtpPort }),
  setUserOrEmail: (userOrEmail: string) => set({ userOrEmail }),
  setPassword: (password: string) => set({ password })
});

export const useWidgetStore = create<WidgetStore>()((...a) => ({
  ...createBrandingSlice(...a),
  ...createCustomisationSlice(...a),
  ...createConsentAndDevSettingsSlice(...a),
  ...createEmailSettingSlice(...a)
}));

// Fetch backend for organisation settings
// TODO: Implement fetch with React Query
export const updateStoreWithFetch = async (token: string, ORG_ID: string) => {
  try {
    const res = await fetch(`https://api.trustauthx.com/org/${ORG_ID}`, {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${token}`
      }
    });
    const data = (await res.json()) as OrgObject;
    useWidgetStore.setState(() => ({
      displayName: data.widget.name,
      greeting: data.widget.greeting,
      logoImage: data.widget.logo_url,
      logo: undefined,
      button2Status:
        data.widget.color1 === data.widget.color0 ||
        data.widget.color1 === data.widget.color2
          ? false
          : true,
      button3Status:
        data.widget.color2 === data.widget.color0 ||
        data.widget.color2 === data.widget.color1
          ? false
          : true,
      widget2Status: data.widget.color7 === data.widget.color6 ? false : true,
      // button2Status: data.widget.color1 === '#121212' ? false : true,
      // button3Status: data.widget.color1 === '#121212' ? false : true,
      widgetBg2Status:
        data.widget.color4 === data.widget.color3 ||
        data.widget.color4 === data.widget.color5
          ? false
          : true,
      widgetBg3Status:
        data.widget.color5 === data.widget.color3 ||
        data.widget.color5 === data.widget.color4
          ? false
          : true,
      color: toColor('hex', data.widget.color0),
      color1: toColor('hex', data.widget.color1),
      color2: toColor('hex', data.widget.color2),
      color9: toColor('hex', data.widget.color9),
      inputBorderColor: toColor('hex', data.widget.input_border.color),
      widgetBorderColor: toColor('hex', data.widget.widget_border.color),
      widgetColor: toColor('hex', data.widget.color6),
      widgetColor2: toColor('hex', data.widget.color7),
      widgetBgColor: toColor('hex', data.widget.color3),
      widgetBgColor2: toColor('hex', data.widget.color4),
      widgetBgColor3: toColor('hex', data.widget.color5),
      shadowColor: toColor('hex', data.widget.color8),
      inputBoxRadius: data.widget.input_border.radius,
      widgetBoxRadius: data.widget.widget_border.radius,
      widgetBorderWidth: data.widget.widget_border.width,
      nameFontColor: toColor('hex', data.widget.color10),
      greetingFontColor: toColor('hex', data.widget.color11),
      tncURL: data.tnc_url ?? '',
      ppURL: data.pp_url ?? '',
      hostURL: data.host ?? '',
      callbackURL: data.callback_url ?? '',
      redirectURL: data.redirect_url ?? ''
    }));

    setInitialState(data);
  } catch (error) {
    console.log(error);
    return { error };
  }
};

const setInitialState = (data: OrgObject) => {
  // Set initial states
  initialBrandingState = {
    displayName: data.widget.name,
    greeting: data.widget.greeting,
    logoImage: data.widget.logo_url,
    logo: undefined,
    button2Status:
      data.widget.color1 === data.widget.color0 ||
      data.widget.color1 === data.widget.color2
        ? false
        : true,
    button3Status:
      data.widget.color2 === data.widget.color0 ||
      data.widget.color2 === data.widget.color1
        ? false
        : true,
    // button2Status: data.widget.color1 === '#121212' ? false : true,
    // button3Status: data.widget.color1 === '#121212' ? false : true,
    color: toColor('hex', data.widget.color0),
    color1: toColor('hex', data.widget.color1),
    color2: toColor('hex', data.widget.color2),
    color9: toColor('hex', data.widget.color9)
  };

  initialCustomisationState = {
    inputBorderColor: toColor('hex', data.widget.input_border.color),
    widgetBorderColor: toColor('hex', data.widget.widget_border.color),
    widgetColor: toColor('hex', data.widget.color6),
    widgetColor2: toColor('hex', data.widget.color7),
    widget2Status: data.widget.color7 === data.widget.color6 ? false : true,
    widgetBgColor: toColor('hex', data.widget.color3),
    widgetBgColor2: toColor('hex', data.widget.color4),
    widgetBgColor3: toColor('hex', data.widget.color5),
    widgetBg2Status:
      data.widget.color4 === data.widget.color3 ||
      data.widget.color4 === data.widget.color5
        ? false
        : true,
    widgetBg3Status:
      data.widget.color5 === data.widget.color3 ||
      data.widget.color5 === data.widget.color4
        ? false
        : true,
    shadowColor: toColor('hex', data.widget.color8),
    nameFontColor: toColor('hex', data.widget.color10),
    greetingFontColor: toColor('hex', data.widget.color11),
    inputBoxRadius: data.widget.input_border.radius,
    widgetBoxRadius: data.widget.widget_border.radius,
    widgetBorderWidth: data.widget.widget_border.width
  };

  initialConsentState = {
    tncURL: data.tnc_url ?? '',
    ppURL: data.pp_url ?? ''
  };

  initialDevSettingState = {
    hostURL: data.host ?? '',
    callbackURL: data.callback_url ?? '',
    redirectURL: data.redirect_url ?? '',
    social: socialDefaults ?? {}
  };

  initialEmailSettingState = {
    smtpProvider: '',
    smtpPort: '',
    userOrEmail: '',
    password: ''
  };
};
