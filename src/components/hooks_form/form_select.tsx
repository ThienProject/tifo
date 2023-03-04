import React, { useState } from 'react';
import {
  CircularProgress,
  FormControl,
  FormHelperText,
  FormLabel,
  IconButton,
  ListItemText,
  MenuItem,
  Select,
  SxProps
} from '@mui/material';
import { ClearOutlined } from '@mui/icons-material';
import _ from 'lodash';
import { Controller } from 'react-hook-form';
import Loading from '../loading';

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

export const FormSelect = (props: IProps) => {
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

  const [deletingId, setDeletingId] = useState(null);

  const renderDeleteIcon = (value: string, option: any) => {
    if (!deleteOption || option[keyOption] === value || option[keyOption] === 'all') return null;
    if (deleteOption.isDeleting && deletingId === option[keyOption]) return <CircularProgress size={22} />;

    return (
      <IconButton
        size='small'
        onClick={(e) => {
          e.stopPropagation();
          deleteOption.onDelete(option[keyOption]);
          setDeletingId(option[keyOption]);
        }}
      >
        <ClearOutlined fontSize='small' />
      </IconButton>
    );
  };

  const renderOptions = (value: string) => {
    if (loading) {
      return <Loading marginTop={1} />;
    }

    if (options.length === 0) {
      return <MenuItem disabled>No selected</MenuItem>;
    }

    return options.map((option, index) => (
      <MenuItem
        key={index}
        disabled={optionsDisabled.includes(option[keyOption]) && value !== option[keyOption]}
        value={option[keyOption]}
      >
        {deleteOption ? (
          <>
            <ListItemText primary={option[labelOption]} />
            {renderDeleteIcon(value, option)}
          </>
        ) : (
          option[labelOption]
        )}
      </MenuItem>
    ));
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { value, onChange }, fieldState: { error, invalid } }) => (
        <FormControl sx={sx} fullWidth margin={margin} size={size} error={invalid}>
          <FormLabel
            sx={{
              fontWeight: '600',
              color: 'common.black',
              pb: label ? 0.5 : 0
            }}
          >
            {label}
          </FormLabel>

          <Select
            // label={label}
            variant={variant}
            value={options.length ? value || '' : ''}
            onChange={(e) => {
              if (_.isEqual(value, e.target.value) || loading) return;
              onChange(e);
              if (handleChange) {
                handleChange(name, e.target.value);
              }
            }}
            size={size}
            disabled={disabled}
            // placeholder={placeholder}
            displayEmpty
          >
            <MenuItem disabled value=''>
              <em>{placeholder}</em>
            </MenuItem>
            {renderOptions(value)}
          </Select>
          {invalid && <FormHelperText>{error?.message}</FormHelperText>}
        </FormControl>
      )}
    />
  );
};
