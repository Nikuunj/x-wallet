import { memo } from "react"
import { useRecoilState, useRecoilValue } from "recoil"
import { account_idx, keyPairSelector, mnemonicsState } from "../store/mnemonics"
import { generateMnemonic } from "bip39";


function WalletView() {
    const [mnemonics, setMnemonics] = useRecoilState(mnemonicsState);
    const keyPairArr = useRecoilValue(keyPairSelector);
    const [account, setAccount] = useRecoilState(account_idx);
    function generate() {
        const genratedMemonics = generateMnemonic()
        localStorage.setItem('mnemonics', genratedMemonics)
        setMnemonics(genratedMemonics);
    }
    function clearAll() {
        setAccount(0);
        setMnemonics('');
        localStorage.clear();
    }

    function addMore() {
        const number = account + 1;
        localStorage.setItem('numberOfAcc', number.toString());
        setAccount(pre => pre + 1);
    }

    const renderAcc =  keyPairArr.map((val, idx) => (
        <div key={idx}>
            {val.publicKey}
            <br />
            {val.privateKey}
            <hr />
        </div>
    ))
    return (
        <div>
            {mnemonics}
            <br /><br />
            { !mnemonics && <div onClick={generate}>
                click me to generate
            </div>}
            { mnemonics && <div onClick={clearAll}>Clear all</div>}
            { mnemonics && <div onClick={addMore}> Add more</div>}
            {renderAcc}
        </div>
    )
}

export default memo(WalletView)