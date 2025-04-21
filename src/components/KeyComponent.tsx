import { memo } from "react"
import { useRecoilState, useRecoilValue } from "recoil";
import { ethKeyPairState, solKeyPairState, solYaEth } from "../store/mnemonics";
import PrivateKey from "./PrivateKey";
import PublicKeyComponent from "./PublicKeyComponent";


function KeyComponent() {
  const ethKeyPairArr = useRecoilValue(ethKeyPairState);
  const solkeyPairArr = useRecoilValue(solKeyPairState);
  const [solYEth, setSolYEth] = useRecoilState(solYaEth);
  
  
  function handleToggleSetSol() {
    setSolYEth(true);
  }

  function handleToggleSetEth() {
    setSolYEth(false);
  }

  const renderAccSol = solkeyPairArr.map((val, idx) => (
    <div
      key={idx}
      className="w-full sm:max-w-md outline-1 outline-gray-400 rounded-md px-3 py-4 overflow-x-auto"
    >
      <PublicKeyComponent publicKey={val.publicKey} />
      <PrivateKey keyPrivate={val.privateKey} />
    </div>
  ));

  const renderAccEth = ethKeyPairArr.map((val, idx) => (
    <div
      key={idx}
      className="w-full sm:max-w-md outline-1 outline-gray-400 rounded-md px-3 py-4 overflow-x-auto"
    >
      <PublicKeyComponent publicKey={val.publicKey} />
      <PrivateKey keyPrivate={val.privateKey} />
    </div>
  ));

  return (

    <>
    { ethKeyPairArr.length !== 0 && solkeyPairArr.length !== 0 && 
      <div className="w-full max-w-screen-md mx-auto px-4 grid justify-center items-center gap-4">
        <div className="flex justify-between items-center">
          <div className="text-2xl font-semibold">
            {solYEth ? 'Sol' : 'Eth'} Wallet
          </div>
          
          <div className="flex">
            <div
              onClick={handleToggleSetSol}
              className={`relative rounded-s-lg w-full max-w-24  py-1 px-3 text-lg bg-transparent text-black duration-500 font-semibold border-2 border-r-0 overflow-hidden cursor-pointer ${
                solYEth ? "text-blue-900" : "text-zinc-400"
              }`}
            >
              <span className="relative z-10">Sol</span>
              <span
                className={`absolute inset-0 duration-500 transition-all transform -translate-x-44 ${
                  solYEth ? "translate-x-0" : "translate-x-full"
                } w-full bg-gradient-to-l from-indigo-500 via-sky-500 to-emerald-500 h-full`}
              ></span>
            </div>

            <div
              onClick={handleToggleSetEth}
              className={`relative w-full max-w-24 rounded-e-lg py-1 px-3 text-lg bg-transparent text-black duration-500 font-semibold border-2 border-s-0 overflow-hidden cursor-pointer ${
                !solYEth ? "text-blue-900" : "text-zinc-400"
              }`}
            >
              <span className="relative z-10">Eth</span>
              <span
                className={`absolute inset-0 duration-500 transition-all transform -translate-x-52 ${
                  !solYEth ? "translate-x-0" : "-translate-x-full"
                } w-full bg-gradient-to-r from-indigo-500 via-sky-500 to-emerald-500 h-full`}
              ></span>
            </div>
          </div>
        </div>

        <div className="grid gap-4">
          {solYEth ? renderAccSol : renderAccEth}
        </div>
      </div>  }
    </>
  );
}

export default memo(KeyComponent);
