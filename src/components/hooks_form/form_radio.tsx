import * as React from 'react';
import { Controller } from 'react-hook-form';
import { Radio, SxProps, FormHelperText, FormControl, FormControlLabel, RadioGroup, FormLabel } from '@mui/material';

interface IProps {
  control: any;
  name: string;
  row?: boolean;
  options: any[];
  keyOption: string;
  labelOption: string;
  placeholder?: string;
  label?: string;
  size?: 'small' | 'medium';
  disabled?: boolean;
  variant?: 'standard' | 'filled' | 'outlined';
  margin?: 'none' | 'dense' | 'normal';
  loading?: boolean;
  optionsDisabled?: string[];
  handleChange?: (name: string, value: any) => void;
  sx?: SxProps;
  deleteOption?: {
    onDelete: (id: string) => void;
    isDeleting: boolean;
  };
}
export default function FormRadio(props: IProps) {
  const {
    control,
    name,
    size = 'small',
    margin = 'dense',
    options,
    keyOption,
    labelOption,
    sx,
    row = false,
    label
  } = props;

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { value, onChange }, fieldState: { error, invalid } }) => (
        <FormControl sx={sx} fullWidth margin={margin} size={size} error={invalid}>
          {label && (
            <FormLabel
              sx={{ fontSize: 13, fontWeight: 600, color: 'text.secondary' }}
              id='demo-radio-buttons-group-label'
            >
              {label}
            </FormLabel>
          )}
          <RadioGroup
            row={row}
            aria-labelledby='demo-error-radios'
            name='quiz'
            value={value}
            onChange={(e) => {
              const value = e.target.value;
              onChange(value);
            }}
          >
            {options.map((option, index) => (
              <FormControlLabel
                style={{ fontSize: 13, marginTop: 1 }}
                sx={{ fontSize: 13, marginTop: 1 }}
                key={index}
                value={option[keyOption]}
                control={<Radio />}
                label={option[labelOption]}
              />
            ))}
          </RadioGroup>
          {invalid && <FormHelperText>{error?.message}</FormHelperText>}
        </FormControl>
      )}
    />
  );
}
