import * as React from 'react';
import type { Metadata } from 'next';
import { config } from '@/config';
import { Main } from '@/components/dashboard/customer/main';

// export const metadata = { title: Customers | Dashboard | ${config.site.name} } satisfies Metadata;

export default function Page(): React.JSX.Element {
  return (
    <div>
      <Main/>
    </div>
  );
}
