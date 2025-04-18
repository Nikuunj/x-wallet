import { useState } from "react"
import Lock from "../icons/Lock";
import UnLock from "../icons/UnLock";

function PrivateKey({ keyPrivate }: { keyPrivate: string}) {

    const [hide, setHide] = useState<boolean>(true);

    const dotStr = "*".repeat(keyPrivate.length);
    function handleHide(){
        setHide(pr => !pr);
    }
    return (
        <div className={"flex gap-2 justify-between"}>

        <div className={"overflow-hidden text-ellipsis"}>
            { hide? dotStr : keyPrivate}
        </div>
            <span onClick={handleHide} className={"bg-red-600"}>{hide ?<UnLock /> : <Lock /> } </span>
        </div>
    )
}

export default PrivateKey