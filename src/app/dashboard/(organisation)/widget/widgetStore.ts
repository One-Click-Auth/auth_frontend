import { StateCreator, create } from 'zustand';
import { Color, toColor } from 'react-color-palette';

type WidgetStore = BrandingSlice & CustomisationSlice;

interface BrandingSlice {
  displayName: string;
  greeting: string;
  logoImage: string;
  logo: File | undefined;
  button2Status: boolean;
  button3Status: boolean;
  color: Color;
  color2: Color;
  color3: Color;
  setDisplayName: (displayName: string) => void;
  setGreeting: (greeting: string) => void;
  setLogoImage: (logoImage: string) => void;
  setLogo: (logo: File | undefined) => void;
  setButton2Status: (button2Status: boolean) => void;
  setButton3Status: (button3Status: boolean) => void;
  setColor: (color: Color) => void;
  setColor2: (color: Color) => void;
  setColor3: (color: Color) => void;
  resetBranding: () => void;
}

const createBrandingSlice: StateCreator<
  WidgetStore,
  [],
  [],
  BrandingSlice
> = set => ({
  displayName: 'Flitchcoin',
  greeting: 'Continue to Log in to Flitchcoin',
  logoImage: '/flitchcoin-logo.svg',
  logo: undefined,
  button2Status: false,
  button3Status: false,
  color: toColor('hex', '#121212'),
  color2: toColor('hex', '#121212'),
  color3: toColor('hex', '#121212'),
  setDisplayName: (displayName: string) => set({ displayName }),
  setGreeting: (greeting: string) => set({ greeting }),
  setLogoImage: (logoImage: string) => set({ logoImage }),
  setLogo: (logo: File | undefined) => set({ logo }),
  setButton2Status: (button2Status: boolean) => set({ button2Status }),
  setButton3Status: (button3Status: boolean) => set({ button3Status }),
  setColor: (color: Color) => set({ color }),
  setColor2: (color2: Color) => set({ color2 }),
  setColor3: (color3: Color) => set({ color3 }),
  resetBranding: () =>
    set({
      displayName: 'Flitchcoin',
      greeting: 'Continue to Log in to Flitchcoin',
      logoImage: '/flitchcoin-logo.svg',
      logo: undefined,
      button2Status: false,
      button3Status: false,
      color: toColor('hex', '#121212'),
      color2: toColor('hex', '#121212'),
      color3: toColor('hex', '#121212')
    })
});

interface CustomisationSlice {
  inputBorderColor: Color;
  widgetBorderColor: Color;
  widgetColor: Color;
  widgetBgColor: Color;
  inputBoxRadius: string;
  widgetBoxRadius: string;
  widgetBorderWidth: string;
  setInputBorderColor: (inputBorderColor: Color) => void;
  setWidgetBorderColor: (widgetBorderColor: Color) => void;
  setWidgetColor: (widgetColor: Color) => void;
  setWidgetBgColor: (widgetBgColor: Color) => void;
  setInputBoxRadius: (inputBoxRadius: string) => void;
  setWidgetBoxRadius: (widgetBoxRadius: string) => void;
  setWidgetBorderWidth: (widgetBorderWidth: string) => void;
  resetCustomisation: () => void;
}

const createCustomisationSlice: StateCreator<
  WidgetStore,
  [],
  [],
  CustomisationSlice
> = set => ({
  inputBorderColor: toColor('hex', '#121212'),
  widgetBorderColor: toColor('hex', '#FFFFFF'),
  widgetColor: toColor('hex', '#FFFFFF'),
  widgetBgColor: toColor('hex', '#EEF5F1'),
  inputBoxRadius: '6',
  widgetBoxRadius: '8',
  widgetBorderWidth: '1',
  setInputBorderColor: (inputBorderColor: Color) => set({ inputBorderColor }),
  setWidgetBorderColor: (widgetBorderColor: Color) =>
    set({ widgetBorderColor }),
  setWidgetColor: (widgetColor: Color) => set({ widgetColor }),
  setWidgetBgColor: (widgetBgColor: Color) => set({ widgetBgColor }),
  setInputBoxRadius: (inputBoxRadius: string) => set({ inputBoxRadius }),
  setWidgetBoxRadius: (widgetBoxRadius: string) => set({ widgetBoxRadius }),
  setWidgetBorderWidth: (widgetBorderWidth: string) =>
    set({ widgetBorderWidth }),
  resetCustomisation: () =>
    set({
      inputBorderColor: toColor('hex', '#121212'),
      widgetBorderColor: toColor('hex', '#FFFFFF'),
      widgetColor: toColor('hex', '#FFFFFF'),
      widgetBgColor: toColor('hex', '#EEF5F1'),
      inputBoxRadius: '6',
      widgetBoxRadius: '8',
      widgetBorderWidth: '1'
    })
});

export const useWidgetStore = create<WidgetStore>()((...a) => ({
  ...createBrandingSlice(...a),
  ...createCustomisationSlice(...a)
}));
