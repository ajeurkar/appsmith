import React from "react";
import { createReducer } from "utils/AppsmithUtils";
import { ReduxActionTypes, ReduxAction } from "constants/ReduxActionConstants";
import { Datasource } from "api/DatasourcesApi";
import _ from "lodash";

const initialState: DatasourcePaneReduxState = {
  selectedPlugin: "",
  datasourceRefs: {},
  drafts: {},
  actionRouteInfo: {},
  expandDatasourceId: "",
  newDatasource: "",
};

export interface DatasourcePaneReduxState {
  selectedPlugin: string;
  datasourceRefs: {};
  drafts: Record<string, Datasource>;
  expandDatasourceId: string;
  actionRouteInfo: Partial<{
    apiId: string;
    datasourceId: string;
    pageId: string;
    applicationId: string;
  }>;
  newDatasource: string;
}

const datasourcePaneReducer = createReducer(initialState, {
  [ReduxActionTypes.SELECT_PLUGIN]: (
    state: DatasourcePaneReduxState,
    action: ReduxAction<{ pluginId: string }>,
  ) => ({
    ...state,
    selectedPlugin: action.payload.pluginId,
  }),
  [ReduxActionTypes.STORE_DATASOURCE_REFS]: (
    state: DatasourcePaneReduxState,
    action: ReduxAction<{ refsList: {} }>,
  ) => {
    return {
      ...state,
      datasourceRefs: { ...state.datasourceRefs, ...action.payload.refsList },
    };
  },
  [ReduxActionTypes.UPDATE_DATASOURCE_REFS]: (
    state: DatasourcePaneReduxState,
    action: ReduxAction<Datasource>,
  ) => {
    return {
      ...state,
      datasourceRefs: {
        ...state.datasourceRefs,
        [action.payload.id]: React.createRef(),
      },
    };
  },
  [ReduxActionTypes.UPDATE_DATASOURCE_DRAFT]: (
    state: DatasourcePaneReduxState,
    action: ReduxAction<{ id: string; draft: Partial<Datasource> }>,
  ) => {
    return {
      ...state,
      drafts: {
        ...state.drafts,
        [action.payload.id]: action.payload.draft,
      },
    };
  },
  [ReduxActionTypes.DELETE_DATASOURCE_DRAFT]: (
    state: DatasourcePaneReduxState,
    action: ReduxAction<{ id: string }>,
  ) => ({
    ...state,
    drafts: _.omit(state.drafts, action.payload.id),
  }),
  [ReduxActionTypes.STORE_AS_DATASOURCE_UPDATE]: (
    state: DatasourcePaneReduxState,
    action: ReduxAction<{
      apiId: string;
      datasourceId: string;
      pageId: string;
      applicationId: string;
    }>,
  ) => {
    return {
      ...state,
      actionRouteInfo: action.payload,
    };
  },
  [ReduxActionTypes.STORE_AS_DATASOURCE_COMPLETE]: (
    state: DatasourcePaneReduxState,
  ) => ({
    ...state,
    actionRouteInfo: {},
  }),
  [ReduxActionTypes.CREATE_DATASOURCE_SUCCESS]: (
    state: DatasourcePaneReduxState,
    action: ReduxAction<{ id: string }>,
  ) => {
    return {
      ...state,
      newDatasource: action.payload.id,
    };
  },
  [ReduxActionTypes.UPDATE_DATASOURCE_SUCCESS]: (
    state: DatasourcePaneReduxState,
    action: ReduxAction<Datasource>,
  ) => {
    return {
      ...state,
      newDatasource: "",
      expandDatasourceId: action.payload.id,
    };
  },
  [ReduxActionTypes.TEST_DATASOURCE_SUCCESS]: (
    state: DatasourcePaneReduxState,
    action: ReduxAction<Datasource>,
  ) => {
    return {
      ...state,
      expandDatasourceId: action.payload.id,
    };
  },
  [ReduxActionTypes.EXPAND_DATASOURCE_ENTITY]: (
    state: DatasourcePaneReduxState,
    action: ReduxAction<string>,
  ) => {
    return {
      ...state,
      expandDatasourceId: action.payload,
    };
  },
});

export default datasourcePaneReducer;
