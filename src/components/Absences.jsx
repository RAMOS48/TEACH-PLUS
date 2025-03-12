"use client";
import useStore from "@/store/useStore"
import { useState , useRef } from "react";



// component unuseable 

export default function Absences (){

const { absences , selectedTeacher , markAbsence } = useStore();
const absenceDate = useRef("");

return(<div>
    {absences? absences.map((absence)=>(<div>

        <div>{absence.date}</div>
        <div>{absence.caughtUp}</div>


    </div>)) : <div>no absences</div>}
    <input ref={absenceDate} placeholder="type date here" type="date"/>
    <button onClick={()=>{markAbsence(absenceDate.current.value)}}>Add absence</button>
</div>)}