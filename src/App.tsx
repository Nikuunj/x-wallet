import { RecoilRoot } from 'recoil';
import WalletViewSolana from './components/WalletView';

function App() {

  return (
    <div className={'bg-black text-slate-300 min-h-screen overflow-hidden'}> 

      <RecoilRoot>
        <WalletViewSolana />
      </RecoilRoot>
    </div>
  )
}

export default App
