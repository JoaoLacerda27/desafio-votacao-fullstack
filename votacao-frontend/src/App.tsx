import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Box, Container } from '@mui/material';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import { PautasPage } from './pages/PautasPage';
import Sessoes from './pages/Sessoes';
import { VotacoesPage } from './pages/VotacoesPage';
import { AssociadosPage } from './pages/AssociadosPage';
import { ResultadosPage } from './pages/ResultadosPage';

function App() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />
      <Container component="main" sx={{ mt: 4, mb: 4, flex: 1 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pautas" element={<PautasPage />} />
          <Route path="/sessoes" element={<Sessoes />} />
          <Route path="/votacoes" element={<VotacoesPage />} />
          <Route path="/associados" element={<AssociadosPage />} />
          <Route path="/resultados" element={<ResultadosPage />} />
        </Routes>
      </Container>
    </Box>
  );
}

export default App; 