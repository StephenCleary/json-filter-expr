import { parse } from "./json-filter-expr";

export type JsonPrimitive = boolean | number | string | null;
export type Json =  JsonPrimitive | JsonArray | JsonMap;
export interface JsonMap {  [key: string]: Json; }
export interface JsonArray extends Array<Json> { }

interface ConstantNode {
    type: 'constant';
    value: string | number | boolean | null;
}

/**
 * @Method: Compiles a filter string into a filter function.
 * @Param {string}
 */
export function compile(filter: string): (json: Json) => boolean {
    return parse(filter, {});
}
