import { memo } from "react"
import { useRecoilState, useRecoilValue } from "recoil";
import { ethKeyPairState, solKeyPairState, solYaEth } from "../store/mnemonics";
import PrivateKey from "./PrivateKey";
import PublicKeyComponent from "./PublicKeyComponent";

function KeyComponent() {

  const ethKeyPairArr = useRecoilValue(ethKeyPairState);
  const solkeyPairArr = useRecoilValue(solKeyPairState);
  const [solYEth, setSolYEth] = useRecoilState(solYaEth);
  
  function handleToggle() {
      setSolYEth(pre => !pre);
  }

  const renderAccSol =  solkeyPairArr.map((val, idx) => (
      <div key={idx} className={"w-full"}>
        <PublicKeyComponent publicKey={val.publicKey} />
        <PrivateKey keyPrivate={val.privateKey} />
        <hr />
    </div>
    ))

  const renderAccEth =  ethKeyPairArr.map((val, idx) => (
      <div key={idx} className={"w-full"}>
        <p className={"overflow-hidden text-ellipsis"}>
          {val.publicKey}
        </p>
        <PrivateKey keyPrivate={val.privateKey} />
        <hr />
      </div>
  ))
    
  return (
    <div>
        {solYEth ? 'Sol' : 'Eth'}  Wallet 
        { solYEth ? renderAccSol : renderAccEth }
        <div>

          {renderAccEth && <div onClick={handleToggle}  className={"cursor-pointer"}> Toggle</div> }
        </div>
    </div>
  )
}

export default memo(KeyComponent)