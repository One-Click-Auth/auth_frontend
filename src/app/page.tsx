import { JSX } from 'react';
import Login from './Login';
export default function AppPage(
  props: JSX.IntrinsicAttributes & { searchParams: any }
) {
  return <Login {...props} />;
}
