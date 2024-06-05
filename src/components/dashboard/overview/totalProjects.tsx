import { Avatar, Card, CardContent, Stack, Typography } from "@mui/material";
import { Users as UsersIcon } from '@phosphor-icons/react/dist/ssr/Users';
import axios from "axios";
import { useEffect, useState } from "react";

export function TotalProjects({sx, token}): React.JSX.Element {
    const [count, setCount] = useState(0);

    const getTotalProjects = async () => {
        try {
            const res = await axios ({
                url:"http://localhost:5600/project/totalProjects",
                method:"get",
                headers: {Authorization: `Bearer ${token}`}
            })
            setCount(res.data.count);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getTotalProjects();
    },[])
    return (
        <Card sx={sx}>
          <CardContent>
            <Stack spacing={2}>
              <Stack direction="row" sx={{ alignItems: 'flex-start', justifyContent: 'space-between' }} spacing={3}>
                <Stack spacing={1}>
                  <Typography color="text.secondary" variant="overline">
                    Total Projects Completed
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