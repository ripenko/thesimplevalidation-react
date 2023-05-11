import { ValidationErrorsModel, ValidationModel, IValidationResult } from "thesimplevalidation";
import keys from "lodash.keys";

export interface IValidationState<TModel> {
    isValid: boolean;
    validation: ValidationModel<TModel>;
    validationErrors: ValidationErrorsModel<TModel>;
    allValidationErrors: string[];
}

export interface ISetState<P, S> {
    setState<K extends keyof S>(
        state: ((prevState: Readonly<S>, props: Readonly<P>) => (Pick<S, K> | S | null)) | (Pick<S, K> | S | null),
        callback?: () => void
    ): void;
}

export const defaultValidationChangedHandler = async <TModel>(component: ISetState<any, IValidationState<TModel>>, result: IValidationResult<TModel>): Promise<void> => {
    const properties: Array<keyof TModel> = keys(result.properties) as Array<keyof TModel>;
    const validation: ValidationModel<TModel> = {} as ValidationModel<TModel>;
    const validationErrors: ValidationErrorsModel<TModel> = {} as ValidationErrorsModel<TModel>;

    for (const property of properties) {
        if (!result.properties.hasOwnProperty(property)) continue;
        validation[property] = result.properties[property].isValid;
        validationErrors[property] = result.properties[property].errors;
    }

    await new Promise<void>((resolve) => {
        component.setState({
            isValid: result.isValid,
            validation: {
                ...validation
            },
            validationErrors: validationErrors,
            allValidationErrors: result.errors
        }, resolve);
    });
};

