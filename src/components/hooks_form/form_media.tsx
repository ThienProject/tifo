import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  FormControl,
  SxProps,
  Typography,
  Button,
  FormHelperText,
  Divider,
  Stack
} from '@mui/material';
import React from 'react';
import { Controller } from 'react-hook-form';
import {
  ChangeCircleOutlined,
  DeleteForeverOutlined,
  AddToPhotosRounded,
  DeleteSweepRounded,
  SettingsSuggestRounded
} from '@mui/icons-material';
import MenuOption from 'src/components/MenuOption';
import { IMedia } from 'src/types/post';
import { CPath } from 'src/constants';
import { toastMessage } from 'src/utils/toast';
interface IProp {
  control: any;
  sx?: SxProps;
  handleChange?: (name: string, value: any) => void;
  handleReplaceMedia?: (id_media: string, media_link: string, value: any) => void;
  handleDeleteMedia?: (deletes: { id_media: string; media_link: any }[]) => void;
  required?: boolean;
  disabled?: boolean;
  label?: string;
  name: string;
  accept: string;
  multiple: boolean;
  maxFiles?: number;
}
const Media = (prop: IProp) => {
  const {
    accept,
    multiple,
    handleChange,
    handleDeleteMedia,
    handleReplaceMedia,
    control,
    required = false,
    name,
    sx,
    maxFiles = 5
  } = prop;
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
        <>
          <FormControl required={required} sx={sx} fullWidth error={invalid}>
            <Stack direction={'row'}>
              {value.length <= maxFiles && (
                <Box>
                  <input
                    style={{ display: 'none' }}
                    multiple={multiple}
                    id={'upload' + name}
                    type={'file'}
                    accept={accept}
                    value={[]}
                    onChange={(e) => {
                      const files = e.target.files;
                      if (files && value.length + files.length > maxFiles) {
                        toastMessage.error(
                          'Only select maximum is ' + maxFiles + ' files, already have ' + value.length
                        );
                      } else {
                        if (files && files.length > 0) {
                          let newFileList: File[] = Array.from(files);
                          newFileList = newFileList.map((file: File) => {
                            const date = new Date();
                            const timestamp = date.getTime();
                            const newName = `file_${timestamp + file.name}`;
                            return new File([file], newName, { type: file.type });
                          });
                          const allFiles = multiple ? [...value, ...newFileList] : newFileList;
                          onChange(allFiles);
                        }
                      }
                      if (handleChange) {
                        handleChange(name, value);
                      }
                    }}
                  />
                  <label htmlFor={'upload' + name}>
                    <Button variant='text' component='span'>
                      <AddToPhotosRounded fontSize='medium' />
                      <Typography
                        textTransform={'capitalize'}
                        pl={2}
                        fontSize={13}
                        fontWeight={100}
                        color='text.secondary'
                      >
                        Add media
                      </Typography>
                    </Button>
                  </label>
                </Box>
              )}
              {value && value.length > 0 && (
                <Button
                  sx={{ ml: 2 }}
                  color='error'
                  variant='text'
                  onClick={() => {
                    if (handleDeleteMedia) {
                      const mediasDle = value.map((item: IMedia) => {
                        if (item.id_media) {
                          return {
                            id_media: item.id_media,
                            media_link: item.media_link
                          };
                        }
                      });
                      handleDeleteMedia(mediasDle);
                    }
                    onChange([]);
                  }}
                >
                  <DeleteSweepRounded fontSize='medium' />
                  <Typography textTransform={'capitalize'} pl={2} fontSize={13} fontWeight={100} color='text.secondary'>
                    Clear all
                  </Typography>
                </Button>
              )}
            </Stack>
            <Divider sx={{ mt: 1 }} />
            <FormHelperText>{(invalid && error?.message) || (Array.isArray(error) && error[0].message)}</FormHelperText>
            {Array.from(value)?.map((itemValue: any) => {
              const url = itemValue.media_link
                ? `${CPath.host_public}${itemValue.media_link}`
                : URL.createObjectURL(itemValue);
              return (
                <Card key={itemValue.name || itemValue.id_media} sx={{ my: 2 }}>
                  <CardActionArea>
                    <CardMedia
                      component={itemValue.type.startsWith('video') ? 'video' : 'img'}
                      alt={itemValue.name || itemValue.id_media}
                      height='240'
                      src={url}
                      title={itemValue.type}
                      controls
                    />
                  </CardActionArea>
                  <CardContent>
                    <input
                      id={'file-change' + (itemValue.name || itemValue.id_media)}
                      accept={accept}
                      style={{ display: 'none' }}
                      type={'file'}
                      onChange={(e) => {
                        const indexDlt = value.indexOf(itemValue);
                        const fileNew: any = e.target.files ? e.target.files[0] : {};
                        if (fileNew) {
                          const date = new Date();
                          const timestamp = date.getTime();
                          const newName = `file_${timestamp + fileNew.name}`;
                          value[indexDlt] = new File([fileNew], newName, { type: fileNew.type });
                          value.length > 0 && onChange(value);
                        }
                        if (handleChange) {
                          handleChange(name, value);
                        }
                        if (handleReplaceMedia) {
                          if (itemValue.id_media) {
                            handleReplaceMedia(itemValue.id_media, itemValue.media_link, value[indexDlt]);
                          }
                        }
                      }}
                    />
                    <MenuOption
                      transformOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                      anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                      icon={<SettingsSuggestRounded />}
                      options={[
                        {
                          element: (
                            <label
                              style={{ display: 'block' }}
                              key={1}
                              htmlFor={'file-change' + (itemValue.name || itemValue.id_media)}
                            >
                              <Button sx={{ p: 0 }} variant='text' component='span'>
                                <ChangeCircleOutlined fontSize='medium' />
                                <Typography pl={2} fontSize={13} fontWeight={100} color='text.secondary'>
                                  Change Media
                                </Typography>
                              </Button>
                            </label>
                          )
                        },
                        {
                          element: (
                            <Button
                              key={2}
                              sx={{ p: 0, justifyContent: 'flex-start' }}
                              color='error'
                              variant='text'
                              fullWidth
                            >
                              <DeleteForeverOutlined fontSize='medium' />
                              <Typography pl={2} fontSize={13} fontWeight={100} color='text.secondary'>
                                Delete
                              </Typography>
                            </Button>
                          ),
                          handleClick: () => {
                            const indexDlt = value.indexOf(itemValue);
                            value.splice(indexDlt, 1);
                            onChange(value);
                            if (handleDeleteMedia) {
                              if (itemValue.id_media) {
                                handleDeleteMedia([{ id_media: itemValue.id_media, media_link: itemValue.media_link }]);
                              }
                            }
                          }
                        }
                      ]}
                    />
                  </CardContent>
                </Card>
              );
            })}
          </FormControl>
        </>
      )}
    />
  );
};

export default Media;
