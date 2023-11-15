import { useEffect } from 'react';
import { useWidgetStore } from '../widgetStore';
import { WidgetInput } from './widget-input';

export function EmailSettings() {
  const {
    smtpProvider,
    smtpPort,
    userOrEmail,
    password,
    setSmtpPort,
    setSmtpProvider,
    setUserOrEmail,
    setPassword
  } = useWidgetStore();

  return (
    <div className="flex flex-col space-y-10">
      <WidgetInput
        heading="SMTP Provider"
        placeholder="smtppro.zoho.in"
        changeHandler={setSmtpProvider}
        value={smtpProvider}
        type="text"
      />
      <WidgetInput
        heading="SMTP Port"
        placeholder="465"
        changeHandler={setSmtpPort}
        value={smtpPort}
      />
      <WidgetInput
        heading="Username or email id"
        placeholder="login@trustauthx.com"
        changeHandler={setUserOrEmail}
        value={userOrEmail}
        type="email"
      />
      <WidgetInput
        heading="Password"
        placeholder="******************"
        changeHandler={setPassword}
        value={password}
        type="password"
      />
    </div>
  );
}
