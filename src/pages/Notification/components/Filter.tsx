import { Box, Button } from '@mui/material';
import React from 'react';
import FormRadio from 'src/components/hooks_form/form_radio';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { FormSelectDialog } from 'src/components/hooks_form/form_select_dialog';
import { IPayloadNoti } from 'src/types/notification';
const defaultFilter = {
  category: 'all',
  sort: 'desc',
  time: 'all'
};

const Filter = ({
  setParams,
  setIsOpenFilter
}: {
  setParams: React.Dispatch<React.SetStateAction<IPayloadNoti>>;
  setIsOpenFilter: any;
}) => {
  const { t } = useTranslation();
  const { handleSubmit, control } = useForm({ defaultValues: defaultFilter });
  const optionCategories = [
    {
      category: 'comments',
      label: t('notification.comments')
    },
    {
      category: 'follows',
      label: t('notification.follows')
    },
    {
      category: 'all',
      label: t('notification.all')
    }
  ];
  const handleOnSubmit = (data: any) => {
    setParams((prev) => {
      const newParams = { ...prev, ...data };
      newParams.offset = 0;
      newParams.limit = 10;
      return newParams;
    });
    setIsOpenFilter(false);
  };
  return (
    <Box component={'form'} onSubmit={handleSubmit(handleOnSubmit)} p={2}>
      <FormRadio
        label={t('notification.category')!}
        name='category'
        options={optionCategories}
        keyOption='category'
        labelOption={'label'}
        control={control}
      />
      <FormSelectDialog
        keyOption='time'
        labelOption='label'
        options={[
          {
            time: 'today',
            label: t('notification.today')
          },
          {
            time: 'week',
            label: t('notification.thisWeek')
          },
          {
            time: 'month',
            label: t('notification.thisMonth')
          },
          {
            time: 'year',
            label: t('notification.thisYear')
          },
          {
            time: 'all',
            label: t('notification.all')
          }
        ]}
        label={t('notification.time')!}
        control={control}
        name='time'
      />
      <FormRadio
        label={t('notification.sort')!}
        name='sort'
        options={[
          {
            sort: 'desc',
            label: t('notification.desc')
          },
          {
            sort: 'asc',
            label: t('notification.asc')
          }
        ]}
        keyOption='sort'
        labelOption={'label'}
        control={control}
      />
      <Button fullWidth sx={{ color: '#fff' }} variant='contained' type='submit'>
        {t('button.apply')}
      </Button>
    </Box>
  );
};

export default Filter;
