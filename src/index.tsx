import React from 'react';
import { FieldProps } from 'formik';
import TextField, { TextFieldProps } from '@material-ui/core/TextField';
import FormControl, { FormControlProps } from '@material-ui/core/FormControl';
import InputLabel, { InputLabelProps } from '@material-ui/core/InputLabel';
import Select, { SelectProps } from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormLabel, { FormLabelProps } from '@material-ui/core/FormLabel';
import FormControlLabel, {
  FormControlLabelProps,
} from '@material-ui/core/FormControlLabel';
import RadioGroup, { RadioGroupProps } from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import FormGroup, { FormGroupProps } from '@material-ui/core/FormGroup';
import Checkbox from '@material-ui/core/Checkbox';
import Switch from '@material-ui/core/Switch';
import Input from '@material-ui/core/Input';
import FormHelperText, {
  FormHelperTextProps,
} from '@material-ui/core/FormHelperText';
import Slider, { SliderProps } from '@material-ui/core/Slider';
import ReactNumberFormat, { NumberFormatProps } from 'react-number-format';
// import invariant from 'tiny-warning';

// Thin wrapper around MUI TextField
export const TextFormField: React.FC<FieldProps & TextFieldProps> = ({
  field,
  form,
  ...props
}) => {
  const { errors, touched } = form;
  const { name } = field;
  const errorText = touched[name] && errors[name];

  return (
    <TextField
      id={name}
      {...props}
      {...field}
      error={!!errorText}
      helperText={!!errorText ? errorText : null}
    />
  );
};
interface INumberFormatWrapperProps extends NumberFormatProps {
  name: string;
  setFieldValue: (name: string, value: any) => void;
}

const NumberFormat: React.FC<INumberFormatWrapperProps> = ({
  name,
  setFieldValue,
  ...props
}) => {
  // NOTE: we don't use the onChange handler since this gets the formatted value
  // (including prefixes, signs etc). However we need the "raw" value (value or
  // floatValue), so we use onValueChange

  return (
    <ReactNumberFormat
      {...props}
      name={name}
      value={props.value}
      onValueChange={({ value, floatValue }) => {
        const rawValue = props.isNumericString ? value : floatValue;
        setFieldValue(name, rawValue);
      }}
    />
  );
};

interface INumberFormField extends FieldProps {
  label?: string | React.ReactNode;
  required?: boolean;
  inputLabelProps?: InputLabelProps;
  formControlProps?: FormControlProps;
  formHelperTextProps?: FormHelperTextProps;
  reactNumberFormatProps?: NumberFormatProps;
}
// Thin wrapper around  NumberFormField
export const NumberFormField: React.FC<INumberFormField> = ({
  field,
  form,
  label,
  required = false,
  inputLabelProps = {},
  formControlProps = {},
  formHelperTextProps = {},
  reactNumberFormatProps = {},
  ...props
}) => {
  const defaultReactNumberFormatProps = {
    allowNegative: false,
    decimalScale: 2,
    decimalSeparator: ',',
    thousandSeparator: '.',
    allowEmptyFormatting: false,
    isNumericString: false,
  };
  const { errors, touched } = form;
  const { name, value } = field;
  const errorText = touched[name] && errors[name];
  const emptyValue = value === '' || value === undefined || value === null;

  const _rnfProps = {
    ...defaultReactNumberFormatProps,
    ...reactNumberFormatProps,
    name,
    setFieldValue: form.setFieldValue,
    value: field.value,
  };

  return (
    <FormControl {...formControlProps} error={!!errorText}>
      {label && (
        <InputLabel
          {...inputLabelProps}
          error={!!errorText}
          htmlFor={name}
          shrink={!emptyValue}
          required={required}
        >
          {label}
        </InputLabel>
      )}
      <Input
        id={name}
        inputComponent={() => <NumberFormat {..._rnfProps} />}
        {...props}
        {...field}
        onChange={() => {}} // NOTE: we mask Formik's onChange since we use setFieldValue
        error={!!errorText}
      />

      {errorText && (
        <FormHelperText {...formHelperTextProps} error>
          {!!errorText ? errorText : null}
        </FormHelperText>
      )}
    </FormControl>
  );
};

interface ISelectFormFieldProps extends FieldProps, SelectProps {
  label?: string | React.ReactNode;
  formControlProps?: object;
  inputLabelProps?: object;
  formHelperTextProps?: object;
  options?: Array<{ label: string; value: string }>;
}

/**
 * Composite component: wrapper around MUI Select
 * <FormControl ... >
 *    <InputLabel />
 *    <Select />
 * </FormControl>
 */
