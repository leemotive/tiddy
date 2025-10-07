import { mount } from '@vue/test-utils'
import { expect, test } from 'vitest'
import TdForm from '../../src/form/form.vue';
import { ElInput } from 'element-plus';
import { nextTick, ref } from 'vue';

test('base-form', async () => {
  const model = ref({ firstName: '', lastName: '' });
  const app = mount(TdForm, {
    props: {
      fields: [
        { label: 'First Name', prop: 'firstName', component: ElInput },
        { label: 'Last Name', prop: 'lastName', component: ElInput },
      ],
      model
    },
  })
  expect(app.findAll('.el-form-item')).toHaveLength(2);
  const inputs = app.findAll<HTMLInputElement>('.el-input__inner');
  await inputs[0].setValue('first name');
  await nextTick();
  expect(model.value.firstName).toBe('first name');
  model.value.lastName = 'last name';
  await nextTick();
  expect(inputs[1].element.value).toBe('last name');
})
