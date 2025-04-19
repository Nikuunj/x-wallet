import { useState } from "react";
import Copy from "../icons/Copy";
import { copyHandle } from "../utils/copyText";
import UpIcon from "../icons/UpIcon";
import DownIcon from "../icons/DownIcon";


function MnemonicsArray({ mnemonic }: { mnemonic: string }) {

    const [open , setOpen] = useState<boolean>(false);
    const TextToArr = mnemonic.split(' ');;
    const rednerArr = TextToArr.map((val, i) => (
        <div className={"bg-zinc-800 px-2 py-1 rounded-md"} key={i}>
            {i + 1} {val}
        </div>
    ))

    function openHandl() {
        console.log('click');
        
        setOpen(pre => !pre)
    }
    return (
        <div>
            {mnemonic && <>
            <div className={"flex justify-between"} onClick={openHandl}>
                <span> Show mnemonic </span> <span className={"translate-y-2"}> {open ? <UpIcon/> : <DownIcon/>} </span>
            </div>
            <hr className={"mb-2"}/>
                <div 
                  className={`grid grid-cols-3 sm:grid-cols-4 gap-2 transition-all duration-300 ease-in-out ${
                    open ? 'opacity-100 scale-100 translate-0' : 'opacity-0 -translate-y-50 h-0 -z-30'
                  }`}
                >
                    {rednerArr}</div>
                <div className={"flex gap-2 cursor-pointer"} onClick={() => copyHandle(mnemonic)}>
                    Copy Mnemonic <span className={"translate-y-2"}><Copy /></span> 
                </div>
            </>}
        </div>
    )
}

export default MnemonicsArray