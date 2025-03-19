import { useState, useEffect } from "react";
import { useTypedDispatch, useTypedSelector } from "../../types/types";
import { editAction } from "../../services/dataReducer/dataReducer";
import SelectField from "../select-field/select-field";
import { IGenericObject, IInputData } from "../../types/dataType";

export const ActionsEditor = () => {
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

  useEffect(() => {
    setInputData({
      name: currAction?.name || "",
      to_scenario: currAction?.to_scenario,
    });
  }, [currAction]);

  const handleActionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmitAction = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formattedData = {
      ...inputData,
      to_scenario: inputData.to_scenario.value,
    };
    dispatch(editAction({ currAction: currAction?.action_id, formattedData }));
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
      name="action"
      onSubmit={handleSubmitAction}
    >
      <div className={`scenario-editor__item ui items`}>
        <div className="item">
          <div className={`scenario-editor__input`}>
            {currAction ? (
              <p className={`scenario-editor__item-title`}>
                Текущее действие: {currAction?.name}
              </p>
            ) : (
              <p className={`scenario-editor__item-title`}>
                Кликните на любое действие (Овал)
              </p>
            )}
            <input
              className={`scenario-editor__input prompt`}
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
              {" "}
              Изменить
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};
