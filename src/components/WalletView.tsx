import { memo } from "react"
import KeyComponent from "./KeyComponent";
import MnemonicsComponent from "./MnemonicsComponent";


function WalletView() {

    return (
        <div>
            <MnemonicsComponent />
            <br /><br />
            <KeyComponent />
            
        </div>
    )
}

export default memo(WalletView)