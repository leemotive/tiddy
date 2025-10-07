import { mount } from '@vue/test-utils'
import { expect, test } from 'vitest'
import NestTest from './nest.test.vue';
import { nextTick, ref } from 'vue';

test('nest-form', async () => {
  const model = ref<{ contacts: Array<{ name: string; phone: string }>, range: Record<'start' | 'end', string> }>({ contacts: [], range: { start: '', end: '' } });
  const app = mount(NestTest, {
    props: { model },
  })

  expect(app.findAll('.list-row .el-input__inner')).toHaveLength(0);
  expect(app.find('.add-first').exists()).toBe(true);
  await app.find('.add-first').trigger('click');
  expect(app.find('.add-first').exists()).toBe(false);
  expect(app.findAll('.list-row .el-input__inner')).toHaveLength(2);
  const inputs = app.findAll<HTMLInputElement>('.list-row .el-input__inner');
  await inputs[0].setValue('name');
  await nextTick();
  expect(model.value.contacts[0].name).toBe('name');
  model.value.contacts[0].phone = '12345678901';
  await nextTick();
  expect(inputs[1].element.value).toBe('12345678901');

  await app.find('.range-start .el-input__inner').setValue('2025-10-01');
  await nextTick();
  expect(model.value.range.start).toBe('2025-10-01');

  model.value.range.end = '2025-10-02';
  await nextTick();
  expect(app.find<HTMLInputElement>('.range-end .el-input__inner').element.value).toBe('2025-10-02');
})
