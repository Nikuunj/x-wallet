import { memo } from "react"
import KeyComponent from "./KeyComponent";
import MnemonicsComponent from "./MnemonicsComponent";


function WalletView() {
    return (
        <div className={"grid gap-3"}>
            <MnemonicsComponent />
            <KeyComponent />
            
        </div>
    )
}

export default memo(WalletView)