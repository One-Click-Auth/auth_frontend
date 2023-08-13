import React from 'react';

const Samplelogs = [
  { time: '10:30', log: ' I am log' },
  { time: '10:30', log: ' I am an another log' }
];

const LogViewer = () => {
  return (
    <div className="bg-black rounded-xl p-4 text-white min-h-[800px]">
      {Samplelogs.map(log => (
        <Log log={log.log} time={log.time} key={log.time} />
      ))}
    </div>
  );
};

export default LogViewer;

const Log = ({
  log,
  time,
  ...props
}: {
  log: string;
  time: string;
  props?: any;
}) => {
  return (
    <p className="text-sm font-bold text-white/70">
      {time} - {log}
    </p>
  );
};
