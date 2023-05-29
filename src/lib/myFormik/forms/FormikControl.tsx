import type { FormikControl as FormikControlType } from "formik";
import CheckboxGroup from "./CheckboxGroup";
import DatePicker from "./DatePicker";
import Input from "./Input";
import RadioButtons from "./RadioButtons";
import Select from "./Select";
import Textarea from "./Textarea";

const Col = {
    input: Input,
    textarea: Textarea,
    select: Select,
    radio: RadioButtons,
    checkbox: CheckboxGroup,
    date: DatePicker,
};
export default function FormikControl({ control, ...rest }: FormikControlType) {
    const Component = Col[control] || null;
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return <Component {...rest} />;
}
