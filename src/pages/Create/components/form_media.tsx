import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  FormControl,
  IconButton,
  Menu,
  MenuItem,
  SxProps,
  Typography,
  Button,
  FormHelperText,
  Divider
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
import { display } from '@mui/system';
interface IProp {
  control: any;
  sx?: SxProps;
  handleChange?: (name: string, value: any) => void;
  required?: boolean;
  disabled?: boolean;
  label?: string;
  name: string;
}
const Media = (prop: IProp) => {
  const { handleChange, control, required = false, disabled, label, name, sx } = prop;

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
        <FormControl required={required} sx={sx} fullWidth error={invalid}>
          <Box>
            <input
              style={{ display: 'none' }}
              id={'upload' + name}
              type={'file'}
              accept={'video/*, image/*'}
              value={[]}
              multiple
              onChange={(e) => {
                const files = e.target.files;
                if (files && files.length > 0) {
                  let newFileList: File[] = Array.from(files);
                  newFileList = newFileList.map((file: File) => {
                    const date = new Date();
                    const timestamp = date.getTime();
                    const newName = `file_${file.name + timestamp}.jpg`;
                    return new File([file], newName, { type: file.type });
                  });
                  onChange([...value, ...newFileList]);
                }

                if (handleChange) {
                  handleChange(name, value);
                }
              }}
            />
            <label htmlFor={'upload' + name}>
              <Button variant='text' component='span'>
                <AddToPhotosRounded fontSize='medium' />
                <Typography pl={2} fontSize={13} fontWeight={100} color='text.secondary'>
                  Add Media
                </Typography>
              </Button>
            </label>
            {value.length > 0 && (
              <Button
                sx={{ ml: 2 }}
                color='error'
                variant='text'
                onClick={() => {
                  onChange([]);
                }}
              >
                <DeleteSweepRounded fontSize='medium' />
                <Typography pl={2} fontSize={13} fontWeight={100} color='text.secondary'>
                  Clear All
                </Typography>
              </Button>
            )}
          </Box>
          <Divider sx={{ mt: 1 }} />
          {Array.from(value)?.map((itemValue: any, index: number) => {
            const url = URL.createObjectURL(itemValue);
            console.log(value);
            return (
              <Card key={itemValue.name} sx={{ my: 2 }}>
                <CardActionArea>
                  <CardMedia
                    component={itemValue.type === 'video/mp4' ? 'video' : 'img'}
                    alt='Video'
                    height='240'
                    src={url}
                    title='Video'
                    controls
                  />
                </CardActionArea>
                <CardContent>
                  <input
                    id={'file-change' + itemValue.name}
                    accept={'video/*, image/*'}
                    style={{ display: 'none' }}
                    type={'file'}
                    multiple
                    onChange={(e) => {
                      const indexDlt = value.indexOf(itemValue);
                      const fileNew: any = e.target.files ? e.target.files[0] : {};
                      if (fileNew) {
                        const date = new Date();
                        const timestamp = date.getTime();
                        const newName = `file_${fileNew.name + timestamp}.jpg`;
                        value[indexDlt] = new File([fileNew], newName, { type: fileNew.type });
                        value.length > 0 && onChange(value);
                      }
                      if (handleChange) {
                        handleChange(name, value);
                      }
                    }}
                  />
                  <MenuOption
                    icon={<SettingsSuggestRounded />}
                    options={[
                      <label style={{ display: 'block' }} key={1} htmlFor={'file-change' + itemValue.name}>
                        <Button sx={{ p: 0 }} variant='text' component='span'>
                          <ChangeCircleOutlined fontSize='medium' />
                          <Typography pl={2} fontSize={13} fontWeight={100} color='text.secondary'>
                            Change Media
                          </Typography>
                        </Button>
                      </label>,
                      <Button
                        key={2}
                        sx={{ p: 0 }}
                        color='error'
                        variant='text'
                        onClick={() => {
                          const indexDlt = value.indexOf(itemValue);
                          value.splice(indexDlt, 1);
                          console.log(value);
                          onChange(value);
                        }}
                      >
                        <DeleteForeverOutlined fontSize='medium' />
                        <Typography pl={2} fontSize={13} fontWeight={100} color='text.secondary'>
                          Delete
                        </Typography>
                      </Button>
                    ]}
                  />
                </CardContent>
              </Card>
            );
          })}

          {invalid && <FormHelperText>{error?.message}</FormHelperText>}
        </FormControl>
      )}
    />
  );
};

export default Media;