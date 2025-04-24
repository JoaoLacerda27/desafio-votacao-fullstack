import React from 'react';
import { Grid, Card, CardContent, Typography, CardActionArea } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { 
  Description as PautaIcon,
  Event as SessaoIcon,
  People as AssociadoIcon,
  HowToVote as VotacaoIcon
} from '@mui/icons-material';

const menuItems = [
  {
    title: 'Pautas',
    icon: <PautaIcon sx={{ fontSize: 40 }} />,
    path: '/pautas',
    color: '#1976d2'
  },
  {
    title: 'Sessões',
    icon: <SessaoIcon sx={{ fontSize: 40 }} />,
    path: '/sessoes',
    color: '#2e7d32'
  },
  {
    title: 'Associados',
    icon: <AssociadoIcon sx={{ fontSize: 40 }} />,
    path: '/associados',
    color: '#ed6c02'
  },
  {
    title: 'Votações',
    icon: <VotacaoIcon sx={{ fontSize: 40 }} />,
    path: '/votacoes',
    color: '#9c27b0'
  }
];

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Grid container spacing={3} sx={{ mt: 2 }}>
      {menuItems.map((item) => (
        <Grid item xs={12} sm={6} md={3} key={item.title}>
          <Card 
            sx={{ 
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              transition: 'transform 0.2s',
              '&:hover': {
                transform: 'scale(1.02)'
              }
            }}
          >
            <CardActionArea 
              onClick={() => navigate(item.path)}
              sx={{ 
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                p: 3
              }}
            >
              <div style={{ color: item.color, marginBottom: 2 }}>
                {item.icon}
              </div>
              <CardContent sx={{ textAlign: 'center' }}>
                <Typography variant="h6" component="div">
                  {item.title}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default Home; 