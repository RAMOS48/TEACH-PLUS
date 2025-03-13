"use client"

import Shedule from "@/components/Shedule";
import  useStore  from "@/store/useStore.js";

export default function Sessions() {




  // sessions page here 

  // work : 

  /*
  
  . handle sessions ( add , update , delete )
  . component sessions list with filter 
   
  
  */


  const { sessions , getSessions , addSession , updateSession , deleteSession} = useStore();
  // functions to use
    return (
      <div className="">
        sessions  page
      </div>
    );
  }
  