export const SelectFormField: React.FC<ISelectFormFieldProps> = ({
  field,
  form,
  label,
  required = false,
  options,
  children,
  formControlProps = {},
  inputLabelProps = {},
  formHelperTextProps = {},
  ...props
}) => {
  const { errors, touched } = form;
  const { name, value } = field;
  const errorText = touched[name] && errors[name];
  const emptyValue = value === '' || value === undefined || value === null;

  if (children && options) {
    throw new Error(
      'SelectFormField() :: cannot specify both `children` and `options`'
    );
  }

  let inner;
  if (children && !options) inner = children;
  else if (!children && options)
    inner = options.map(option => {
      const { label, value, ...restMenuItem } = option;

      return (
        <MenuItem value={value} {...restMenuItem} key={value}>
          {label}
        </MenuItem>
      );
    });

  return (
    <FormControl {...formControlProps} error={!!errorText}>
      {label && (
        <InputLabel
          {...inputLabelProps}
          htmlFor={name}
          required={required}
          shrink={!emptyValue}
        >
          {label}
        </InputLabel>
      )}
      <Select id={name} {...props} {...field}>
        {inner}
      </Select>

      {errorText && (
        <FormHelperText {...formHelperTextProps} error>
          {!!errorText ? errorText : null}
        </FormHelperText>
      )}
    </FormControl>
  );
};

interface IRadioGroupFormFieldProps extends FieldProps, RadioGroupProps {
  label?: string | React.ReactNode;
  required?: boolean;
  group?: Array<{ value: string; label: string; disabled?: boolean }>;
  formLabelProps?: FormLabelProps;
  formControlProps?: FormControlProps;
  formHelperTextProps?: FormHelperTextProps;
}

/**
 * Composite component: wrapper around MUI RadioGroup
 * <FormControl ... >
 *    <FormLabel />
 *    <RadioGroup />
 * </FormControl>
 */
export const RadioGroupFormField: React.FC<IRadioGroupFormFieldProps> = ({
  field,
  form,
  label,
  required = false,
  children,
  group,
  formControlProps = {},
  formLabelProps = {},
  formHelperTextProps = {},
  ...props
}) => {
  const { errors, touched } = form;
  const { name } = field;
  const errorText = touched[name] && errors[name];

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

  // Workaround because TS barfs on this
  const _formControlProps = {
    component: 'fieldset',
    ...formControlProps,
  };

  const _formLabelProps = {
    component: 'legend',
    ...formLabelProps,
  };

  return (
    <FormControl {..._formControlProps} error={!!errorText}>
      {label && (
        <FormLabel {..._formLabelProps} required={required}>
          {label}
        </FormLabel>
      )}
      <RadioGroup {...props} {...field}>
        {inner}
      </RadioGroup>

      {errorText && (
        <FormHelperText {...formHelperTextProps} error>
          {!!errorText ? errorText : null}
        </FormHelperText>
      )}
    </FormControl>
  );
};

interface ICheckboxGroupFormFieldProps extends FieldProps, FormGroupProps {
  label?: string | React.ReactNode;
  required?: boolean;
  group?: Array<{ value: string; label: string; disabled?: boolean }>;
  formControlProps?: FormControlProps;
  formLabelProps?: FormLabelProps;
  formHelperTextProps?: FormHelperTextProps;
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
export const CheckboxGroupFormField: React.FC<ICheckboxGroupFormFieldProps> = ({
  field,
  form,
  label,
  required = false,
  children,
  group,
  formControlProps = {},
  formLabelProps = {},
  formHelperTextProps = {},
  ...props
}) => {
  const { errors, touched } = form;
  const { name } = field;
  const errorText = touched[name] && errors[name];

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
          key={`${item.value}-${index}`}
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

  // Workaround because TS barfs on this
  const _formControlProps = {
    component: 'fieldset',
    ...formControlProps,
  };

  const _formLabelProps = {
    component: 'legend',
    ...formLabelProps,
  };

  return (
    <FormControl {..._formControlProps} error={!!errorText}>
      {label && (
        <FormLabel {..._formLabelProps} required={required}>
          {label}
        </FormLabel>
      )}
      <FormGroup {...props}>{inner}</FormGroup>

      {errorText && (
        <FormHelperText {...formHelperTextProps} error>
          {!!errorText ? errorText : null}
        </FormHelperText>
      )}
    </FormControl>
  );
};

interface ISwitchFormFieldProps extends FieldProps {
  label?: string | React.ReactNode;
  formControlLabelProps?: FormControlLabelProps;
}

// Thin wrapper around SwitchFormField
export const SwitchFormField: React.FC<ISwitchFormFieldProps> = ({
  field,
  form,
  label,
  formControlLabelProps = {},
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

// Thin wrapper around SliderFormField
export const SliderFormField: React.FC<FieldProps & SliderProps> = ({
  field,
  form,
  ...props
}) => {
  return <Slider {...props} {...field} />;
};
