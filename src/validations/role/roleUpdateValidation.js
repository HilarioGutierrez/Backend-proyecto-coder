import z from 'zod';
import { idValidation } from '../shared/idValidation';
import { roleCreateValidation } from './roleCreateValidation';

export const roleUpdateValidation = z.union([
    idValidation,
    roleCreateValidation
]);