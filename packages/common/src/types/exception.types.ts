import type { UnknownRecord } from './unknown-record.type';

export type Cause = Error | undefined;

export type Response = string | UnknownRecord | Cause;
