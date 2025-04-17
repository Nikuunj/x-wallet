import { memo } from "react"
import { useRecoilState, useRecoilValue } from "recoil"
import { solanaKeyPairSelector, mnemonicsState, account_idx, solYaEth, EthKeyPairSelector } from "../store/mnemonics"
import { generateMnemonic } from "bip39";


function WalletView() {
    const [mnemonics, setMnemonics] = useRecoilState(mnemonicsState);
    const solkeyPairArr = useRecoilValue(solanaKeyPairSelector);
    const [account, setAccount] = useRecoilState(account_idx);
    const [solYEth, setSolYEth] = useRecoilState(solYaEth);
    const ethKeyPairArr = useRecoilValue(EthKeyPairSelector);
    
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

    function handleToggle() {
        setSolYEth(pre => !pre);
    }

    function addWallet() {
        const number = account + 1;
        localStorage.setItem('numberOfAcc', number.toString());
        setAccount(pre => pre + 1);
    }

    const renderAccSol =  solkeyPairArr.map((val, idx) => (
        <div key={idx}>
            {val.publicKey}
            <br />
            {val.privateKey}
            <hr />
        </div>
    ))

    const renderAccEth =  ethKeyPairArr.map((val, idx) => (
        <div key={idx}>
            public:  {val.publicKey}
            <br />
            private :  {val.privateKey}
            <hr />
        </div>
    ))
    return (
        <div>
            {mnemonics}
            <br /><br />
            {solYEth ? 'Sol' : 'Eth'}  Wallet
            { !mnemonics && <div onClick={generate}>
                click me to generate
            </div>}
            { mnemonics && <div onClick={clearAll}>Clear all</div>}
            { mnemonics && <div onClick={addWallet}> Add more</div>}
            {solYEth ? renderAccSol : renderAccEth}
            <div onClick={handleToggle}> Toggle</div>
        </div>
    )
}

export default memo(WalletView

)