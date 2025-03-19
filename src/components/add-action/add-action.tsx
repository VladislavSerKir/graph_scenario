import { useState } from "react";
import { useTypedDispatch, useTypedSelector } from "../../types/types";
import { addAction } from "../../services/dataReducer/dataReducer";
import SelectField from "../select-field/select-field";
import { IGenericObject, IInputData } from "../../types/dataType";

export const AddAction = () => {
  const dispatch = useTypedDispatch();
  const currAction = useTypedSelector((store) => store.data.currAction);
  const scenarios = useTypedSelector((store) => store.data.scenarios);

  let scenariosList = scenarios.map((scenario) => ({
    label: scenario.name,
    value: scenario.scenario_id,
  }));

  scenariosList = [
    {
      label: "Без перехода",
      value: "",
    },
    ...scenariosList,
  ];

  const [inputData, setInputData] = useState<IInputData>({
    name: currAction?.name || "",
    to_scenario: "",
  });

  const handleActionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmitAddAction = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formattedData = {
      ...inputData,
      action_id: String(Math.floor(Math.random() * 100)),
      to_scenario: inputData.to_scenario.value,
    };
    dispatch(addAction({ formattedData }));
    setInputData({
      name: "",
      to_scenario: "",
    });
  };

  const handleSelectChange = (selectedOptions: IGenericObject) => {
    setInputData((prevState) => ({
      ...prevState,
      to_scenario: selectedOptions.value,
    }));
  };

  return (
    <form
      className="modal-content__form"
      name="add-action"
      onSubmit={handleSubmitAddAction}
    >
      <div className={`result-section__item ui items`}>
        <div className="item">
          <div className={`result-section__input`}>
            <p className={`result-section__item-title`}>
              Добавить новое действие
            </p>
            <input
              className={`result-section__input prompt`}
              name="name"
              type="text"
              placeholder="Введите название действия"
              value={inputData.name}
              onChange={handleActionChange}
            />
            <SelectField
              options={scenariosList}
              onChange={handleSelectChange}
              defaultValue={inputData.to_scenario}
              name="to_scenario"
              label={"Переход на сценарий:"}
              toTop
            />
            <button type="submit" className="button">
              Добавить
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};
