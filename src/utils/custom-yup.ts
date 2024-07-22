/**
 * This is example of creating custom method for yup
 * to make it workable you have to extend yup.d.ts file
 */

import { addMethod, string } from 'yup';

addMethod(string, 'notEmpty', function notEmpty(message: string) {
  return this.test('test-postCode', message, function (value = '') {
    const { path, createError } = this;
    return !!value || createError({ path, message });
  });
});
