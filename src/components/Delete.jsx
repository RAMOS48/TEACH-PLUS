"use client ";

import useStore from "@/store/useStore";

export default function DeleteTeacher ()
{

    
const {deleteTeacher , selectTeacher} = useStore();


const handleDelete = () => { deleteTeacher() ; selectTeacher(null)}

    return(

<div>

<div> are you sure to delete this teacher ? </div>
<button onClick={handleDelete}>confirm</button>


</div>)}