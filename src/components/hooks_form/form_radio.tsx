import * as React from 'react';
import { Controller } from 'react-hook-form';
import { Radio, SxProps, FormHelperText, FormControl, FormControlLabel, RadioGroup } from '@mui/material';

interface IProps {
  control: any;
  name: string;
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
    label,
    size = 'small',
    disabled = false,
    variant = 'outlined',
    margin = 'dense',
    options,
    keyOption,
    labelOption,
    optionsDisabled = [],
    loading = false,
    deleteOption,
    handleChange,
    sx,
    placeholder
  } = props;

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { value, onChange }, fieldState: { error, invalid } }) => (
        <FormControl sx={sx} fullWidth margin={margin} size={size} error={invalid}>
          <RadioGroup
            aria-labelledby='demo-error-radios'
            name='quiz'
            value={value}
            onChange={(e) => {
              const value = e.target.value;
              onChange(value);
            }}
          >
            {options.map((option, index) => (
              <FormControlLabel key={index} value={option[keyOption]} control={<Radio />} label={option[labelOption]} />
            ))}
          </RadioGroup>
          {invalid && <FormHelperText>{error?.message}</FormHelperText>}
        </FormControl>
      )}
    />
  );
}
