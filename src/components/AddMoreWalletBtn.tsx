import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { account_idx, ethKeyPairState, seedSelector, solKeyPairState } from "../store/mnemonics";
import { ethKeyGenerator, solKeyGenerator } from "../utils/keyGenerator";

function AddMoreWalletBtn() {
    const [account, setAccount] = useRecoilState(account_idx);
    const seed = useRecoilValue(seedSelector);
    const setEthKeyPairArr = useSetRecoilState(ethKeyPairState);
    const setSolkeyPairArr = useSetRecoilState(solKeyPairState);

    const addWallet = async () => {
        const update = account + 1;
        localStorage.setItem('numberOfAcc', update.toString());

        try {
            const newEthKey = await ethKeyGenerator(account, seed);
            setEthKeyPairArr(prev => [...prev, newEthKey]);

            const newSolKey = await solKeyGenerator(account, seed);
            setSolkeyPairArr(prev => [...prev, newSolKey]);

            setAccount(prev => prev + 1);
        } catch (error) {
            console.error("Failed to generate wallet keys:", error);
        }
    };

    return (
        <div onClick={addWallet} className="rounded-lg cursor-pointer bg-slate-300 text-zinc-900 px-4 py-1">
            Add more
        </div>
    );
}

export default AddMoreWalletBtn;
