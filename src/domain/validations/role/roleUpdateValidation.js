import z from 'zod';
import { idValidation } from '../shared/idValidation.js';
import { roleCreateValidation } from './roleCreateValidation.js';

export const roleUpdateValidation = z.union([
    idValidation,
    roleCreateValidation
]);