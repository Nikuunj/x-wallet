import { RecoilRoot } from 'recoil';
import './App.css'
import WalletView from './components/WalletView';

function App() {

  return (
    <RecoilRoot>
      <WalletView />
    </RecoilRoot>
  )
}

export default App
