import type { Component, Slot } from 'vue';

export type OrArray<T> = T | T[];
export type OrFunction<T> = T | ((...args: any[]) => T);
export type AnyFunction<A extends unknown[] = unknown[], R = unknown> = (...args: A) => R;
export type OrUndef<T> = T | undefined;

export interface ComponentSlot {
  name: string;
  component?: Component | Slot;
  props?: (scope: any) => Record<string, any>;
  text?: OrFunction<string>;
  slots?: SlotDef[] | string;
  isSlot?: boolean;
}

export type SlotDef = ComponentSlot | string;
export type GetSlotsFunction = (names: SlotDef[]) => ComponentSlot[];
