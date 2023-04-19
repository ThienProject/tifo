import React from 'react';
import ClearIcon from '@mui/icons-material/Clear';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { FormControl, IconButton, InputAdornment, SxProps, TextField } from '@mui/material';
import { isNumber, isString, multiply } from 'lodash';
import { Controller } from 'react-hook-form';

interface IProps {
  control: any;
  name: string;
  label?: string;
  placeholder?: string;
  size?: 'small' | 'medium';
  disabled?: boolean;
  variant?: 'standard' | 'filled' | 'outlined';
  inputBase?: boolean;
  margin?: 'none' | 'dense' | 'normal';
  type?: 'text' | 'password' | 'number';
  showClearable?: boolean;
  required?: boolean;
  sx?: SxProps;
  notSpacing?: boolean;
  handleChange?: (name: string, value: any) => void;
  multiline?: boolean;
  maxRows?: number;
  InputProps?:
    | React.ReactElement<any, any>
    | {
        endAdornment: JSX.Element | null;
      }
    | { readOnly: true | false };
}

export const FormInput = (props: IProps) => {
  const {
    control,
    sx,
    name,
    label,
    size = 'small',
    disabled = false,
    variant = 'outlined',
    inputBase = false,
    margin = 'dense',
    type = 'text',
    showClearable = false,
    required = false,
    notSpacing = false,
    handleChange,
    InputProps,
    placeholder,
    multiline = false,
    maxRows = 0
  } = props;

  const [isShowPassword, setIsShowPassword] = React.useState<boolean>(false);

  const handleClickShowPassword = () => {
    setIsShowPassword((prev) => !prev);
  };

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
  };

  return (
    <Controller
      name={name}
      rules={{
        required: {
          value: required,
          message: 'Not empty!'
        }
      }}
      control={control}
      render={({ field: { value, onChange }, fieldState: { error, invalid } }) => (
        <FormControl
          required={required}
          fullWidth
          size={size}
          margin={margin}
          sx={{
            ...sx,
            '& :after': { display: inputBase ? 'none' : '' },
            '& :before': { border: inputBase ? 'none !important' : '', outline: inputBase ? 'none !important' : '' }
          }}
        >
          <TextField
            fullWidth
            multiline={multiline}
            maxRows={maxRows}
            sx={{ border: inputBase ? 'none' : '' }}
            size={size}
            type={isShowPassword ? 'text' : type}
            variant={variant}
            disabled={disabled}
            label={label}
            placeholder={placeholder}
            error={invalid}
            helperText={error ? error.message : null}
            onChange={(e) => {
              const value = notSpacing ? e.target.value.replace(/ /g, '') : e.target.value;

              onChange(value);
              if (handleChange) {
                handleChange(name, value);
              }
            }}
            value={isString(value) ? value : '' || isNumber(value) ? value : 0}
            InputProps={
              InputProps
                ? InputProps
                : {
                    endAdornment:
                      type === 'password' ? (
                        <InputAdornment position='end'>
                          <IconButton
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge='end'
                          >
                            {isShowPassword ? <Visibility /> : <VisibilityOff />}
                          </IconButton>
                        </InputAdornment>
                      ) : showClearable && Boolean(value) ? (
                        <InputAdornment position='end'>
                          <IconButton
                            onClick={() => {
                              onChange('');
                              if (handleChange) {
                                handleChange(name, '');
                              }
                            }}
                            edge='end'
                          >
                            <ClearIcon />
                          </IconButton>
                        </InputAdornment>
                      ) : null
                  }
            }
          />
        </FormControl>
      )}
    />
  );
};
