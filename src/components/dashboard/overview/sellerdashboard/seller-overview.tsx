'use client';

import * as React from 'react';
import type { Metadata } from 'next';
import Grid from '@mui/material/Unstable_Grid2';
import dayjs from 'dayjs';

import { config } from '@/config';
import { Budget } from '@/components/dashboard/overview/budget';
import { InactiveUsers } from '@/components/dashboard/overview/latest-orders';
import { CompletedProjects } from '@/components/dashboard/overview/completed-proj-table';
import { Sales } from '@/components/dashboard/overview/sales';
import { TasksProgress } from '@/components/dashboard/overview/tasks-progress';
import { TotalProfit } from '@/components/dashboard/overview/total-profit';
import { Traffic } from '@/components/dashboard/overview/traffic';
import { CustomersTable } from '@/components/dashboard/customer/customers-table';
import { ReviewRequests } from '@/components/dashboard/overview/sellerdashboard/review-request-table';
import { TotalPendingProj } from '../total-pending-proj';
import { TotalCompletedProj } from '../total-completed-proj';

export const metadata = { title: `Overview | Dashboard | ${config.site.name}` } satisfies Metadata;

export  function Sellerdashboard(): React.JSX.Element {
  return (
    <div>
    <Grid container spacing={3}>
      <Grid lg={3} sm={6} xs={12}>
        <TotalPendingProj sx={{ height: '100%' }} />
      </Grid>
      <Grid lg={3} sm={6} xs={12}>
        {/* <TasksProgress sx={{ height: '100%' }} value={75.5} /> */}
        <TotalCompletedProj sx={{ height: '100%' }} />
      </Grid>
      <Grid lg={3} sm={6} xs={12}>
        {/* <TasksProgress sx={{ height: '100%' }} value={75.5} /> */}
        <Budget sx={{ height: '100%' }} />
      </Grid>
      <Grid lg={3} sm={6} xs={12}>
        <TotalProfit sx={{ height: '100%' }} value="$15k" />
      </Grid>
      <Grid lg={11} xs={12}>
       
       <ReviewRequests/>
      </Grid>
      {/* <Grid lg={4} md={6} xs={12}>
        <Traffic chartSeries={[63, 15, 22]} labels={['Desktop', 'Tablet', 'Phone']} sx={{ height: '100%' }} />
      </Grid> */}
      {/* <Grid lg={4} md={6} xs={12}>
        <CompletedProjects
          sx={{ height: '100%' }}
        />
      </Grid> */}
    </Grid>
    </div>
  );
}
