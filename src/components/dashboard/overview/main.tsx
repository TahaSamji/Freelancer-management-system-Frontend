'use client';

import * as React from 'react';



import { config } from '@/config';
import {Sellerdashboard} from './sellerdashboard/seller-overview';
import { Freelancerdashboard } from './freelancerdasbboard/freelancer-overview';
import { useAppSelector } from '@/app/Redux/store';




export  default function Main(): React.JSX.Element {
  const utype  = useAppSelector((state) => state.reducers.userReducer.userDetails.utype); 
 
  return (<div>
    {utype == 'Seller'? <Sellerdashboard/>: <Freelancerdashboard/>}
</div>);
}
