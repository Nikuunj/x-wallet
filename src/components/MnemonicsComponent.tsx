import { useRecoilState, useSetRecoilState } from "recoil";
import { account_idx, ethKeyPairState, mnemonicsState, solKeyPairState } from "../store/mnemonics";
import { generateMnemonic } from "bip39";
import { memo } from "react";
import AddMoreWalletBtn from "./AddMoreWalletBtn";

function MnemonicsComponent() {
    const [mnemonics , setMnemonics] = useRecoilState(mnemonicsState);
    const setAccount = useSetRecoilState(account_idx);
    const setEthKeyPairArr = useSetRecoilState(ethKeyPairState);
    const setSolkeyPairArr = useSetRecoilState(solKeyPairState);

    function generate() {
        const genratedMemonics = generateMnemonic()
        localStorage.setItem('mnemonics', genratedMemonics)
        setMnemonics(genratedMemonics);
    }

    
    function clearAll() {
        localStorage.clear();
        setAccount(0);
        setMnemonics('');
        setEthKeyPairArr([])
        setSolkeyPairArr([])
    }

    return (
        <div>{mnemonics}
        { !mnemonics && <div onClick={generate}  className={"cursor-pointer"}>
            Generate Wallet
        </div>}
        { mnemonics && <div onClick={clearAll} className={"cursor-pointer"}>Clear all</div>}
        { mnemonics &&  <AddMoreWalletBtn />}
        </div>
    )
}

export default memo(MnemonicsComponent)