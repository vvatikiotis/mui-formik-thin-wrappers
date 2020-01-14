import React, { useState, ChangeEvent } from 'react';
import { render } from 'react-dom';
import { Formik, Form, Field, FieldArrayConfig, FieldProps } from 'formik';
import {
  TextFormField,
  SelectFormField,
  RadioGroupFormField,
  CheckboxGroupFormField,
  SwitchFormField,
  SliderFormField,
} from '../';
import * as yup from 'yup';
import {
  Typography,
  MenuItem,
  AppBar,
  Tabs,
  Tab,
  Button,
  Divider,
  FormControlLabel,
  Checkbox,
  Slider,
} from '@material-ui/core';

const schema = yup.object({
  username: yup.string().required('this is required'),
});

interface IProps {
  title?: string;
  props?: React.PropsWithChildren<object>;
}

const SVGIcon: React.FC<{ temperature: number } & React.PropsWithChildren<
  object
>> = ({ temperature }) => {
  const MAX_HEIGHT = 223;

  return (
    <svg viewBox="0 0 580 400">
      <g>
        <title>background</title>
        <rect
          fill="#fff"
          id="canvas_background"
          height="100%"
          width="100%"
          y="-1"
          x="-1"
        />
        {/* No need

        <g
          display="none"
          overflow="visible"
          y="0"
          x="0"
          height="100%"
          width="100%"
          id="canvasGrid"
        >
          <rect
            fill="url(#gridpattern)"
            stroke-width="0"
            y="0"
            x="0"
            height="100%"
            width="100%"
          />
        </g> */}
      </g>
      <g>
        <title>Layer 1</title>
        <path
          d="m50.5,59.4375c0,0 1.497555,2.925797 2,8c0.7883,7.961067 0,18 0,26c0,7 0,15 0,25c0,9 -0.457146,20.009506 0,31c0.500431,12.031189 1.276726,21.098969 3,31c0.706997,4.062042 0.63345,8.022476 1,11c0.503773,4.092209 0.847229,6.041321 2,10c0.884132,3.036163 0.617317,5.076126 1,6c0.541195,1.306564 1,2 1,4l0,1l-3,1"
          id="svg_1"
          stroke-width="1.5"
          stroke="#000"
          fill="none"
        />
        <path
          d="m40.5,180.4375c1,0 2.083981,-0.039825 3,2c2.206066,4.912567 4.147732,8.943405 6,14c2.175381,5.93866 4.471409,12.250992 8,19c4.371017,8.360275 8.237823,16.545105 12,21c5.948517,7.043808 8.881523,8.190277 12,10c1.933998,1.122345 4.038734,2.480545 7,2c3.121445,-0.506546 7.161194,-3.746399 12,-7c4.149239,-2.789948 9.609329,-7.797501 11,-13c1.826042,-6.831223 1,-14 1,-20c0,-4 0,-7 0,-10c0,-2 0,-3 0,-4c0,-1 -1,-1 -2,-2l-1,-1l-1,0"
          id="svg_2"
          stroke-width="1.5"
          stroke="#000"
          fill="none"
        />
        <path
          d="m488.5,45.4375c1,-1 2.173096,-1.14727 3,0c3.922363,5.441978 8.121857,17.967129 14,40c6.127197,22.966438 10.228699,44.965302 13,64c2.180237,14.974869 4,24 5,27l0,1l-1,0"
          id="svg_3"
          stroke-width="1.5"
          stroke="#000"
          fill="none"
        />
        <path
          d="m478.5,175.4375c1,0 5.73764,4.237381 13,12c9.661682,10.32724 19.743317,22.289825 31,32c10.761902,9.283386 17.891724,16.195755 25,20c7.885925,4.220428 10.085815,4.579575 12,4c3.450867,-1.04483 5,-6 7,-12c2,-6 3,-12 3,-18c0,-6 0.800903,-11.06456 0,-16c-1.013062,-6.242889 -3.118958,-15.215393 -5,-21c-1.382996,-4.25293 -3,-7 -4,-8c-2,-2 -3,-5 -4,-7l-1,-1"
          id="svg_4"
          stroke-width="1.5"
          stroke="#000"
          fill="none"
        />
        <rect
          id="svg_6"
          height={MAX_HEIGHT}
          width="41"
          y="37.4375"
          x="234.5"
          stroke-width="1.5"
          stroke="#000"
          fill="#f00"
        />
        <rect
          id="svg_7"
          height={temperature}
          width="41"
          y="37.4375"
          x="234.5"
          stroke-width="1.5"
          stroke="#000"
          fill="#fff"
        />
      </g>
    </svg>
  );
};

