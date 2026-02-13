import { defineComponent, h, isVNode, withDirectives, type Directive, type DirectiveArguments } from "vue";

interface DirectiveConfig {
  dir: Directive,
  value?: any;
  arg?: string;
  modifiers?: Record<string, boolean>;
  enable?: boolean;
}

export default defineComponent({
  name: 'TdDynamicDirective',
  props: {
    directives: {
      type: Array as () => DirectiveConfig[],
      default: () => []
    },
    wrap: {
      type: Boolean,
      default: false,
    },
    tag: {
      type: String,
      default: 'div',
    }
  },
  setup(props, {slots}) {
    return () => {
      const children = slots.default?.() ?? [];
      const validChildren = children.filter(isVNode);

      const directives: DirectiveArguments = props.directives.flatMap((d) => {
        if (!(d.enable ?? true)) {
          return []
        }
        return [[d.dir, d.value, d.arg, d.modifiers!]];
      })

      if (validChildren.length === 1) {
        return withDirectives(validChildren[0], directives);
      }

      if (validChildren.length > 1 && props.wrap) {
        return withDirectives(h(props.tag, null, validChildren), directives);
      }
      return children;
    }
  }
})
