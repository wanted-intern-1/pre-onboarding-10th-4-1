import { useState } from "react";

type Props = {
  initialValue: any;
  onSubmit: Function;
  validate: Function;
};

const useForm = ({ initialValue, onSubmit, validate }: Props) => {
  const [values, setValues] = useState(initialValue);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setIsLoading(true);
    e.preventDefault();

    try {
      const newErrors = validate ? validate(values) : {};

      if (Object.keys(newErrors).length === 0) {
        await onSubmit(values);
        setValues(initialValue);
      }

      setErrors(newErrors);
    } catch (error) {
      setErrors({});
      alert("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    values,
    errors,
    isLoading,
    handleChange,
    handleSubmit,
  };
};

export default useForm;
