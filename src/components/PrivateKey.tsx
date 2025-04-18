import { useState } from "react"
import Lock from "../icons/Lock";
import UnLock from "../icons/UnLock";

function PrivateKey({ keyPrivate }: { keyPrivate: string}) {

    const [hide, setHide] = useState<boolean>(true);

    const dotStr = "•".repeat(keyPrivate.length);
    function handleHide(){
        setHide(pr => !pr);
    }
    return (
        <div className={"flex gap-2"}>
            <div className={"min-w-max"}>
                Privae Key: 
            </div>
            <div className={"gap-2 flex overflow-x-hidden"}>

            <div className={"truncate"}>
                { hide? dotStr : keyPrivate}
            </div>
            <div className={"p-1"}>

                <div onClick={handleHide} className={"outline-1 outline-zinc-600 rounded-md p-1 sm:p-2 cursor-pointer"}>{hide ?<UnLock /> : <Lock /> } </div>
            </div>
            </div>
        </div>
    )
}

export default PrivateKey