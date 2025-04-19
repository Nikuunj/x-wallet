import HeroIcon from "../icons/HeroIcon"


function NavBar() {
  return (
    <>
        <div className={"flex items-center gap-2 text-3xl/tight px-2 py-3 select-none"}>
            <div>
                <HeroIcon />
            </div>
            <div>
                X Wallet
            </div>
        </div>
        <hr className={'text-gray-500'} />
    </>
  )
}

export default NavBar