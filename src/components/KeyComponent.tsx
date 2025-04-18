import { memo } from "react"
import { useRecoilState, useRecoilValue } from "recoil";
import { ethKeyPairState, solKeyPairState, solYaEth } from "../store/mnemonics";

function KeyComponent() {

  const ethKeyPairArr = useRecoilValue(ethKeyPairState);
  const solkeyPairArr = useRecoilValue(solKeyPairState);
  const [solYEth, setSolYEth] = useRecoilState(solYaEth);
  
  function handleToggle() {
      setSolYEth(pre => !pre);
  }

  const renderAccSol =  solkeyPairArr.map((val, idx) => (
      <div key={idx} className={"w-full"}>
        <p className={"overflow-hidden text-ellipsis"}>
          {val.publicKey}
        </p>
        <p className={"overflow-hidden text-ellipsis"}>
          {val.privateKey}
        </p>
        <hr />
    </div>
    ))

  const renderAccEth =  ethKeyPairArr.map((val, idx) => (
      <div key={idx} className={"w-full"}>
        <p className={"overflow-hidden text-ellipsis"}>
          {val.publicKey}
        </p>
        <p className={"overflow-hidden text-ellipsis"}>
          {val.privateKey}
        </p>
        <hr />
      </div>
  ))
    
  return (
    <div>
        {solYEth ? 'Sol' : 'Eth'}  Wallet 
        { solYEth ? renderAccSol : renderAccEth }
        {renderAccEth && <div onClick={handleToggle}  className={"cursor-pointer"}> Toggle</div> }
    </div>
  )
}

export default memo(KeyComponent)