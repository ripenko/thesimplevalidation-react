import { ValidationErrorsModel, ValidationModel, IValidationResult } from "thesimplevalidation";
export interface IValidationState<TModel> {
    isValid: boolean;
    validation: ValidationModel<TModel>;
    validationErrors: ValidationErrorsModel<TModel>;
    allValidationErrors: string[];
}
export interface ISetState<P, S> {
    setState<K extends keyof S>(state: ((prevState: Readonly<S>, props: Readonly<P>) => (Pick<S, K> | S | null)) | (Pick<S, K> | S | null), callback?: () => void): void;
}
export declare const defaultValidationChangedHandler: <TModel>(component: ISetState<any, IValidationState<TModel>>, result: IValidationResult<TModel>) => Promise<void>;
