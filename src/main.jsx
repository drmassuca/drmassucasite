import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import { HelmetProvider } from 'react-helmet-async';

// Tipografia da família ICS/Xdiag: Inter self-hosted (sem request externo)
import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/600.css';
import '@fontsource/inter/700.css';
import '@fontsource/inter/800.css';

// Tokens e tema do reposicionamento 2026
import './styles/brand-tokens.css';
import theme from './theme';
import App from './App';

/**
 * O site é light-only. Só o config do tema não basta: o Chakra lê
 * 'chakra-ui-color-mode' do localStorage antes dele, então um visitante
 * que tenha ficado em modo escuro numa versão anterior continuaria vendo
 * as superfícies escuras. Este manager ignora o que estiver salvo.
 */
const lightOnlyColorMode = {
  type: 'localStorage',
  ssr: false,
  get: () => 'light',
  set: () => {},
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HelmetProvider>
      <ChakraProvider theme={theme} colorModeManager={lightOnlyColorMode}>
        <BrowserRouter
          future={{
            v7_startTransition: true,
            v7_relativeSplatPath: true,
          }}
        >
          <App />
        </BrowserRouter>
      </ChakraProvider>
    </HelmetProvider>
  </React.StrictMode>
);
