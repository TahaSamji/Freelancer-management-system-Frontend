'use client';
import { useAppSelector } from "@/app/Redux/store";
import { Stack, Typography } from "@mui/material";
import { AddUser } from "./addUser";
import { AddAdmin } from "./addAdmin";
import { CustomersTable } from "./customers-table";

export function Main() {
    const utype = useAppSelector((state) => state.reducers.userReducer.userDetails.utype);
    return (
        <Stack spacing={3}>
            <Typography variant="h4">Customers</Typography>
            {utype === "Super Admin" ?
            <Stack direction="row" spacing={2}>
                <AddUser />
                <AddAdmin />
            </Stack>
            :
            (utype === "Admin" ?
            <Stack direction="row" spacing={2}>
                <AddUser />
            </Stack>
            :
            null
            )
            }
            <CustomersTable />
        </Stack>
 );
}