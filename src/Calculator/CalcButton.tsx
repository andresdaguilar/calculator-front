import React from 'react';
import { Button, Grid, Tooltip } from '@mui/material';

interface iButton {
  label: string;
  type: string;
  value?: string;
  className: string;
  tooltip: string;
  width?: number;
}

interface CalcButtonProps {
  button: iButton;
  handleInput: (type: string, value?: string) => void;
}

const CalcButton: React.FC<CalcButtonProps> = ({ button, handleInput }) => {
  return (
    <Tooltip title={button.tooltip} placement="top">
      <Grid item xs={button.width || 3} className={`calc-item ${button.className}`}>
        <Button onClick={() => handleInput(button.type, button.value)}>
          {button.label}
        </Button>
      </Grid>
    </Tooltip>
  );
};

export default CalcButton;