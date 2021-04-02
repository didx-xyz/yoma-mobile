import React from 'react';
import { View } from 'react-native';
import api from 'api';
import { Input, ButtonContainer } from 'components';
import { Formik } from 'formik';
import { TextStyles } from 'styles';
import ButtonStyles from 'styles/button.styles';
import { showSimpleMessage } from 'utils/error';
import * as yup from "yup";

const LoginForm = () => {
  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      validationSchema={yup.object().shape({
        email: yup
          .string()
          .min(2)
          .max(255)
          .email()
          .required("Required")
          .label("Email"),
        password: yup
          .string()
          .min(6)
          .required("Required")
          .label("Password")
      })}
      onSubmit={async (values, actions) => {
        console.log("Login values: ", values);
        await api.auth.login({ ...values }).then((response) => {
          console.log("response", response);

          showSimpleMessage("success", "Login Successful")
        }).catch(error => {
          console.log("Error =>", error)
          showSimpleMessage("danger", "Error", error)
        });
      }}
    >
      {({ handleChange, handleBlur, handleSubmit, values, touched, errors, isSubmitting }) => (
        <View>
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
          <Input
            onChangeText={handleChange("password")}
            onBlur={handleBlur("password")}
            value={values.password}
            label="Password"
            touched={touched.password}
            error={errors.password}
            secureTextEntry
          />
          <ButtonContainer
            disabled={isSubmitting}
            buttonText="Login"
            buttonStyle={[ButtonStyles.largeTertiary3Button, { marginVertical: 15, alignSelf: 'center' }]}
            buttonTextStyle={[TextStyles.textWhite, TextStyles.buttonText]}
            onPress={handleSubmit}
          />
        </View>
      )}
    </Formik>
  );
}

export default LoginForm;
