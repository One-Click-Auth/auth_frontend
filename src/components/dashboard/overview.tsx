'use client';

import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts';
import useOrgData, { Organization } from '../../app/dashboard/orgDataStore';

const data = [
  {
    month: 'Jan',
    calls: Math.floor(Math.random() * 100000) + 100000
  },
  {
    month: 'Feb',
    calls: Math.floor(Math.random() * 100000) + 100000
  },
  {
    month: 'Mar',
    calls: Math.floor(Math.random() * 100000) + 100000
  },
  {
    month: 'Apr',
    calls: Math.floor(Math.random() * 100000) + 100000
  },
  {
    month: 'May',
    calls: Math.floor(Math.random() * 100000) + 100000
  },
  {
    month: 'Jun',
    calls: Math.floor(Math.random() * 100000) + 100000
  },
  {
    month: 'Jul',
    calls: Math.floor(Math.random() * 100000) + 100000
  },
  {
    month: 'Aug',
    calls: Math.floor(Math.random() * 100000) + 100000
  },
  {
    month: 'Sep',
    calls: Math.floor(Math.random() * 100000) + 100000
  },
  {
    month: 'Oct',
    calls: Math.floor(Math.random() * 100000) + 100000
  },
  {
    month: 'Nov',
    calls: Math.floor(Math.random() * 100000) + 100000
  },
  {
    month: 'Dec',
    calls: Math.floor(Math.random() * 100000) + 100000
  }
];

export function Overview() {
  const formatTick = (value: any) => {
    const date = new Date(value);
    const month = date.toLocaleString('default', { month: 'short' });
    const year = date.getFullYear();
    return `${month} ${year}`;
  };
  const orgData = useOrgData(state => state.manageOrgData);
  const result = Object.entries(orgData.past_month_api_calls)
    .map(([month, calls]) => ({ month, calls }))
    .splice(0, 12);
  console.log(result);
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={result}>
        <XAxis
          dataKey="month"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          interval={0}
          tickFormatter={formatTick}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={value => `${value}`}
        />
        <Tooltip
          contentStyle={{
            background: 'grey',
            opacity: '0.9',
            backdropFilter: 'blur(10px)',
            borderRadius: '4px',
            color: 'black'
          }}
          animationDuration={200}
        />
        <Bar
          dataKey="calls"
          fill="#adfa1d"
          radius={[4, 4, 0, 0]}
          className="hover:none"
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
