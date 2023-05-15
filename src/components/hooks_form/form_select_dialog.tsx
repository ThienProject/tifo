import React, { useState } from 'react';
import {
  CircularProgress,
  Divider,
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

export const FormSelectDialog = (props: IProps) => {
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
      <option
        value={option[keyOption]}
        disabled={optionsDisabled.includes(option[keyOption]) && value !== option[keyOption]}
        key={index}
      >
        {deleteOption ? (
          <>
            <ListItemText primary={option[labelOption]} />
            {renderDeleteIcon(value, option)}
          </>
        ) : (
          option[labelOption]
        )}
      </option>
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
              fontSize: 13,
              fontWeight: '600',
              color: 'text.secondary',
              pb: label ? 0.5 : 0
            }}
          >
            {label}
          </FormLabel>

          <select
            // label={label}
            style={{ padding: 10, outline: 'none' }}
            value={options.length ? value || '' : ''}
            onChange={(e) => {
              if (_.isEqual(value, e.target.value) || loading) return;
              onChange(e);
              if (handleChange) {
                handleChange(name, e.target.value);
              }
            }}
            // placeholder={placeholder}
          >
            {renderOptions(value)}
          </select>
          {invalid && <FormHelperText>{error?.message}</FormHelperText>}
        </FormControl>
      )}
    />
  );
};
