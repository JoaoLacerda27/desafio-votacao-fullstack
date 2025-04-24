import React from 'react';
import { Container, Grid, Paper, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import GavelIcon from '@mui/icons-material/Gavel';
import PeopleIcon from '@mui/icons-material/People';
import EventIcon from '@mui/icons-material/Event';
import HowToVoteIcon from '@mui/icons-material/HowToVote';
import BarChartIcon from '@mui/icons-material/BarChart';

interface CardProps {
  title: string;
  count: number;
  description: string;
  icon: React.ReactNode;
  path: string;
}

const Card: React.FC<CardProps> = ({ title, count, description, icon, path }) => {
  const navigate = useNavigate();

  return (
    <Paper
      sx={{
        p: 2,
        display: 'flex',
        flexDirection: 'column',
        height: 140,
        bgcolor: '#ffffff',
        cursor: 'pointer',
        transition: 'all 0.3s ease-in-out',
        border: '1px solid #e0e0e0',
        '&:hover': {
          transform: 'translateY(-5px)',
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
          borderColor: '#000080',
        },
      }}
      onClick={() => navigate(path)}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        {icon}
        <Typography component="h2" variant="h6" color="primary" sx={{ ml: 1 }}>
          {title}
        </Typography>
      </Box>
      <Typography component="p" variant="h4" sx={{ mb: 1, color: '#000080' }}>
        {count}
      </Typography>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
        {description}
      </Typography>
    </Paper>
  );
};

export const HomePage = () => {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom sx={{ color: '#000080', fontWeight: 'bold' }}>
        Sistema de Votação
      </Typography>
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={6} lg={4}>
          <Card
            title="Pautas"
            count={0}
            description="Pautas cadastradas"
            icon={<GavelIcon sx={{ fontSize: 30, color: '#000080' }} />}
            path="/pautas"
          />
        </Grid>

        <Grid item xs={12} md={6} lg={4}>
          <Card
            title="Associados"
            count={0}
            description="Associados cadastrados"
            icon={<PeopleIcon sx={{ fontSize: 30, color: '#000080' }} />}
            path="/associados"
          />
        </Grid>

        <Grid item xs={12} md={6} lg={4}>
          <Card
            title="Sessões"
            count={0}
            description="Sessões ativas"
            icon={<EventIcon sx={{ fontSize: 30, color: '#000080' }} />}
            path="/sessoes"
          />
        </Grid>

        <Grid item xs={12} md={6} lg={4}>
          <Card
            title="Votações"
            count={0}
            description="Votações em andamento"
            icon={<HowToVoteIcon sx={{ fontSize: 30, color: '#000080' }} />}
            path="/votacoes"
          />
        </Grid>

        <Grid item xs={12} md={6} lg={4}>
          <Card
            title="Resultados"
            count={0}
            description="Resultados disponíveis"
            icon={<BarChartIcon sx={{ fontSize: 30, color: '#000080' }} />}
            path="/resultados"
          />
        </Grid>
      </Grid>
    </Container>
  );
}; 