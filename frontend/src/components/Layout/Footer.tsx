import React from 'react';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import { APP_NAME } from '../../settings';

export default function Footer() {
  return (
    <footer style={{ marginTop: '-30px', clear: "both" }}>
      <div style={{ position: "relative", zIndex: 10000 }}>
        <Typography variant="body2" color="textSecondary" align="center">
          {'Copyright © '}
          <Link color="inherit" href="https://github.com/emilefrey/django-react-postgres-boilerplate">
            {APP_NAME}
          </Link>{' '}
          {new Date().getFullYear()}
          {'.'}
        </Typography>
      </div>
    </footer>
  );
}