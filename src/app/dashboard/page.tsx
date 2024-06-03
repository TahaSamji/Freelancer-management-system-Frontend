import * as React from 'react';
import type { Metadata } from 'next';

import { config } from '@/config';
import Main from '@/components/dashboard/overview/main';
export const metadata = { title: `Overview | Dashboard | ${config.site.name}` } satisfies Metadata;

export default function Page(): React.JSX.Element {
  return (
   <Main/>
  );
}
