import { HelmetProvider } from 'react-helmet-async';
import Router from '../../router/router';

function App(): JSX.Element {
  return (
    <HelmetProvider>
      <Router />
    </HelmetProvider>)
}

export default App;
