import type { Slots } from 'vue';
import { ensureArray, isObject, toKebabCase, uid } from 'yatter';
import type { GetSlotsFunction, SlotDef } from '../types';

export function getSlotsFactory(slots: Slots): GetSlotsFunction {
  return (names: SlotDef[]) =>
    names.flatMap((name) => {
      if (typeof name === 'string') {
        const slot = slots[name];
        if (slot) {
          return [
            {
              name: name.replace(/[\w-]+?_/, ''),
              component: slot,
              slot: true,
            },
          ];
        }
        return [];
      }
      if (name instanceof RegExp) {
        const slotNames = Object.keys(slots);
        return slotNames.flatMap(slotName => {
          if (name.test(slotName)) {
            return [
              {
                name: slotName.replace(/[\w-]+?_/, ''),
                component: slots[slotName],
                slot: true,
              }
            ]
          }
          return []
        })
      }
      return [name];
    });
}

export function resolveSlotNames(names: any, prop?: string, type?: string) {
  const nameArr = ensureArray(names);
  if (!nameArr.length && prop) {
    const name = type ? `${prop}-${type}` : prop;
    return [new RegExp(`^${toKebabCase(name)}_`)];
  }
  return nameArr;
}

const keys = new WeakMap<WeakKey, string>();
export function getKey(obj: any): string {
  if (!isObject(obj)) {
    return String(obj);
  }
  let key = keys.get(obj);
  if (!key) {
    key = uid();
    keys.set(obj, key);
  }
  return key;
}
