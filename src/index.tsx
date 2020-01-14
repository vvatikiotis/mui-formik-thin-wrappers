import React from 'react';
import { FieldProps } from 'formik';
import TextField, { TextFieldProps } from '@material-ui/core/TextField';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectProps,
  FormLabel,
  FormControlLabel,
  RadioGroup,
  Radio,
  FormGroup,
  Checkbox,
  RadioGroupProps,
  FormGroupProps,
  Switch,
  Slider,
  SliderProps,
} from '@material-ui/core';
// import invariant from 'tiny-warning';

// interface IProps extends FieldProps, TextFieldProps {

// }

/**
 * Thin wrapper around MUI TextField
 */
export const TextFormField: React.FC<FieldProps & TextFieldProps> = ({
  field,
  form,
  ...props
}) => {
  const { errors, touched } = form;
  const errorText = touched && errors[field.name];
  // console.log('TextFormField', { field, props });

  return (
    <TextField
      error={!!errorText}
      helperText={!!errorText ? errorText : null}
      {...props}
      {...field}
    />
  );
};

interface ISelectFormField extends FieldProps, SelectProps {
  label?: string | React.ReactNode;
  formControlProps?: object;
  inputLabelProps?: object;
  options?: Array<{ label: string; value: string }>;
}

/**
 * Composite component: wrapper around MUI Select
 * <FormControl ... >
 *    <InputLabel />
 *    <Select />
 * </FormControl>
 */
export const SelectFormField: React.FC<ISelectFormField> = ({
  field,
  form,
  formControlProps = {},
  inputLabelProps = {},
  label,
  options,
  children,
  ...props
}) => {
  const { errors, touched } = form;
  const errorText = touched && errors[field.name];

  if (children && options) {
    throw new Error(
      'SelectFormField() :: cannot specify both `children` and `options`'
    );
  }

  // we render children as is, we map options to MenuItems
  let inner;
  if (children && !options) inner = children;
  else if (!children && options)
    inner = options.map(o => (
      <MenuItem key={o.value} value={o.value}>
        {o.label}
      </MenuItem>
    ));

  return (
    <FormControl {...formControlProps} error={!!errorText}>
      {label && <InputLabel {...inputLabelProps}>{label}</InputLabel>}
      <Select {...props} {...field}>
        {inner}
      </Select>
    </FormControl>
  );
};

interface IRadioGroupFormField extends FieldProps, RadioGroupProps {
  label?: string | React.ReactNode;
  formControlProps?: object;
  formLabelProps?: object;
  group?: Array<{ value: string; label: string; disabled?: boolean }>;
}

/**
 * Composite component: wrapper around MUI RadioGroup
 * <FormControl ... >
 *    <FormLabel />
 *    <RadioGroup />
 * </FormControl>
 */
export const RadioGroupFormField: React.FC<IRadioGroupFormField> = ({
  field,
  form,
  label,
  formControlProps = {},
  formLabelProps = {},
  children,
  group,
  ...props
}) => {
  if (children && group) {
    throw new Error(
      'RadioGroupFormField() :: cannot specify both `children` and `group`'
    );
  }

  let inner;
  if (children && !group) inner = children;
  else if (!children && group)
    inner = group.map((item, index) => (
      <FormControlLabel
        key={`${item}-${index}`}
        label={item.label}
        value={item.value}
        disabled={Boolean(item.disabled)}
        control={<Radio />}
      />
    ));

  // console.log({ field });
  return (
    <FormControl component="fieldset" {...formControlProps}>
      {label && (
        <FormLabel component="legend" {...formLabelProps}>
          {label}
        </FormLabel>
      )}
      <RadioGroup {...props} {...field}>
        {inner}
      </RadioGroup>
    </FormControl>
  );
};

interface ICheckboxGroupFormField extends FieldProps, FormGroupProps {
  label?: string | React.ReactNode;
  formControlProps?: object;
  formLabelProps?: object;
  group?: Array<{ value: string; label: string; disabled?: boolean }>;
}
/**
 * Composite component: wrapper around MUI FormGroup
 * <FormControl ... >
 *    <FormLabel />
 *    <FormGroup>
 *      <FormControlLabel control={<Checkbox />} />
 *      <FormControlLabel control={<Checkbox />} />
 *  *    </FormGroup>
 * </FormControl>
 */
export const CheckboxGroupFormField: React.FC<ICheckboxGroupFormField> = ({
  field,
  form,
  label,
  formControlProps = {},
  formLabelProps = {},
  children,
  group,
  ...props
}) => {
  // const { errors, touched } = form;
  console.log('====', { field, children });
  if (children && group) {
    throw new Error(
      'CheckboxGroupFormField() :: cannot specify both `children` and `group`'
    );
  }

  let inner;
  if (children && !group) {
    inner = children;
  } else if (!children && group)
    inner = group.map((item, index) => {
      return (
        <FormControlLabel
          key={`${item}-${index}`}
          label={item.label}
          control={
            <Checkbox
              {...field}
              value={item.value}
              checked={field.value.includes(item.value)}
              disabled={Boolean(item.disabled)}
            />
          }
        />
      );
    });

  return (
    <FormControl component="fieldset" {...formControlProps}>
      {label && (
        <FormLabel component="legend" {...formLabelProps}>
          {label}
        </FormLabel>
      )}
      <FormGroup {...props}>{inner}</FormGroup>
    </FormControl>
  );
};

interface ISwitchFormField extends FieldProps {
  label?: string | React.ReactNode;
  formControlLabelProps?: object;
}

export const SwitchFormField: React.FC<ISwitchFormField> = ({
  field,
  form,
  label,
  formControlLabelProps,
  ...props
}) => {
  return (
    <FormControlLabel
      label={label}
      {...formControlLabelProps}
      control={<Switch checked={Boolean(field.value)} {...field} {...props} />}
    />
  );
};

export const SliderFormField: React.FC<FieldProps & SliderProps> = ({
  field,
  form,
  ...props
}) => {
  return <Slider {...props} {...field} />;
};