const First: React.FC<IProps> = ({ title, ...props }) => {
  const [temperature, setTemp] = React.useState(0);

  return (
    <div>
      <h6>{title}</h6>
      <Slider
        defaultValue={30}
        value={temperature}
        aria-labelledby="discrete-slider"
        valueLabelDisplay="auto"
        step={10}
        marks
        min={0}
        max={100}
        onChange={(e: ChangeEvent<{}>, value: number | number[]) =>
          setTemp(value as number)
        }
      />
      <SVGIcon temperature={223 - (223 * temperature) / 100} />
      <Formik
        initialValues={{
          username: '',
          email: '',
          soups: '',
          vatFree: false,
          bunSize: 1,
        }}
        onSubmit={(values, bag) => {
          console.log(values.username);
        }}
        validationSchema={schema}
      >
        {({ values }) => {
          return (
            <Form>
              <Field name="username">
                {({ field, form, meta }: FieldProps) => {
                  return (
                    <TextFormField
                      label="Username"
                      form={form}
                      field={field}
                      meta={meta}
                    />
                  );
                }}
              </Field>

              <Field name="soups">
                {({ field, form, meta }: FieldProps) => {
                  return (
                    <SelectFormField
                      label={<em>Fav soups</em>}
                      field={field}
                      form={form}
                      meta={meta}
                      formControlProps={{ fullWidth: true }}
                      options={[
                        { label: 'Koto', value: 'koto' },
                        { label: 'Kreas', value: 'kreas' },
                        { label: 'Xorto', value: 'xorto' },
                      ]}
                    />
                  );
                }}
              </Field>

              <Field name="vatFree">
                {({ field, form, meta }: FieldProps) => {
                  return (
                    <SwitchFormField
                      label={<em>VAT FREE</em>}
                      field={field}
                      form={form}
                      meta={meta}
                    />
                  );
                }}
              </Field>

              <Field name="bunSize">
                {({ field, form, meta }: FieldProps) => {
                  return (
                    <SliderFormField
                      field={field}
                      form={form}
                      meta={meta}
                      aria-labelledby="discrete-slider"
                      valueLabelDisplay="auto"
                      getAriaValueText={(
                        value: number,
                        index: number
                      ): string => `${value}`}
                      marks={[
                        {
                          value: 1,
                          label: 'Small',
                        },
                        {
                          value: 2,
                          label: 'Medium',
                        },
                        {
                          value: 3,
                          label: 'Large',
                        },
                      ]}
                    />
                  );
                }}
              </Field>
              <Divider />

              <Button type="submit">Submit</Button>
              <pre>{JSON.stringify(values, null, 2)}</pre>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

interface IProps {
  title?: string;
  props?: React.PropsWithChildren<object>;
}

const Second: React.FC<IProps> = ({ title, ...props }) => {
  return (
    <div>
      <h6>{title}</h6>
      <Formik
        initialValues={{
          username: '',
          burgers: '',
          hasTopings: 'true',
          topings: ['sauce'],
        }}
        onSubmit={(values, bag) => {
          console.log(values.username);
        }}
        validationSchema={schema}
      >
        {({ values, handleChange, handleBlur }) => {
          const { hasTopings, topings } = values;

          return (
            <Form>
              <Field name="username">
                {({ field, form, meta }: FieldProps) => {
                  return (
                    <TextFormField
                      label="Username"
                      form={form}
                      field={field}
                      meta={meta}
                    />
                  );
                }}
              </Field>

              <Field name="burgers">
                {({ field, form, meta }: FieldProps) => {
                  return (
                    <SelectFormField
                      label={<em>Fav burgers</em>}
                      form={form}
                      field={field}
                      meta={meta}
                      formControlProps={{ fullWidth: true }}
                    >
                      <MenuItem value="cheese">Cheese burger</MenuItem>
                      <MenuItem value="chicken">Chicken burger</MenuItem>
                      <MenuItem value="golden">Golden burger</MenuItem>
                    </SelectFormField>
                  );
                }}
              </Field>

              <Field name="hasTopings">
                {({ field, form, meta }: FieldProps) => {
                  return (
                    <RadioGroupFormField
                      label="Any extra topings on your burger?"
                      form={form}
                      field={field}
                      meta={meta}
                      row
                      group={[
                        { label: 'Yes plz', value: 'true' },
                        { label: 'No thanks', value: 'false' },
                      ]}
                    />
                  );
                }}
              </Field>

              {hasTopings === 'true' && (
                <Field
                  name="topings"
                  component={CheckboxGroupFormField}
                  // group={[
                  //   { label: 'Sauce', value: 'sauce' },
                  //   { label: 'Extra Mayo', value: 'mayo' },
                  //   { label: 'Valslaw', value: 'calslaw', disabled: true },
                  // ]}
                >
                  {({ field, form, meta }: FieldProps) => {
                    return (
                      <CheckboxGroupFormField
                        label="Available Topings"
                        form={form}
                        field={field}
                        meta={meta}
                        row
                      >
                        <FormControlLabel
                          label="Sauce"
                          control={
                            <Checkbox
                              name="topings"
                              value="sauce"
                              checked={topings.includes('sauce')}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                          }
                        />
                        <FormControlLabel
                          label="Caulslaw"
                          control={
                            <Checkbox
                              name="topings"
                              value="caulslaw"
                              checked={topings.includes('caulslaw')}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                          }
                        />
                      </CheckboxGroupFormField>
                    );
                  }}
                </Field>
              )}

              <Divider />
              <Button type="submit">Submit</Button>
              <pre style={{ position: 'absolute', bottom: 0 }}>
                {JSON.stringify(values, null, 2)}
              </pre>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

interface ITabPanelProps {
  index: number;
  value: number;
  props?: React.PropsWithChildren<object>;
}
const TabPanel: React.FC<ITabPanelProps> = ({
  index,
  value,
  children,
  ...props
}) => {
  return index === value ? <div>{children}</div> : null;
};

interface IComplexForm {
  title: string | React.ReactNode;
}
const ComplexForm: React.FC<IComplexForm> = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (e: React.ChangeEvent<{}>, newValue: number) =>
    setValue(newValue);
  const a11yProps = (index: number) => {
    return {};
  };

  return (
    <div>
      <AppBar position="static">
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="simple tabs example"
          centered
        >
          <Tab label="Item One" {...a11yProps(0)} />
          <Tab label="Item Two" {...a11yProps(1)} />
          <Tab label="Item Three" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <First title="First Form" />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Second title="Second Form" />
      </TabPanel>
      <TabPanel value={value} index={2}>
        Item Three
      </TabPanel>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <div className="App">
      <ComplexForm title="Complex From" />
    </div>
  );
};

const rootElement = document.getElementById('root');
render(<App />, rootElement);
