import { RecoilRoot } from 'recoil';
import './App.css'
import WalletViewSolana from './components/WalletView';

function App() {

  return (
    <RecoilRoot>
      <WalletViewSolana />
    </RecoilRoot>
  )
}

export default App
