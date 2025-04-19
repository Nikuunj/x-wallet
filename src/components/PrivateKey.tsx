import { useState } from "react"
import Lock from "../icons/Lock";
import UnLock from "../icons/UnLock";
import Copy from "../icons/Copy";
import { copyHandle } from "../utils/copyText";

function PrivateKey({ keyPrivate }: { keyPrivate: string}) {

    const [hide, setHide] = useState<boolean>(true);

    const dotStr = "•".repeat(keyPrivate.length);
    function handleHide(){
        setHide(pr => !pr);
    }
    return (
        <div className={"grid grid-cols-20 gap-2 px-2 sm:px-0"}>
            <div className={"flex gap-2 col-span-17"}>
                <div className={"min-w-max"}>
                    Privae Key: 
                </div>
                <div className={"gap-2 overflow-x-hidden"}>
                    <div className={"truncate"}>
                        { hide? dotStr : keyPrivate}
                    </div>
                </div>
                
            </div>
            <div className={"flex gap-1"}>
                    <div onClick={() => copyHandle(keyPrivate)} className={"p-1 sm:p-2  cursor-pointer"}><Copy /></div>
                    <div onClick={handleHide} className={" p-1 sm:p-2 cursor-pointer"}>{hide ?<UnLock /> : <Lock /> }</div>
            </div>
        </div>
    )
}

export default PrivateKey