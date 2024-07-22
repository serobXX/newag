import { useMediaQuery } from '@mui/material';
import { Control, FieldValues, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useTheme } from 'styled-components';

import Button from '~components/buttons/Button/Button';
import { InputField } from '~components/fields/InputField/InputField';
import { RadioGroupField } from '~components/fields/RadioGroupField/RadioGroupField';
import { TBlog, useCreateApp } from '~hooks/create-app';

import { AlertWrapper, FormText, InputFieldWrapper, SaveButtonWrapper } from './styles';
import { useMixpanel } from 'react-mixpanel-browser';

type TProps = {
  onSubmit: () => void;
};

export const BlogForm = ({ onSubmit }: TProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints['--mobile']);
  const { t } = useTranslation();
  const { blog, setBlog } = useCreateApp();
  const mixpanel = useMixpanel()
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      url: blog?.url || '',
      blogType: blog?.blogType || 'wordpress',
      enablePushNotifications: blog?.enablePushNotifications || false,
    },
  });
  const formErrors = Object.entries(errors).filter(([, { type }]) => type !== 'pattern');

  const onSubmit_ = ({ url, blogType, enablePushNotifications }: TBlog) => {
    setBlog((prev) => ({
      url: url || prev?.url || '',
      blogType: blogType || prev?.blogType || 'wordpress',
      enablePushNotifications,
    }));
    onSubmit();
    mixpanel.track('Cr3TypeBlog')
    mixpanel.track('Cr3EnterUrlBlog')
    mixpanel.track('Cr3EnterUrlBlog')

  };

  const handleReset = () => {
    setBlog(null);
    reset();
    onSubmit();
  };

  return (
    <>
      <FormText Component='h3' variant='m-400' color='middleGrey' $isMobile={isMobile}>
        {t('blog-form-text')}
      </FormText>
      {!!formErrors.length && (
        <AlertWrapper
          $isMobile={isMobile}
          color='error'
          text={`${t('create-app-error')}: ${Object.keys(errors).join(', ')}`}
        />
      )}
      <InputFieldWrapper $isMobile={isMobile}>
        <RadioGroupField
          control={control as unknown as Control<FieldValues>}
          name='blogType'
          label={t('blog-type-label')}
          message={errors.blogType?.message}
          type={errors.blogType?.type}
          padding={isMobile ? '10px 0 12px' : undefined}
          options={[
            { value: 'wordpress', label: 'Wordpress blog' },
            { value: 'blogger', label: 'Blogger blog' },
            { value: 'tumblr', label: 'Tumblr blog' },
            { value: 'pinterest', label: 'Pinterest feed' },
            { value: 'rss', label: 'Direct RSS link' },
          ]}
        />
      </InputFieldWrapper>
      <InputFieldWrapper $isMobile={isMobile}>
        <InputField
          label={t('blog-url-label')}
          message={errors.url?.message}
          type={errors.url?.type}
          placeholder='https://'
          padding={isMobile ? '10px 0 12px' : undefined}
          {...register('url', {
            required: t('blog-url-message'),
            pattern: {
              value:
                /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\\+.~#?&\\/=]*)$/,
              message: t('url-pattern-message'),
            },
          })}
        />
      </InputFieldWrapper>
      <SaveButtonWrapper $isMobile={isMobile}>
        {!!blog && (
          <Button
            onClick={handleReset}
            width={isMobile ? '100%' : 250}
            variant='quaternary'
            backgroundColor='transparent'
            color='supportiveDodoria10'
          >
            {t('delete')}
          </Button>
        )}
        <Button onClick={handleSubmit(onSubmit_)} width={isMobile ? '100%' : 250}>
          {t('save')}
        </Button>
      </SaveButtonWrapper>
    </>
  );
};
