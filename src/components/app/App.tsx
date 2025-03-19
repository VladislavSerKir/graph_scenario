import React from "react";
import { ScenarioEditor } from "../scenario-editor/scenario-editor";
import Graph from "../graph/graph";
import { ActionsEditor } from "../actions-editor/actions-editor";
import { AddAction } from "../add-action/add-action";
import { AddScenario } from "../add-scenario/add-scenario";
import { useTypedSelector } from "../../types/types";

export const App = () => {
  const scenarios = useTypedSelector((store) => store.data.scenarios);
  const currScenario = useTypedSelector((store) => store.data.currScenario);

  return (
    <div className={`body`}>
      <Graph />
      <div className={`form`}>
        {scenarios[0].scenario_id !== currScenario?.scenario_id && (
          <ScenarioEditor />
        )}
        <AddScenario />
        <ActionsEditor />
        <AddAction />
      </div>
    </div>
  );
};
