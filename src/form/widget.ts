import type { Component, Raw } from 'vue';
import { isString } from 'yatter';
import type { OrUndef } from '../types';

const componens: { [k: string]: Component } = {};

export function registerWidget(comp: Component): void;
export function registerWidget(name: string, comp: Component): void;
export function registerWidget(name: string | Component, comp?: Component) {
  let key = '';
  let component: OrUndef<Component>;
  if (isString(name)) {
    key = name;
    component = comp!;
  } else if (comp) {
    key = comp.name!;
    component = name;
  }

  if (!key || !component || componens[key]) {
    return;
  }

  componens[key] = component;
}

export function resolveWidget(name?: string | Component | Raw<Component>) {
  if (!name) {
    return;
  }
  if (isString(name)) {
    return componens[name];
  }
  return name;
}
