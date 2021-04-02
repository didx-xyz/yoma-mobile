import { Formik } from 'formik';
import React, { useState } from 'react';
import { Text, View } from 'react-native';
import * as yup from "yup";
import { CheckBox } from 'react-native-elements'
import { nameHasDigitsOrSymbols } from 'utils/regex';
import api from 'api';
import { showSimpleMessage } from 'utils/error';
import { ButtonContainer, DropDown, Input, Spinner } from 'components';
import countries from 'constants/countries';
import { BlueTick } from 'assets/Images';
import { FontFamily, TextStyles } from 'styles';
import fontStyles from 'styles/font.styles';
import ButtonStyles from 'styles/button.styles';

const RegisterForm = () => {
  const [checked, setChecked] = useState(false);
  const [country, setCountry] = useState('');

  return (
    <Formik
      initialValues={{
        firstName: "",
        lastName: "",
        email: "",
        countryAlpha2: "",
        privacyInd: false,
        password: "",
        confirmPassword: ""
      }}
      validationSchema={yup.object().shape({
        firstName: yup
          .string()
          .min(2)
          .max(50)
          .required("Required")
          .test(
            "First name",
            "First name cannot include numbers or symbols",
            (value: any) => {
              return !nameHasDigitsOrSymbols(value);
            }
          )
          .label("First name"),
        lastName: yup
          .string()
          .min(2)
          .max(50)
          .required("Required")
          .test(
            "Last name",
            "Last name cannot include numbers or symbols",
            (value: any) => {
              return !nameHasDigitsOrSymbols(value);
            }
          )
          .label("Last name"),
        email: yup
          .string()
          .min(2)
          .max(255)
          .email()
          .required("Required")
          .label("Email"),
        countryAlpha2: yup.string().required("Required").label("Country"),
        privacyInd: yup
          .bool()
          .test(
            "accepted",
            "Please accept the privacy policy before proceeding",
            (value) => value !== false
          ),
        password: yup
          .string()
          .min(8)
          .required("Required")
          .label("Password")
          .matches(
            /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
            "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
          ),
        confirmPassword: yup
          .string()
          .oneOf([yup.ref("password"), null], "Passwords must match")
          .min(8)
          .required("Required")
          .label("Confirm password")
          .matches(
            /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
            "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
          ),
      })}
      onSubmit={async (values, actions) => {
        console.log("Register values: ", values);
        actions.setSubmitting(true)
        await api.auth.register({ ...values }).then((response) => {
          console.log("response", response);
          actions.setSubmitting(false)
          showSimpleMessage("success", "Registration Successful")
        }).catch(error => {
          actions.setSubmitting(false)
          console.log("Error =>", error)
          showSimpleMessage("danger", "Error", error)
        });
      }}
    >
      {({ handleChange, handleBlur, handleSubmit, values, touched, errors, isSubmitting, setFieldValue }) => (
        <View>
          <Spinner visible={isSubmitting} />
          <Input
            onChangeText={handleChange("firstName")}
            onBlur={handleBlur("firstName")}
            value={values.firstName}
            label="First name"
            touched={touched.firstName}
            error={errors.firstName}
          />
          <Input
            onChangeText={handleChange("lastName")}
            onBlur={handleBlur("lastName")}
            value={values.lastName}
            label="Last name"
            touched={touched.lastName}
            error={errors.lastName}
          />
          <Input
            onChangeText={handleChange("email")}
            onBlur={handleBlur("email")}
            value={values.email}
            label="Email"
            keyboardType="email-address"
            autoCapitalize="none"
            touched={touched.email}
            error={errors.email}
          />
          <DropDown
            items={countries.map((c) => ({
              label: c.name,
              value: c.code,
            }))}
            onChangeItem={(itemValue) => {
              handleChange("countryAlpha2")
              handleBlur("countryAlpha2")
              setFieldValue('countryAlpha2', itemValue.value)
              setCountry(itemValue.value)
            }}
            defaultValue={country}
            searchable={true}
            searchablePlaceholder="Search for country"
            searchablePlaceholderTextColor="gray"
            placeholder={"Country"}
            touched={touched.countryAlpha2}
            error={errors.countryAlpha2}
          />
          <Input
            onChangeText={handleChange("password")}
            onBlur={handleBlur("password")}
            value={values.password}
            label="Create password"
            autoCapitalize="none"
            touched={touched.password}
            error={errors.password}
            secureTextEntry
          />
          <Input
            onChangeText={handleChange("confirmPassword")}
            onBlur={handleBlur("confirmPassword")}
            value={values.confirmPassword}
            label="Confirm Password"
            autoCapitalize="none"
            touched={touched.confirmPassword}
            error={errors.confirmPassword}
            secureTextEntry
          />
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <CheckBox
              uncheckedIcon='circle-o'
              checkedIcon={<BlueTick />}
              checked={checked}
              onPress={() => {
                setFieldValue('privacyInd', !checked)
                setChecked(!checked)
              }}
              onBlur={handleChange("privacyInd")}
              containerStyle={{ paddingVertical: 0 }}
            />
            <Text style={[TextStyles.h5, TextStyles.textTertiary5,
            { fontFamily: fontStyles[FontFamily.semibold] }]}>
              I agree to Yoma’s &nbsp;
              <Text style={{ textDecorationLine: "underline" }}>
                Privacy Policy
              </Text>
            </Text>
          </View>
          <ButtonContainer
            disabled={isSubmitting}
            buttonText="Get Started"
            buttonStyle={[ButtonStyles.largeTertiary3Button, { marginVertical: 15, alignSelf: 'center' }]}
            buttonTextStyle={[TextStyles.textWhite, TextStyles.buttonText]}
            onPress={handleSubmit}
          />
        </View>
      )}
    </Formik>
  );
}

export default RegisterForm;
