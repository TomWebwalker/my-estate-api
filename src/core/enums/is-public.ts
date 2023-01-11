import { SetMetadata } from '@nestjs/common';

export const IS_PUBLIC = 'IS_PUBLIC';

export const IsPublic = (isPublic: boolean) => SetMetadata(IS_PUBLIC, isPublic);
