'use client';

import React from "react";
import { Projects } from "./projects";
import { useAppSelector } from "@/app/Redux/store";
import { Bids } from "./MyBids";

export function Main(): React.JSX.Element {
    const utype = useAppSelector((state)=>state.reducers.userReducer.userDetails.utype);
    console.log(utype);
    return (<div>
        {utype == 'Seller'? <Projects/>: <Bids/>}
    </div>);
}
 