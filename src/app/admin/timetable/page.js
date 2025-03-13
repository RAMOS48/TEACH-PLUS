"use client"

import Shedule from "@/components/Shedule";
import  useStore  from "@/store/useStore.js";
import { useEffect, useState } from "react";
export default function Schedule() {




  // schedule page here 

  // work : 

  /*
  
  
  . component schedule Card with filter
   
  
  */


  const { sessions , getSessions} = useStore();
  const [filterTimeTable , setFilterTimeTable] = useState ( {promo:"" , semester:"" , year:""})
  useEffect(() => { 
      getSessions(filterTimeTable);
  
  }, [sessions]);


    return (
      <div className="">
       <input placeholder="type year here ... "  onChange={(e) => setFilterTimeTable({...filterTimeTable , year:e.target.value})}/>
       <select  onChange={(e) => setFilterTimeTable({...filterTimeTable , semester:e.target.value})}>
        <option value="s1">S1</option>
        <option value="s2">S2</option>
      </select>
      <select  onChange={(e) => setFilterTimeTable({...filterTimeTable , promo:e.target.value})}>
        <option value="1cp">1CP</option>
        <option value="2cp">2CP</option>
        <option value="1cs">1CS</option>
        <option value="2cs">2CS</option>
        <option value="3cs">3CS</option>

      </select>

        schedule page
        <Shedule sessions={sessions} />
      </div>
    );
  }
  