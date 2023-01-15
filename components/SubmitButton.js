import AppButton from './AppButton';
import React from 'react';
import { useFormikContext } from 'formik';

export default function SubmitButton({ title1 }) {
    const { handleSubmit } = useFormikContext();

    return <AppButton title={title1} onPress={handleSubmit} />;
}
