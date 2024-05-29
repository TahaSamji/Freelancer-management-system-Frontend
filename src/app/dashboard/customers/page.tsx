import * as React from 'react';
import type { Metadata } from 'next';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Download as DownloadIcon } from '@phosphor-icons/react/dist/ssr/Download';
import { Plus as PlusIcon } from '@phosphor-icons/react/dist/ssr/Plus';
import { Upload as UploadIcon } from '@phosphor-icons/react/dist/ssr/Upload';
import dayjs from 'dayjs';

import { config } from '@/config';
import { CustomersFilters } from '@/components/dashboard/customer/customers-filters';
import { CustomersTable } from '@/components/dashboard/customer/customers-table';
import type { User } from '@/components/dashboard/customer/customers-table';

export const metadata = { title: `Customers | Dashboard | ${config.site.name}` } satisfies Metadata;

// interface PageProps {
//   initialUsers: User[];
// }

// export default function Page({ initialUsers }: PageProps): React.JSX.Element {
//   const [users, setUsers] = React.useState<User[]>(initialUsers);
//   const page = 0;
//   const rowsPerPage = 5;

//   const paginatedCustomers = applyPagination(users, page, rowsPerPage);

//   return (
//     <Stack spacing={3}>
//       <Stack direction="row" spacing={3}>
//         <Stack spacing={1} sx={{ flex: '1 1 auto' }}>
//           <Typography variant="h4">Customers</Typography>
//           <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
//             <Button color="inherit" startIcon={<UploadIcon fontSize="var(--icon-fontSize-md)" />}>
//               Import
//             </Button>
//             <Button color="inherit" startIcon={<DownloadIcon fontSize="var(--icon-fontSize-md)" />}>
//               Export
//             </Button>
//           </Stack>
//         </Stack>
//         <div>
//           <Button startIcon={<PlusIcon fontSize="var(--icon-fontSize-md)" />} variant="contained">
//             Add
//           </Button>
//         </div>
//       </Stack>
//       <CustomersFilters />
//       <CustomersTable
//         count={paginatedCustomers.length}
//         page={page}
//         rows={paginatedCustomers}
//         rowsPerPage={rowsPerPage}
//         setUsers={setUsers}
//       />
//     </Stack>
//   );
// }

// function applyPagination(rows: User[], page: number, rowsPerPage: number): User[] {
//   return rows?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) || [];
// }
export default function Page(): React.JSX.Element {
  return (
    <Stack spacing = {3}>
    <Typography variant="h4">Customers</Typography>
    <CustomersTable/>
    </Stack>
  );
}
