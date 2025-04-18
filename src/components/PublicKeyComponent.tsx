
function PublicKeyComponent({ publicKey }: { publicKey: string }) {
  return (
    <div className={"flex gap-2"}>
      <div className={"min-w-max"}>
        Public Key:
      </div>
      <div className={"overflow-hidden text-ellipsis"}>{publicKey}</div>
    </div>
  )
}

export default PublicKeyComponent