import { useState } from "react";
import { useTypedDispatch, useTypedSelector } from "../../types/types";
import { addScenario } from "../../services/dataReducer/dataReducer";
import MultiSelectField from "../multi-select-field/multi-select-field";
import { IGenericObject } from "../../types/dataType";

export const AddScenario = () => {
  const dispatch = useTypedDispatch();
  const actions = useTypedSelector((store) => store.data.actions);

  const actionsList = actions.map((action) => ({
    label: action.name,
    value: action.action_id,
  }));

  const [inputData, setInputData] = useState({
    name: "",
    actions: [],
  });

  const handleScenarioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleMultiSelectChange = (selectedOptions: IGenericObject) => {
    setInputData((prevState) => ({
      ...prevState,
      actions: selectedOptions.value,
    }));
  };

  const handleSubmitScenario = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formattedData = {
      ...inputData,
      actions: inputData.actions.map((i: IGenericObject) => i.value),
      scenario_id: String(Math.floor(Math.random() * 100)),
    };
    dispatch(addScenario({ formattedData }));
    setInputData({
      name: "",
      actions: [],
    });
  };

  return (
    <form
      className="modal-content__form"
      name="add-scenario"
      onSubmit={handleSubmitScenario}
    >
      <div className={`result-section__item ui items`}>
        <div className="item">
          <div className={`result-section__input`}>
            <p className={`result-section__item-title`}>
              Добавить новый сценарий
            </p>
            <input
              className={`result-section__input prompt`}
              name="name"
              type="text"
              placeholder="Введите название сценария"
              value={inputData.name}
              onChange={handleScenarioChange}
            />
            <MultiSelectField
              options={actionsList}
              onChange={handleMultiSelectChange}
              defaultValue={inputData.actions}
              name="actions"
              label={"Возможные действия:"}
              toTop
            />
            <button type="submit" className="button">
              {" "}
              Добавить
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};
