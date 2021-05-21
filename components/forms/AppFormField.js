import React from "react";
import { StyleSheet } from "react-native";
import AppTextInput from "../AppTextInput";
import ErrorMessage from "../ErrorMessage";
import { useFormikContext } from "formik";

function AppFormField({ name, width, ...otherProbs }) {
  const {
    setFieldValue,
    values,
    errors,
    setFieldTouched,
    touched,
  } = useFormikContext();
  return (
    <>
      <AppTextInput
        onBlur={() => setFieldTouched(name)}
        onChangeText={(text) => setFieldValue(name, text)}
        value={values[name]}
        width={width}
        {...otherProbs}
      />
      <ErrorMessage error={errors[name]} visible={touched[name]} />
    </>
  );
}
const styles = StyleSheet.create({});

export default AppFormField;
