import React, { FC, useCallback } from "react";
import Select from "react-select";
import { IGenericObject } from "../../types/dataType";

interface ISelectFieldProps {
  label: string;
  name: string;
  onChange: Function;
  defaultValue: string;
  options: IGenericObject;
  isFixed?: boolean;
  toTop?: boolean;
}

const SelectField: FC<ISelectFieldProps> = ({
  label,
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
          value: options[optionName].scenario_id,
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
        closeMenuOnSelect={true}
        options={optionsArray}
        className={getInputClasses()}
        defaultValue={optionsArray[0]}
        classNamePrefix="react-select"
        onChange={handleChange}
        name={name}
        value={defaultValue}
        menuPlacement={toTop ? "top" : "bottom"}
      />
    </div>
  );
};

export default SelectField;
