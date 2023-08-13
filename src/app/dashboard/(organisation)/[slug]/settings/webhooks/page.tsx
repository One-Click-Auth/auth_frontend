import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import * as React from 'react';
import WebhookForm from '../components/webhookForm';
import ShowWebhookUrl from '../components/showWebhookUrl';
import LogViewer from '../components/logViewer';
const OrganisationDashboard = () => {
  return (
    <div className="grid gap-11">
      <Container>
        <div className="flex items-center justify-start w-full text-xl font-normal gap-2 text-slate-500">
          <GreenTick />
          <span>Updated at May 4, 2022</span>
        </div>
        <h1 className="text-3xl font-bold">Monitoring & Webhooks</h1>
      </Container>
      <Container>
        <Label>*Set your webhook URL</Label>
        <WebhookForm />
      </Container>
      <Container>
        <h3 className="text-sm font-normal text-slate-400">
          Existing Webhook URL
        </h3>
        <hr />
        <ShowWebhookUrl />
        <hr />
      </Container>
      <Container>
        <div className=" flex bg-slate-200 gap-4  items-center rounded-md">
          <Button variant={'outline'} className="px-10 border border-black">
            Logs
          </Button>
          <p className="text-sm font-normal text-slate-400">
            *Note Logs presented here are not real-time.
          </p>
        </div>
        <LogViewer />
      </Container>
    </div>
  );
};

const GreenTick = () => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M12.0649 21.7292C17.4381 21.7292 21.7939 17.3734 21.7939 12.0002C21.7939 6.62705 17.4381 2.27124 12.0649 2.27124C6.69174 2.27124 2.33594 6.62705 2.33594 12.0002C2.33594 17.3734 6.69174 21.7292 12.0649 21.7292ZM11.9191 15.7443L17.7564 9.90695L16.1054 8.25589L11.0935 13.2677L8.02747 10.2017L6.37641 11.8527L10.268 15.7443L11.0935 16.5699L11.9191 15.7443Z"
        fill="#1AB76C"
      />
    </svg>
  );
};

const Container = ({ children }: { children: React.ReactNode }) => {
  return <div className="flex flex-col gap-2">{children}</div>;
};

export default OrganisationDashboard;
