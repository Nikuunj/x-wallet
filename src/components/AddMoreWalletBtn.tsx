import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { account_idx, ethKeyPairState, seedSelector, solKeyPairState } from "../store/mnemonics";
import { ethKeyGenerator, solKeyGenerator } from "../utils/keyGenerator";


function AddMoreWalletBtn() {

    const [account, setAccount] = useRecoilState(account_idx);
    const seed = useRecoilValue(seedSelector);
    const setEthKeyPairArr = useSetRecoilState(ethKeyPairState);
    const setSolkeyPairArr = useSetRecoilState(solKeyPairState);

    function addWallet() {
        const update = account + 1;
        localStorage.setItem('numberOfAcc', update.toString());
        setEthKeyPairArr(prev => [...prev, ethKeyGenerator(account,seed)])
        setSolkeyPairArr(prev => [...prev, solKeyGenerator(account, seed)]);
        setAccount(pre => pre + 1);
    }
    
    return (
        <div onClick={addWallet} className={"cursor-pointer"}> Add more</div>
    )
}

export default AddMoreWalletBtn