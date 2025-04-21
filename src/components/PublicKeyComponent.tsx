import Copy from "../icons/Copy"
import { copyHandle } from "../utils/copyText"

function PublicKeyComponent({ publicKey }: { publicKey: string }) {
  return (
    <div className={"grid grid-cols-20 gap-2 px-2 sm:px-0"}>
      <div className={"flex gap-2 col-span-17"}>
        <div className={"min-w-max"}>
          Public Key:
        </div>
        <div className={"overflow-hidden text-ellipsis"}>{publicKey}</div>
      </div>
      <div onClick={() => copyHandle(publicKey)} className={"rounded-md p-1 sm:p-2  cursor-pointer"}><Copy /></div>
    </div>
  )
}

export default PublicKeyComponent