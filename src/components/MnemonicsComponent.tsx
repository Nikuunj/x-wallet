import { useRecoilState, useSetRecoilState } from "recoil";
import { account_idx, ethKeyPairState, mnemonicsState, solKeyPairState } from "../store/mnemonics";
import { generateMnemonic } from "bip39";
import { memo } from "react";
import AddMoreWalletBtn from "./AddMoreWalletBtn";
import MnemonicsArray from "./MnemonicsArray";

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
        <div className={"flex flex-col gap-3 items-center justify-cente mt-5"}>
            <div>
                <MnemonicsArray mnemonic={mnemonics} />
            </div>
        { !mnemonics && <div  className={" h-[80vh] flex justify-center items-center"}>
            <span className={"bg-sky-100 text-zinc-900 px-7 rounded-lg py-2 cursor-pointer"} onClick={generate}>Generate Wallet</span>
        </div>}
        <div className={"flex gap-3"}>

            { mnemonics && <div onClick={clearAll} className={"rounded-lg cursor-pointer bg-rose-800 text-zinc-300 px-4 py-1 roudned-lg"}>Clear all</div>}
            { mnemonics &&  <AddMoreWalletBtn />}
        </div>
        </div>
    )
}

export default memo(MnemonicsComponent)