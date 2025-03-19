import React, { FC, useCallback } from "react";
import Select from "react-select";
import { IGenericObject } from "../../types/dataType";

interface IMultiSelectFieldProps {
  label: string;
  error?: string[] | null;
  name: string;
  onChange: Function;
  defaultValue: IGenericObject;
  options: IGenericObject;
  isFixed?: boolean;
  toTop?: boolean;
}

const MultiSelectField: FC<IMultiSelectFieldProps> = ({
  label,
  error,
  options,
  onChange,
  name,
  defaultValue,
  toTop,
}) => {
  const optionsArray =
    !Array.isArray(options) && typeof options === "object"
      ? Object.keys(options).map((optionName) => ({
          label: options[optionName].name,
          value: options[optionName].action_id,
        }))
      : options;

  const handleChange = useCallback((value: IGenericObject) => {
    onChange({ name, value });
  }, []);

  const getInputClasses = () => {
    return `select multi-select-field__input`;
  };

  return (
    <div>
      <label className="multi-select-field__label-select">{label}</label>
      <Select
        isMulti
        closeMenuOnSelect={false}
        options={optionsArray}
        className={getInputClasses()}
        classNamePrefix="react-select"
        onChange={handleChange}
        name={name}
        value={defaultValue}
        defaultValue={defaultValue}
        menuPlacement={toTop ? "top" : "bottom"}
      />
    </div>
  );
};

export default MultiSelectField;
