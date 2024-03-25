/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { FormGroup } from "reactstrap";

const CustomFormGroup = ({ formik, name, children }) => {
  useEffect(() => {
    return () => {
      if (formik && name) {
        formik.setFieldValue(name, "");
      }
    };
  },[]);

  return <FormGroup>{children || null}</FormGroup>;
};

export default CustomFormGroup;