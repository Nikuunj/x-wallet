
function PublicKeyComponent({ publicKey }: { publicKey: string }) {
  return (
    <div className={"overflow-hidden text-ellipsis"}>{publicKey}</div>
  )
}

export default PublicKeyComponent