import { PATHS } from '~constants/paths';
import { ObjectValues } from '~utils/types';

export type TPathsKeys = keyof typeof PATHS;
export type TPathsValues = ObjectValues<typeof PATHS>;
