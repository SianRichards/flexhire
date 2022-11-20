import React from "react";

interface IProps {
  formValue: string;
  setFormValue: React.Dispatch<React.SetStateAction<string>>;
  handleSubmit: (event: any) => void;
}

const ApiKeyForm = (props: IProps) => {
  const { formValue, setFormValue, handleSubmit } = props;
  return (
    <form onSubmit={handleSubmit}>
      <label>
        Enter Flexhire API Key here:
        <input
          type="text"
          value={formValue}
          onChange={(event) => setFormValue(event?.target.value)}
        />
      </label>
      <input type="submit" />
    </form>
  );
};

export default ApiKeyForm;
