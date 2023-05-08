import React, { useEffect, useState } from 'react';
import { Box, Input, SxProps } from '@mui/material';
import { SearchRounded, Cancel, RotateRightRounded } from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';
import useDebounced from 'src/hooks/useDebounced';
import { useAppDispatch } from 'src/redux_store';
import { useTranslation } from 'react-i18next';

const SearchBar = ({
  actionThunk,
  setResult,
  setNote,
  placeholder,
  param = {},
  sx
}: {
  actionThunk: any;
  setResult: (result: any[]) => void;
  setNote: (note: string) => void;
  placeholder?: string;
  param?: { q?: string; [x: string]: any; limit?: number; offset?: number };
  sx?: SxProps;
}) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const [value, setValue] = useState<string>('');
  const debounced = useDebounced(value);
  const [pending, setPending] = useState<boolean>(false);

  const fetchApi = (debounced: string) => {
    setPending(true);
    if (!param.limit) {
      param.limit = 15;
      param.offset = 0;
    }
    param.q = debounced;
    const action = actionThunk(param);
    dispatch(action)
      .unwrap()
      .then((data: any) => {
        setPending(false);
        const { users } = data;
        if (users) {
          setResult(users);
        }
        if (users.length == 0) {
          setNote(t('search.noAccount'));
        }
      })
      .catch((e: any) => {
        console.log(e);
        setNote(t('toast.sometimeError'));
        setResult([]);
      });
  };
  useEffect(() => {
    if (debounced) fetchApi(debounced);
  }, [debounced]);
  useEffect(() => {
    setNote('');
    if (value.trim() === '') {
      setResult([]);
    }
  }, [value]);
  return (
    <Box
      borderRadius={2}
      p={1}
      bgcolor='#efefef'
      display={'flex'}
      alignItems='center'
      justifyContent={'space-between'}
      sx={sx}
    >
      <SearchRounded sx={{ color: '#c5c5c5', marginRight: 1 }} fontSize='small' />
      <Input
        value={value}
        fullWidth
        disableUnderline
        sx={{ fontSize: 14 }}
        placeholder={placeholder || 'search'}
        onChange={(e) => {
          const val = e.target.value;
          setValue(val.trim());
        }}
      />
      <IconButton
        onClick={() => {
          setValue('');
        }}
      >
        {value !== '' &&
          (!pending ? (
            <Cancel sx={{ color: '#c5c5c5' }} fontSize='small' />
          ) : (
            <RotateRightRounded
              fontSize='small'
              sx={{
                '@keyframes rotate': {
                  from: { transform: 'rotate(0)' },
                  to: { transform: 'rotate(360deg)' }
                },
                transformOrigin: 'center',
                // transform: 'rotate(360deg)',
                animation: 'rotate .4s linear infinite'
              }}
            />
          ))}
      </IconButton>
    </Box>
  );
};

export default SearchBar;
