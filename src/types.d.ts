import type { Component, Slot, Ref } from 'vue';

export type OrArray<T> = T | T[];
export type OrFunction<T> = T | ((...args: any[]) => T);
export type AnyFunction<A extends any[] = any[], R = any> = (...args: A) => R;
export type OrUndef<T> = T | undefined;
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;


export interface ComponentSlot {
  name: string;
  component?: Component | Slot | string;
  props?: (scope: any) => Record<string, any>;
  text?: OrFunction<string>;
  slots?: SlotDef[] | string;
  isSlot?: boolean;
}

export type SlotDef = ComponentSlot | string | RegExp;
export type GetSlotsFunction = (names: SlotDef[]) => ComponentSlot[];
export type OrRef<T> = T | Ref<T>;
