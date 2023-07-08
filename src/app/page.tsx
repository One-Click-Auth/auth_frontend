import { JSX } from 'react';
import Login from './Login';
export default function AppPage(props: {
  searchParams: Record<string, string>;
}) {
  return <Login {...props} />;
}
