import { useField } from "formik";
import { Form, Header, Label, Select } from "semantic-ui-react";

interface Props {
  placeholder: string;
  name: string;
  options: { text: string; value: string }[];
  label?: string;
}

export default function CustomSelectInput(props: Props) {
  const [field, meta, helpers] = useField(props.name);
  return (
    <Form.Field error={meta.touched && !!meta.error}>
      <Header content={props.label} sub color="blue" />
      <Select
        clearable
        options={props.options}
        value={field.value || null}
        onChange={(_, d) => helpers.setValue(d.value)}
        onBlur={() => helpers.setTouched(true)}
        placeholder={props.placeholder}
      />
      {meta.touched && meta.error ? (
        <Label basic color="red">
          {meta.error}
        </Label>
      ) : null}
    </Form.Field>
  );
}