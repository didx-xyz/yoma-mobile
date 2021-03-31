import { Formik } from 'formik';
import React from 'react';
import { View } from 'react-native';
import ButtonContainer from '../../../components/ButtonContainer/ButtonContainer';
import { TextStyles } from '../../../styles';
import ButtonStyles from '../../../styles/button.styles';
import * as yup from "yup";
import Input from '../../../components/Input/Input';
import api from '../../../api';
import { showSimpleMessage } from '../../../utils/error';

interface ResetPasswordFormProps {
  id: string,
  token: string,
  navigation: any
}

const ResetPasswordForm = ({ id, token, navigation }: ResetPasswordFormProps) => {
  return (
    <Formik
      initialValues={{
        password: "",
        confirmPassword: ""
      }}
      validationSchema={yup.object().shape({
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
          .label("Confirm password"),
      })}
      onSubmit={async (values, actions) => {
        console.log("Login values: ", values);
        await api.users.password.edit(id, { ...values, token }).then((response) => {
          console.log("response", response);

          showSimpleMessage("success", "Password Reset Successful")
          navigation.navigate('Login')
        }).catch(error => {
          console.log("Error =>", error)
          showSimpleMessage("danger", "Error", error)
        });
      }}
    >
      {({ handleChange, handleBlur, handleSubmit, values, touched, errors, isSubmitting }) => (
        <View>
          <Input
            onChangeText={handleChange("password")}
            onBlur={handleBlur("password")}
            value={values.password}
            label="Password"
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
          <ButtonContainer
            disabled={isSubmitting}
            buttonText="Reset password"
            buttonStyle={[ButtonStyles.largeGreenButton, { marginVertical: 15, alignSelf: 'center' }]}
            buttonTextStyle={[TextStyles.textWhite, TextStyles.buttonText]}
            onPress={handleSubmit}
          />
        </View>
      )}
    </Formik>
  );
}

export default ResetPasswordForm;
