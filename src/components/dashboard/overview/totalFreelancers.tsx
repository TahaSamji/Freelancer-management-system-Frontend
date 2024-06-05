import { Avatar, Card, CardContent, Stack, Typography } from "@mui/material";
import { Users as UsersIcon } from '@phosphor-icons/react/dist/ssr/Users';
import axios from "axios";
import { useEffect, useState } from "react";

export function TotalFreelancers({sx, token}): React.JSX.Element {
    const [count, setCount] = useState(0);

    const getTotalFreelancers = async () => {
        try {
            const res = await axios ({
                url:"http://localhost:5600/user/totalFreelancers",
                method:"get",
                headers: {Authorization: `Bearer ${token}`}
            })
            setCount(res.data.count);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getTotalFreelancers();
    },[])
    return (
        <Card sx={sx}>
          <CardContent>
            <Stack spacing={2}>
              <Stack direction="row" sx={{ alignItems: 'flex-start', justifyContent: 'space-between' }} spacing={3}>
                <Stack spacing={1}>
                  <Typography color="text.secondary" variant="overline">
                    Total Freelancers
                  </Typography>
                  <Typography variant="h4">{count}</Typography>
                </Stack>
                <Avatar sx={{ backgroundColor: 'var(--mui-palette-success-main)', height: '56px', width: '56px' }}>
                  <UsersIcon fontSize="var(--icon-fontSize-lg)" />
                </Avatar>
              </Stack>
             
            </Stack>
          </CardContent>
        </Card>
      );
}