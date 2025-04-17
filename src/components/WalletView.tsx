import { memo } from "react"
import { useRecoilState } from "recoil"
import { mnemonicsState } from "../store/mnemonics"
import { generateMnemonic } from "bip39";


function WalletView() {
    const [mnemonics, setMnemonics] = useRecoilState(mnemonicsState);

    function generate() {
        const genratedMemonics = generateMnemonic()
        localStorage.setItem('mnemonics', genratedMemonics)
        setMnemonics(genratedMemonics);
    }
    function clearAll() {
        setMnemonics('');
        localStorage.clear();
    }
    return (
        <div>
            {mnemonics}
            <br /><br />
            { !mnemonics && <div onClick={generate}>
                click me to generate
            </div>}
            { mnemonics && <div onClick={clearAll}>Clear all</div>}
        </div>
    )
}

export default memo(WalletView)