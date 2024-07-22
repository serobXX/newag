import * as yup from 'yup';

declare module 'yup' {
  interface StringSchema {
    notEmpty(message: string): StringSchema;
  }
  interface ArraySchema {
    // put your methods here
  }
  interface ObjectSchema {
    // put your methods here
  }
  interface DateSchema {
    // put your methods here
  }
  interface MixedSchema {
    // put your methods here
  }
  interface NumberSchema {
    // put your methods here
  }
}

export default yup;
