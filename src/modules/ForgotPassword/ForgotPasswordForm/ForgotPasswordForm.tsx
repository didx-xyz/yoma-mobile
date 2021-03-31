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

interface Props {
  setSubmitted: Function
}

const ForgotPasswordForm = ({ setSubmitted }: Props) => {
  return (
    <Formik
      initialValues={{
        email: "",
      }}
      validationSchema={yup.object().shape({
        email: yup
          .string()
          .min(2)
          .max(255)
          .email()
          .required("Required")
          .label("Email"),
      })}
      onSubmit={async (values, actions) => {
        console.log("Register values: ", values);
        await api.auth.resetPassword({ ...values }).then((response: any) => {
          console.log("response", response);
          showSimpleMessage("success", response.meta.message)
          setSubmitted(true)
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
          <ButtonContainer
            disabled={isSubmitting}
            buttonText="Send instructions"
            buttonStyle={[ButtonStyles.largeTertiary3Button, { marginVertical: 15, alignSelf: 'center' }]}
            buttonTextStyle={[TextStyles.textWhite, TextStyles.buttonText]}
            onPress={handleSubmit}
          />
        </View>
      )}
    </Formik>
  );
}

export default ForgotPasswordForm;
