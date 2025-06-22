import type { Slots } from 'vue';
import { isObject, uid } from 'yatter';
import type { SlotDef } from '../types';

export function getSlotsFactory(slots: Slots) {
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
      return [name];
    });
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
