import { useEffect, useMemo, useState } from 'react';

export interface FormValidations {
    [key: string]: [fn: Function, errorMessage: string]
}

export const useForm = <T extends Object>( initialState: T, formValidations: FormValidations = {} ) => {

    const [formState, setState] = useState<any>( initialState );
    const [formValidation, setFormValidation] = useState<any>({})

    useEffect(() => {
        createValidators();
    }, [formState])

    useEffect(() => {
      setFormValue(initialState);
    }, [initialState])
    

    const isFormValid = useMemo(() => {
        for ( const formValue of Object.keys( formValidation )) {
            if ( formValidation[formValue] !== null ) return false;
        }
        return true;
    }, [formValidation])
    

    const onChange = (value: string, field: keyof T) => {
        setState({
            ...formState,
            [field]: value
        });
    };

    const setFormValue = (form: T) => {
        setState( form );
    }

    const createValidators = () => {
        const formCheckedValues: {[key: string]: string | null} = {};

        for( const formField of Object.keys( formValidations)) {
            const [ fn, errorMessage = 'This field is required' ] = formValidations[formField];
            formCheckedValues[`${ formField }Valid`] = fn( formState[formField] ) ? null : errorMessage;
        }

        setFormValidation(formCheckedValues);
    }

    const onReset = () => {
        setState( initialState );
    }

    return {
        ...formState,
        formState,
        onChange,
        setFormValue,
        onReset,

        ...formValidation,
        isFormValid
    }
}