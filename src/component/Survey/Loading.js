import React from 'react';
import { Typography, CircularProgress} from '@material-ui/core';

// Fonction pour mettre un effet de chargement :
function Loading() {
    return( 
      <div style={{position: 'relative'}}>
    <Typography variant="h4" align="center" color="textPrimary" gutterBottom>
    Loading survey
    </Typography>
    <CircularProgress color="primary" size={300} thickness={7} style={{marginLeft: '30%'}} />
    </div>
    );
  }

export default Loading;