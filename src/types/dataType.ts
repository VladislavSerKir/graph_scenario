export interface IGenericObject {
  [key: string]: any;
}

export interface IAction {
  action_id: string;
  name: string;
  to_scenario: string;
}

export interface IScenario {
  scenario_id: string;
  name: string;
  actions: string[];
}

export interface IGraphData {
  scenarios: IScenario[];
  actions: IAction[];
  currScenario: IScenario | null | undefined;
  currAction: IAction | null | undefined;
}
