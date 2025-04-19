import { RecoilRoot } from 'recoil';
import WalletViewSolana from './components/WalletView';
import NavBar from './components/NavBar';

function App() {

  return (
    <div className={'bg-black text-slate-300 min-h-screen overflow-hidden text-lg'}> 
    <NavBar />
      <RecoilRoot>
        <WalletViewSolana />
      </RecoilRoot>
    </div>
  )
}

export default App
