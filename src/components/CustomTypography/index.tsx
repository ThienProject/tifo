import { Box, Button, Typography, TypographyProps } from '@mui/material';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const CustomTypography = ({ text, max = 50, ...props }: { text: string; max: number } & TypographyProps) => {
  const [showMore, setShowMore] = useState(false);
  const { t } = useTranslation();
  const [isShowButton] = useState(() => {
    return text.length > max;
  });
  const truncatedText = text.substr(0, max);
  return (
    <Box>
      {isShowButton ? (
        <Box>
          <>
            {showMore ? (
              <Typography {...props}>{text}</Typography>
            ) : (
              <Typography {...props}>{truncatedText}...</Typography>
            )}
          </>
          <Button
            sx={{
              textTransform: 'capitalize',
              p: 0,
              justifyContent: 'flex-start',
              fontWeight: '600',
              fontSize: 11,
              color: 'text.secondary'
            }}
            onClick={() => setShowMore(!showMore)}
          >
            {showMore ? t('button.seeLess') : t('button.seeMore')}
          </Button>
        </Box>
      ) : (
        <Typography {...props}>{text}</Typography>
      )}
    </Box>
  );
};

export default CustomTypography;
