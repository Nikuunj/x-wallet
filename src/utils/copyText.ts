import { useState } from "react";

export const [notify, setNotify] = useState<boolean>(false)

export function copyHandle(text: string){
    navigator.clipboard.writeText(text);
    alert('copy to keyboard')
}