import { computed, defineComponent, shallowRef, useAttrs, useSlots, type Slots } from "vue";

function useReuse() {
  const commonSlots = shallowRef<Slots>({});
  const commonAttrs = shallowRef({});
  const slots = computed<Slots>(() => {
    const keys = Object.keys(commonSlots.value);
    return keys.reduce((acc, key) => {
      acc[key] = (p: any) => commonSlots.value[key]?.({ ...commonAttrs.value, ...p });
      return acc;
    }, {} as any);
  });

  return [defineComponent({
    setup() {
      const slots = useSlots();
      const attrs = useAttrs();

      commonSlots.value = slots;
      commonAttrs.value = attrs;

      return () => null;
    }
  }), defineComponent({
    setup() {
      const attrs = useAttrs();
      return () => {
        return commonSlots.value.default?.({ ...commonAttrs.value, ...attrs });
      };
    }
  }), slots];
}

export { useReuse };