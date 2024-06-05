import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import type { SxProps } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { ArrowDown as ArrowDownIcon } from '@phosphor-icons/react/dist/ssr/ArrowDown';
import { ArrowUp as ArrowUpIcon } from '@phosphor-icons/react/dist/ssr/ArrowUp';
import { CurrencyDollar as CurrencyDollarIcon } from '@phosphor-icons/react/dist/ssr/CurrencyDollar';
import { useAppSelector } from '@/app/Redux/store';
import axios from 'axios';


export function Budget({ sx }): React.JSX.Element {

  const [value, setValue] = React.useState<string>('0');
  const token = useAppSelector((state) => state.reducers.userReducer.userDetails.utype);

  const getTotalSales = async () => {
    try {
      console.log("hello")
      const res = await axios({
        url: "http://localhost:5600/project/getTotalSales",
        method: "get",
        headers: { Authorization: `Bearer ${token}` }
      });
      console.log(res.data.totalSales)
      setValue(res.data.totalSales.toString());
    } catch (error) {
      console.error("Failed to fetch total sales:", error);
    }
  };

  React.useEffect(() => {
    getTotalSales();
  },[]);

  return (
    <Card sx={sx}>
      <CardContent>
        <Stack spacing={3}>
          <Stack direction="row" sx={{ alignItems: 'flex-start', justifyContent: 'space-between' }} spacing={3}>
            <Stack spacing={1}>
              <Typography color="text.secondary" variant="overline">
                Total Sales
              </Typography>
              <Typography variant="h4">{value}</Typography>
            </Stack>
            <Avatar sx={{ backgroundColor: 'var(--mui-palette-primary-main)', height: '56px', width: '56px' }}>
              <CurrencyDollarIcon fontSize="var(--icon-fontSize-lg)" />
            </Avatar>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}
