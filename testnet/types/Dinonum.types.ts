/**
* This file was automatically generated by @cosmwasm/ts-codegen@1.10.0.
* DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
* and run the @cosmwasm/ts-codegen generate command to regenerate this file.
*/

export interface InstantiateMsg {
  count: number;
}
export type ExecuteMsg = {
  increment: {};
} | {
  reset: {
    count: number;
  };
} | {
  add: {
    num: number;
  };
} | {
  subtract: {
    num: number;
  };
};
export type QueryMsg = {
  get_count: {};
};
export interface GetCountResponse {
  count: number;
}