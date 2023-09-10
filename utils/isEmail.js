import { emailReg } from './regex';

export const isEmail = (value) => emailReg.test(value);
