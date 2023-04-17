import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { TableSchema, DbSchema, Relation, ElectricClient, ClientTables, HKT } from 'electric-sql/client/model';

/////////////////////////////////////////
// HELPER FUNCTIONS
/////////////////////////////////////////


/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

export const QueryModeSchema = z.enum(['default','insensitive']);

export const SortOrderSchema = z.enum(['asc','desc']);

export const TodoScalarFieldEnumSchema = z.enum(['id','listid','text','completed']);

export const TodolistScalarFieldEnumSchema = z.enum(['id','filter','editing']);

export const TransactionIsolationLevelSchema = z.enum(['ReadUncommitted','ReadCommitted','RepeatableRead','Serializable']);

export const FilterValuesSchema = z.enum(['all','active','completed']);

export type FilterValuesType = `${z.infer<typeof FilterValuesSchema>}`

/////////////////////////////////////////
// MODELS
/////////////////////////////////////////

/////////////////////////////////////////
// TODO SCHEMA
/////////////////////////////////////////

export const todoSchema = z.object({
  id: z.string(),
  listid: z.string(),
  text: z.string(),
  completed: z.number().int(),
})

export type todo = z.infer<typeof todoSchema>

/////////////////////////////////////////
// TODOLIST SCHEMA
/////////////////////////////////////////

export const todolistSchema = z.object({
  filter: FilterValuesSchema.nullish(),
  id: z.string(),
  editing: z.string().nullish(),
})

export type todolist = z.infer<typeof todolistSchema>

/////////////////////////////////////////
// SELECT & INCLUDE
/////////////////////////////////////////

// TODO
//------------------------------------------------------

export const todoIncludeSchema: z.ZodType<Prisma.todoInclude> = z.object({
  list: z.union([z.boolean(),z.lazy(() => todolistArgsSchema)]).optional(),
}).strict()

export const todoArgsSchema: z.ZodType<Prisma.todoArgs> = z.object({
  select: z.lazy(() => todoSelectSchema).optional(),
  include: z.lazy(() => todoIncludeSchema).optional(),
}).strict();

export const todoSelectSchema: z.ZodType<Prisma.todoSelect> = z.object({
  id: z.boolean().optional(),
  listid: z.boolean().optional(),
  list: z.union([z.boolean(),z.lazy(() => todolistArgsSchema)]).optional(),
  text: z.boolean().optional(),
  completed: z.boolean().optional(),
}).strict()

// TODOLIST
//------------------------------------------------------

export const todolistIncludeSchema: z.ZodType<Prisma.todolistInclude> = z.object({
  todo: z.union([z.boolean(),z.lazy(() => todoFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => todolistCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const todolistArgsSchema: z.ZodType<Prisma.todolistArgs> = z.object({
  select: z.lazy(() => todolistSelectSchema).optional(),
  include: z.lazy(() => todolistIncludeSchema).optional(),
}).strict();

export const todolistCountOutputTypeArgsSchema: z.ZodType<Prisma.TodolistCountOutputTypeArgs> = z.object({
  select: z.lazy(() => todolistCountOutputTypeSelectSchema).nullish(),
}).strict();

export const todolistCountOutputTypeSelectSchema: z.ZodType<Prisma.TodolistCountOutputTypeSelect> = z.object({
  todo: z.boolean().optional(),
}).strict();

export const todolistSelectSchema: z.ZodType<Prisma.todolistSelect> = z.object({
  id: z.boolean().optional(),
  filter: z.boolean().optional(),
  editing: z.boolean().optional(),
  todo: z.union([z.boolean(),z.lazy(() => todoFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => todolistCountOutputTypeArgsSchema)]).optional(),
}).strict()


/////////////////////////////////////////
// INPUT TYPES
/////////////////////////////////////////

export const todoWhereInputSchema: z.ZodType<Prisma.todoWhereInput> = z.object({
  AND: z.union([ z.lazy(() => todoWhereInputSchema),z.lazy(() => todoWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => todoWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => todoWhereInputSchema),z.lazy(() => todoWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  listid: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  list: z.union([ z.lazy(() => TodolistRelationFilterSchema),z.lazy(() => todolistWhereInputSchema) ]).optional().nullable(),
  text: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  completed: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
}).strict();

export const todoOrderByWithRelationInputSchema: z.ZodType<Prisma.todoOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  listid: z.lazy(() => SortOrderSchema).optional(),
  list: z.lazy(() => todolistOrderByWithRelationInputSchema).optional(),
  text: z.lazy(() => SortOrderSchema).optional(),
  completed: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const todoWhereUniqueInputSchema: z.ZodType<Prisma.todoWhereUniqueInput> = z.object({
  id: z.string().optional()
}).strict();

export const todoOrderByWithAggregationInputSchema: z.ZodType<Prisma.todoOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  listid: z.lazy(() => SortOrderSchema).optional(),
  text: z.lazy(() => SortOrderSchema).optional(),
  completed: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => todoCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => todoAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => todoMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => todoMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => todoSumOrderByAggregateInputSchema).optional()
}).strict();

export const todoScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.todoScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => todoScalarWhereWithAggregatesInputSchema),z.lazy(() => todoScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => todoScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => todoScalarWhereWithAggregatesInputSchema),z.lazy(() => todoScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  listid: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  text: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  completed: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
}).strict();

export const todolistWhereInputSchema: z.ZodType<Prisma.todolistWhereInput> = z.object({
  AND: z.union([ z.lazy(() => todolistWhereInputSchema),z.lazy(() => todolistWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => todolistWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => todolistWhereInputSchema),z.lazy(() => todolistWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  filter: z.union([ z.lazy(() => EnumFilterValuesNullableFilterSchema),z.lazy(() => FilterValuesSchema) ]).optional().nullable(),
  editing: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  todo: z.lazy(() => TodoListRelationFilterSchema).optional()
}).strict();

export const todolistOrderByWithRelationInputSchema: z.ZodType<Prisma.todolistOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  filter: z.lazy(() => SortOrderSchema).optional(),
  editing: z.lazy(() => SortOrderSchema).optional(),
  todo: z.lazy(() => todoOrderByRelationAggregateInputSchema).optional()
}).strict();

export const todolistWhereUniqueInputSchema: z.ZodType<Prisma.todolistWhereUniqueInput> = z.object({
  id: z.string().optional()
}).strict();

export const todolistOrderByWithAggregationInputSchema: z.ZodType<Prisma.todolistOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  filter: z.lazy(() => SortOrderSchema).optional(),
  editing: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => todolistCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => todolistMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => todolistMinOrderByAggregateInputSchema).optional()
}).strict();

export const todolistScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.todolistScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => todolistScalarWhereWithAggregatesInputSchema),z.lazy(() => todolistScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => todolistScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => todolistScalarWhereWithAggregatesInputSchema),z.lazy(() => todolistScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  filter: z.union([ z.lazy(() => EnumFilterValuesNullableWithAggregatesFilterSchema),z.lazy(() => FilterValuesSchema) ]).optional().nullable(),
  editing: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export const todoCreateInputSchema: z.ZodType<Prisma.todoCreateInput> = z.object({
  id: z.string(),
  list: z.lazy(() => todolistCreateNestedOneWithoutTodoInputSchema).optional(),
  text: z.string(),
  completed: z.number().int().optional()
}).strict();

export const todoUncheckedCreateInputSchema: z.ZodType<Prisma.todoUncheckedCreateInput> = z.object({
  id: z.string(),
  listid: z.string(),
  text: z.string(),
  completed: z.number().int().optional()
}).strict();

export const todoUpdateInputSchema: z.ZodType<Prisma.todoUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  list: z.lazy(() => todolistUpdateOneWithoutTodoNestedInputSchema).optional(),
  text: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  completed: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const todoUncheckedUpdateInputSchema: z.ZodType<Prisma.todoUncheckedUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  listid: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  text: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  completed: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const todoCreateManyInputSchema: z.ZodType<Prisma.todoCreateManyInput> = z.object({
  id: z.string(),
  listid: z.string(),
  text: z.string(),
  completed: z.number().int().optional()
}).strict();

export const todoUpdateManyMutationInputSchema: z.ZodType<Prisma.todoUpdateManyMutationInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  text: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  completed: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const todoUncheckedUpdateManyInputSchema: z.ZodType<Prisma.todoUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  listid: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  text: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  completed: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const todolistCreateInputSchema: z.ZodType<Prisma.todolistCreateInput> = z.object({
  id: z.string(),
  filter: z.lazy(() => FilterValuesSchema).optional().nullable(),
  editing: z.string().optional().nullable(),
  todo: z.lazy(() => todoCreateNestedManyWithoutListInputSchema).optional()
}).strict();

export const todolistUncheckedCreateInputSchema: z.ZodType<Prisma.todolistUncheckedCreateInput> = z.object({
  id: z.string(),
  filter: z.lazy(() => FilterValuesSchema).optional().nullable(),
  editing: z.string().optional().nullable(),
  todo: z.lazy(() => todoUncheckedCreateNestedManyWithoutListInputSchema).optional()
}).strict();

export const todolistUpdateInputSchema: z.ZodType<Prisma.todolistUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  filter: z.union([ z.lazy(() => FilterValuesSchema),z.lazy(() => NullableEnumFilterValuesFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  editing: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  todo: z.lazy(() => todoUpdateManyWithoutListNestedInputSchema).optional()
}).strict();

export const todolistUncheckedUpdateInputSchema: z.ZodType<Prisma.todolistUncheckedUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  filter: z.union([ z.lazy(() => FilterValuesSchema),z.lazy(() => NullableEnumFilterValuesFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  editing: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  todo: z.lazy(() => todoUncheckedUpdateManyWithoutListNestedInputSchema).optional()
}).strict();

export const todolistCreateManyInputSchema: z.ZodType<Prisma.todolistCreateManyInput> = z.object({
  id: z.string(),
  filter: z.lazy(() => FilterValuesSchema).optional().nullable(),
  editing: z.string().optional().nullable()
}).strict();

export const todolistUpdateManyMutationInputSchema: z.ZodType<Prisma.todolistUpdateManyMutationInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  filter: z.union([ z.lazy(() => FilterValuesSchema),z.lazy(() => NullableEnumFilterValuesFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  editing: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const todolistUncheckedUpdateManyInputSchema: z.ZodType<Prisma.todolistUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  filter: z.union([ z.lazy(() => FilterValuesSchema),z.lazy(() => NullableEnumFilterValuesFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  editing: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const StringFilterSchema: z.ZodType<Prisma.StringFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
}).strict();

export const TodolistRelationFilterSchema: z.ZodType<Prisma.TodolistRelationFilter> = z.object({
  is: z.lazy(() => todolistWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => todolistWhereInputSchema).optional().nullable()
}).strict();

export const IntFilterSchema: z.ZodType<Prisma.IntFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntFilterSchema) ]).optional(),
}).strict();

export const todoCountOrderByAggregateInputSchema: z.ZodType<Prisma.todoCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  listid: z.lazy(() => SortOrderSchema).optional(),
  text: z.lazy(() => SortOrderSchema).optional(),
  completed: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const todoAvgOrderByAggregateInputSchema: z.ZodType<Prisma.todoAvgOrderByAggregateInput> = z.object({
  completed: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const todoMaxOrderByAggregateInputSchema: z.ZodType<Prisma.todoMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  listid: z.lazy(() => SortOrderSchema).optional(),
  text: z.lazy(() => SortOrderSchema).optional(),
  completed: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const todoMinOrderByAggregateInputSchema: z.ZodType<Prisma.todoMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  listid: z.lazy(() => SortOrderSchema).optional(),
  text: z.lazy(() => SortOrderSchema).optional(),
  completed: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const todoSumOrderByAggregateInputSchema: z.ZodType<Prisma.todoSumOrderByAggregateInput> = z.object({
  completed: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const StringWithAggregatesFilterSchema: z.ZodType<Prisma.StringWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict();

export const IntWithAggregatesFilterSchema: z.ZodType<Prisma.IntWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedIntFilterSchema).optional(),
  _max: z.lazy(() => NestedIntFilterSchema).optional()
}).strict();

export const EnumFilterValuesNullableFilterSchema: z.ZodType<Prisma.EnumFilterValuesNullableFilter> = z.object({
  equals: z.lazy(() => FilterValuesSchema).optional().nullable(),
  in: z.lazy(() => FilterValuesSchema).array().optional().nullable(),
  notIn: z.lazy(() => FilterValuesSchema).array().optional().nullable(),
  not: z.union([ z.lazy(() => FilterValuesSchema),z.lazy(() => NestedEnumFilterValuesNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const StringNullableFilterSchema: z.ZodType<Prisma.StringNullableFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const TodoListRelationFilterSchema: z.ZodType<Prisma.TodoListRelationFilter> = z.object({
  every: z.lazy(() => todoWhereInputSchema).optional(),
  some: z.lazy(() => todoWhereInputSchema).optional(),
  none: z.lazy(() => todoWhereInputSchema).optional()
}).strict();

export const todoOrderByRelationAggregateInputSchema: z.ZodType<Prisma.todoOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const todolistCountOrderByAggregateInputSchema: z.ZodType<Prisma.todolistCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  filter: z.lazy(() => SortOrderSchema).optional(),
  editing: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const todolistMaxOrderByAggregateInputSchema: z.ZodType<Prisma.todolistMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  filter: z.lazy(() => SortOrderSchema).optional(),
  editing: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const todolistMinOrderByAggregateInputSchema: z.ZodType<Prisma.todolistMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  filter: z.lazy(() => SortOrderSchema).optional(),
  editing: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EnumFilterValuesNullableWithAggregatesFilterSchema: z.ZodType<Prisma.EnumFilterValuesNullableWithAggregatesFilter> = z.object({
  equals: z.lazy(() => FilterValuesSchema).optional().nullable(),
  in: z.lazy(() => FilterValuesSchema).array().optional().nullable(),
  notIn: z.lazy(() => FilterValuesSchema).array().optional().nullable(),
  not: z.union([ z.lazy(() => FilterValuesSchema),z.lazy(() => NestedEnumFilterValuesNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumFilterValuesNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumFilterValuesNullableFilterSchema).optional()
}).strict();

export const StringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.StringNullableWithAggregatesFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional()
}).strict();

export const todolistCreateNestedOneWithoutTodoInputSchema: z.ZodType<Prisma.todolistCreateNestedOneWithoutTodoInput> = z.object({
  create: z.union([ z.lazy(() => todolistCreateWithoutTodoInputSchema),z.lazy(() => todolistUncheckedCreateWithoutTodoInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => todolistCreateOrConnectWithoutTodoInputSchema).optional(),
  connect: z.lazy(() => todolistWhereUniqueInputSchema).optional()
}).strict();

export const StringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.StringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional()
}).strict();

export const todolistUpdateOneWithoutTodoNestedInputSchema: z.ZodType<Prisma.todolistUpdateOneWithoutTodoNestedInput> = z.object({
  create: z.union([ z.lazy(() => todolistCreateWithoutTodoInputSchema),z.lazy(() => todolistUncheckedCreateWithoutTodoInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => todolistCreateOrConnectWithoutTodoInputSchema).optional(),
  upsert: z.lazy(() => todolistUpsertWithoutTodoInputSchema).optional(),
  disconnect: z.boolean().optional(),
  delete: z.boolean().optional(),
  connect: z.lazy(() => todolistWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => todolistUpdateWithoutTodoInputSchema),z.lazy(() => todolistUncheckedUpdateWithoutTodoInputSchema) ]).optional(),
}).strict();

export const IntFieldUpdateOperationsInputSchema: z.ZodType<Prisma.IntFieldUpdateOperationsInput> = z.object({
  set: z.number().optional(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional()
}).strict();

export const todoCreateNestedManyWithoutListInputSchema: z.ZodType<Prisma.todoCreateNestedManyWithoutListInput> = z.object({
  create: z.union([ z.lazy(() => todoCreateWithoutListInputSchema),z.lazy(() => todoCreateWithoutListInputSchema).array(),z.lazy(() => todoUncheckedCreateWithoutListInputSchema),z.lazy(() => todoUncheckedCreateWithoutListInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => todoCreateOrConnectWithoutListInputSchema),z.lazy(() => todoCreateOrConnectWithoutListInputSchema).array() ]).optional(),
  createMany: z.lazy(() => todoCreateManyListInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => todoWhereUniqueInputSchema),z.lazy(() => todoWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const todoUncheckedCreateNestedManyWithoutListInputSchema: z.ZodType<Prisma.todoUncheckedCreateNestedManyWithoutListInput> = z.object({
  create: z.union([ z.lazy(() => todoCreateWithoutListInputSchema),z.lazy(() => todoCreateWithoutListInputSchema).array(),z.lazy(() => todoUncheckedCreateWithoutListInputSchema),z.lazy(() => todoUncheckedCreateWithoutListInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => todoCreateOrConnectWithoutListInputSchema),z.lazy(() => todoCreateOrConnectWithoutListInputSchema).array() ]).optional(),
  createMany: z.lazy(() => todoCreateManyListInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => todoWhereUniqueInputSchema),z.lazy(() => todoWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const NullableEnumFilterValuesFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableEnumFilterValuesFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => FilterValuesSchema).optional().nullable()
}).strict();

export const NullableStringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableStringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional().nullable()
}).strict();

export const todoUpdateManyWithoutListNestedInputSchema: z.ZodType<Prisma.todoUpdateManyWithoutListNestedInput> = z.object({
  create: z.union([ z.lazy(() => todoCreateWithoutListInputSchema),z.lazy(() => todoCreateWithoutListInputSchema).array(),z.lazy(() => todoUncheckedCreateWithoutListInputSchema),z.lazy(() => todoUncheckedCreateWithoutListInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => todoCreateOrConnectWithoutListInputSchema),z.lazy(() => todoCreateOrConnectWithoutListInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => todoUpsertWithWhereUniqueWithoutListInputSchema),z.lazy(() => todoUpsertWithWhereUniqueWithoutListInputSchema).array() ]).optional(),
  createMany: z.lazy(() => todoCreateManyListInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => todoWhereUniqueInputSchema),z.lazy(() => todoWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => todoWhereUniqueInputSchema),z.lazy(() => todoWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => todoWhereUniqueInputSchema),z.lazy(() => todoWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => todoWhereUniqueInputSchema),z.lazy(() => todoWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => todoUpdateWithWhereUniqueWithoutListInputSchema),z.lazy(() => todoUpdateWithWhereUniqueWithoutListInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => todoUpdateManyWithWhereWithoutListInputSchema),z.lazy(() => todoUpdateManyWithWhereWithoutListInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => todoScalarWhereInputSchema),z.lazy(() => todoScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const todoUncheckedUpdateManyWithoutListNestedInputSchema: z.ZodType<Prisma.todoUncheckedUpdateManyWithoutListNestedInput> = z.object({
  create: z.union([ z.lazy(() => todoCreateWithoutListInputSchema),z.lazy(() => todoCreateWithoutListInputSchema).array(),z.lazy(() => todoUncheckedCreateWithoutListInputSchema),z.lazy(() => todoUncheckedCreateWithoutListInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => todoCreateOrConnectWithoutListInputSchema),z.lazy(() => todoCreateOrConnectWithoutListInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => todoUpsertWithWhereUniqueWithoutListInputSchema),z.lazy(() => todoUpsertWithWhereUniqueWithoutListInputSchema).array() ]).optional(),
  createMany: z.lazy(() => todoCreateManyListInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => todoWhereUniqueInputSchema),z.lazy(() => todoWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => todoWhereUniqueInputSchema),z.lazy(() => todoWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => todoWhereUniqueInputSchema),z.lazy(() => todoWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => todoWhereUniqueInputSchema),z.lazy(() => todoWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => todoUpdateWithWhereUniqueWithoutListInputSchema),z.lazy(() => todoUpdateWithWhereUniqueWithoutListInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => todoUpdateManyWithWhereWithoutListInputSchema),z.lazy(() => todoUpdateManyWithWhereWithoutListInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => todoScalarWhereInputSchema),z.lazy(() => todoScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const NestedStringFilterSchema: z.ZodType<Prisma.NestedStringFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
}).strict();

export const NestedIntFilterSchema: z.ZodType<Prisma.NestedIntFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntFilterSchema) ]).optional(),
}).strict();

export const NestedStringWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict();

export const NestedIntWithAggregatesFilterSchema: z.ZodType<Prisma.NestedIntWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedIntFilterSchema).optional(),
  _max: z.lazy(() => NestedIntFilterSchema).optional()
}).strict();

export const NestedFloatFilterSchema: z.ZodType<Prisma.NestedFloatFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatFilterSchema) ]).optional(),
}).strict();

export const NestedEnumFilterValuesNullableFilterSchema: z.ZodType<Prisma.NestedEnumFilterValuesNullableFilter> = z.object({
  equals: z.lazy(() => FilterValuesSchema).optional().nullable(),
  in: z.lazy(() => FilterValuesSchema).array().optional().nullable(),
  notIn: z.lazy(() => FilterValuesSchema).array().optional().nullable(),
  not: z.union([ z.lazy(() => FilterValuesSchema),z.lazy(() => NestedEnumFilterValuesNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedStringNullableFilterSchema: z.ZodType<Prisma.NestedStringNullableFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedEnumFilterValuesNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumFilterValuesNullableWithAggregatesFilter> = z.object({
  equals: z.lazy(() => FilterValuesSchema).optional().nullable(),
  in: z.lazy(() => FilterValuesSchema).array().optional().nullable(),
  notIn: z.lazy(() => FilterValuesSchema).array().optional().nullable(),
  not: z.union([ z.lazy(() => FilterValuesSchema),z.lazy(() => NestedEnumFilterValuesNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumFilterValuesNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumFilterValuesNullableFilterSchema).optional()
}).strict();

export const NestedIntNullableFilterSchema: z.ZodType<Prisma.NestedIntNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedStringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringNullableWithAggregatesFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional()
}).strict();

export const todolistCreateWithoutTodoInputSchema: z.ZodType<Prisma.todolistCreateWithoutTodoInput> = z.object({
  id: z.string(),
  filter: z.lazy(() => FilterValuesSchema).optional().nullable(),
  editing: z.string().optional().nullable()
}).strict();

export const todolistUncheckedCreateWithoutTodoInputSchema: z.ZodType<Prisma.todolistUncheckedCreateWithoutTodoInput> = z.object({
  id: z.string(),
  filter: z.lazy(() => FilterValuesSchema).optional().nullable(),
  editing: z.string().optional().nullable()
}).strict();

export const todolistCreateOrConnectWithoutTodoInputSchema: z.ZodType<Prisma.todolistCreateOrConnectWithoutTodoInput> = z.object({
  where: z.lazy(() => todolistWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => todolistCreateWithoutTodoInputSchema),z.lazy(() => todolistUncheckedCreateWithoutTodoInputSchema) ]),
}).strict();

export const todolistUpsertWithoutTodoInputSchema: z.ZodType<Prisma.todolistUpsertWithoutTodoInput> = z.object({
  update: z.union([ z.lazy(() => todolistUpdateWithoutTodoInputSchema),z.lazy(() => todolistUncheckedUpdateWithoutTodoInputSchema) ]),
  create: z.union([ z.lazy(() => todolistCreateWithoutTodoInputSchema),z.lazy(() => todolistUncheckedCreateWithoutTodoInputSchema) ]),
}).strict();

export const todolistUpdateWithoutTodoInputSchema: z.ZodType<Prisma.todolistUpdateWithoutTodoInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  filter: z.union([ z.lazy(() => FilterValuesSchema),z.lazy(() => NullableEnumFilterValuesFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  editing: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const todolistUncheckedUpdateWithoutTodoInputSchema: z.ZodType<Prisma.todolistUncheckedUpdateWithoutTodoInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  filter: z.union([ z.lazy(() => FilterValuesSchema),z.lazy(() => NullableEnumFilterValuesFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  editing: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const todoCreateWithoutListInputSchema: z.ZodType<Prisma.todoCreateWithoutListInput> = z.object({
  id: z.string(),
  text: z.string(),
  completed: z.number().optional()
}).strict();

export const todoUncheckedCreateWithoutListInputSchema: z.ZodType<Prisma.todoUncheckedCreateWithoutListInput> = z.object({
  id: z.string(),
  text: z.string(),
  completed: z.number().optional()
}).strict();

export const todoCreateOrConnectWithoutListInputSchema: z.ZodType<Prisma.todoCreateOrConnectWithoutListInput> = z.object({
  where: z.lazy(() => todoWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => todoCreateWithoutListInputSchema),z.lazy(() => todoUncheckedCreateWithoutListInputSchema) ]),
}).strict();

export const todoCreateManyListInputEnvelopeSchema: z.ZodType<Prisma.todoCreateManyListInputEnvelope> = z.object({
  data: z.lazy(() => todoCreateManyListInputSchema).array(),
  skipDuplicates: z.boolean().optional()
}).strict();

export const todoUpsertWithWhereUniqueWithoutListInputSchema: z.ZodType<Prisma.todoUpsertWithWhereUniqueWithoutListInput> = z.object({
  where: z.lazy(() => todoWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => todoUpdateWithoutListInputSchema),z.lazy(() => todoUncheckedUpdateWithoutListInputSchema) ]),
  create: z.union([ z.lazy(() => todoCreateWithoutListInputSchema),z.lazy(() => todoUncheckedCreateWithoutListInputSchema) ]),
}).strict();

export const todoUpdateWithWhereUniqueWithoutListInputSchema: z.ZodType<Prisma.todoUpdateWithWhereUniqueWithoutListInput> = z.object({
  where: z.lazy(() => todoWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => todoUpdateWithoutListInputSchema),z.lazy(() => todoUncheckedUpdateWithoutListInputSchema) ]),
}).strict();

export const todoUpdateManyWithWhereWithoutListInputSchema: z.ZodType<Prisma.todoUpdateManyWithWhereWithoutListInput> = z.object({
  where: z.lazy(() => todoScalarWhereInputSchema),
  data: z.union([ z.lazy(() => todoUpdateManyMutationInputSchema),z.lazy(() => todoUncheckedUpdateManyWithoutTodoInputSchema) ]),
}).strict();

export const todoScalarWhereInputSchema: z.ZodType<Prisma.todoScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => todoScalarWhereInputSchema),z.lazy(() => todoScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => todoScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => todoScalarWhereInputSchema),z.lazy(() => todoScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  listid: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  text: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  completed: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
}).strict();

export const todoCreateManyListInputSchema: z.ZodType<Prisma.todoCreateManyListInput> = z.object({
  id: z.string(),
  text: z.string(),
  completed: z.number().int().optional()
}).strict();

export const todoUpdateWithoutListInputSchema: z.ZodType<Prisma.todoUpdateWithoutListInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  text: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  completed: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const todoUncheckedUpdateWithoutListInputSchema: z.ZodType<Prisma.todoUncheckedUpdateWithoutListInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  text: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  completed: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const todoUncheckedUpdateManyWithoutTodoInputSchema: z.ZodType<Prisma.todoUncheckedUpdateManyWithoutTodoInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  text: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  completed: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

/////////////////////////////////////////
// ARGS
/////////////////////////////////////////

export const todoFindFirstArgsSchema: z.ZodType<Prisma.todoFindFirstArgs> = z.object({
  select: todoSelectSchema.optional(),
  include: todoIncludeSchema.optional(),
  where: todoWhereInputSchema.optional(),
  orderBy: z.union([ todoOrderByWithRelationInputSchema.array(),todoOrderByWithRelationInputSchema ]).optional(),
  cursor: todoWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: TodoScalarFieldEnumSchema.array().optional(),
}).strict()

export const todoFindFirstOrThrowArgsSchema: z.ZodType<Prisma.todoFindFirstOrThrowArgs> = z.object({
  select: todoSelectSchema.optional(),
  include: todoIncludeSchema.optional(),
  where: todoWhereInputSchema.optional(),
  orderBy: z.union([ todoOrderByWithRelationInputSchema.array(),todoOrderByWithRelationInputSchema ]).optional(),
  cursor: todoWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: TodoScalarFieldEnumSchema.array().optional(),
}).strict()

export const todoFindManyArgsSchema: z.ZodType<Prisma.todoFindManyArgs> = z.object({
  select: todoSelectSchema.optional(),
  include: todoIncludeSchema.optional(),
  where: todoWhereInputSchema.optional(),
  orderBy: z.union([ todoOrderByWithRelationInputSchema.array(),todoOrderByWithRelationInputSchema ]).optional(),
  cursor: todoWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: TodoScalarFieldEnumSchema.array().optional(),
}).strict()

export const todoAggregateArgsSchema: z.ZodType<Prisma.TodoAggregateArgs> = z.object({
  where: todoWhereInputSchema.optional(),
  orderBy: z.union([ todoOrderByWithRelationInputSchema.array(),todoOrderByWithRelationInputSchema ]).optional(),
  cursor: todoWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const todoGroupByArgsSchema: z.ZodType<Prisma.TodoGroupByArgs> = z.object({
  where: todoWhereInputSchema.optional(),
  orderBy: z.union([ todoOrderByWithAggregationInputSchema.array(),todoOrderByWithAggregationInputSchema ]).optional(),
  by: TodoScalarFieldEnumSchema.array(),
  having: todoScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const todoFindUniqueArgsSchema: z.ZodType<Prisma.todoFindUniqueArgs> = z.object({
  select: todoSelectSchema.optional(),
  include: todoIncludeSchema.optional(),
  where: todoWhereUniqueInputSchema,
}).strict()

export const todoFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.todoFindUniqueOrThrowArgs> = z.object({
  select: todoSelectSchema.optional(),
  include: todoIncludeSchema.optional(),
  where: todoWhereUniqueInputSchema,
}).strict()

export const todolistFindFirstArgsSchema: z.ZodType<Prisma.todolistFindFirstArgs> = z.object({
  select: todolistSelectSchema.optional(),
  include: todolistIncludeSchema.optional(),
  where: todolistWhereInputSchema.optional(),
  orderBy: z.union([ todolistOrderByWithRelationInputSchema.array(),todolistOrderByWithRelationInputSchema ]).optional(),
  cursor: todolistWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: TodolistScalarFieldEnumSchema.array().optional(),
}).strict()

export const todolistFindFirstOrThrowArgsSchema: z.ZodType<Prisma.todolistFindFirstOrThrowArgs> = z.object({
  select: todolistSelectSchema.optional(),
  include: todolistIncludeSchema.optional(),
  where: todolistWhereInputSchema.optional(),
  orderBy: z.union([ todolistOrderByWithRelationInputSchema.array(),todolistOrderByWithRelationInputSchema ]).optional(),
  cursor: todolistWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: TodolistScalarFieldEnumSchema.array().optional(),
}).strict()

export const todolistFindManyArgsSchema: z.ZodType<Prisma.todolistFindManyArgs> = z.object({
  select: todolistSelectSchema.optional(),
  include: todolistIncludeSchema.optional(),
  where: todolistWhereInputSchema.optional(),
  orderBy: z.union([ todolistOrderByWithRelationInputSchema.array(),todolistOrderByWithRelationInputSchema ]).optional(),
  cursor: todolistWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: TodolistScalarFieldEnumSchema.array().optional(),
}).strict()

export const todolistAggregateArgsSchema: z.ZodType<Prisma.TodolistAggregateArgs> = z.object({
  where: todolistWhereInputSchema.optional(),
  orderBy: z.union([ todolistOrderByWithRelationInputSchema.array(),todolistOrderByWithRelationInputSchema ]).optional(),
  cursor: todolistWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const todolistGroupByArgsSchema: z.ZodType<Prisma.TodolistGroupByArgs> = z.object({
  where: todolistWhereInputSchema.optional(),
  orderBy: z.union([ todolistOrderByWithAggregationInputSchema.array(),todolistOrderByWithAggregationInputSchema ]).optional(),
  by: TodolistScalarFieldEnumSchema.array(),
  having: todolistScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const todolistFindUniqueArgsSchema: z.ZodType<Prisma.todolistFindUniqueArgs> = z.object({
  select: todolistSelectSchema.optional(),
  include: todolistIncludeSchema.optional(),
  where: todolistWhereUniqueInputSchema,
}).strict()

export const todolistFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.todolistFindUniqueOrThrowArgs> = z.object({
  select: todolistSelectSchema.optional(),
  include: todolistIncludeSchema.optional(),
  where: todolistWhereUniqueInputSchema,
}).strict()

export const todoCreateArgsSchema: z.ZodType<Prisma.todoCreateArgs> = z.object({
  select: todoSelectSchema.optional(),
  include: todoIncludeSchema.optional(),
  data: z.union([ todoCreateInputSchema,todoUncheckedCreateInputSchema ]),
}).strict()

export const todoUpsertArgsSchema: z.ZodType<Prisma.todoUpsertArgs> = z.object({
  select: todoSelectSchema.optional(),
  include: todoIncludeSchema.optional(),
  where: todoWhereUniqueInputSchema,
  create: z.union([ todoCreateInputSchema,todoUncheckedCreateInputSchema ]),
  update: z.union([ todoUpdateInputSchema,todoUncheckedUpdateInputSchema ]),
}).strict()

export const todoCreateManyArgsSchema: z.ZodType<Prisma.todoCreateManyArgs> = z.object({
  data: todoCreateManyInputSchema.array(),
  skipDuplicates: z.boolean().optional(),
}).strict()

export const todoDeleteArgsSchema: z.ZodType<Prisma.todoDeleteArgs> = z.object({
  select: todoSelectSchema.optional(),
  include: todoIncludeSchema.optional(),
  where: todoWhereUniqueInputSchema,
}).strict()

export const todoUpdateArgsSchema: z.ZodType<Prisma.todoUpdateArgs> = z.object({
  select: todoSelectSchema.optional(),
  include: todoIncludeSchema.optional(),
  data: z.union([ todoUpdateInputSchema,todoUncheckedUpdateInputSchema ]),
  where: todoWhereUniqueInputSchema,
}).strict()

export const todoUpdateManyArgsSchema: z.ZodType<Prisma.todoUpdateManyArgs> = z.object({
  data: z.union([ todoUpdateManyMutationInputSchema,todoUncheckedUpdateManyInputSchema ]),
  where: todoWhereInputSchema.optional(),
}).strict()

export const todoDeleteManyArgsSchema: z.ZodType<Prisma.todoDeleteManyArgs> = z.object({
  where: todoWhereInputSchema.optional(),
}).strict()

export const todolistCreateArgsSchema: z.ZodType<Prisma.todolistCreateArgs> = z.object({
  select: todolistSelectSchema.optional(),
  include: todolistIncludeSchema.optional(),
  data: z.union([ todolistCreateInputSchema,todolistUncheckedCreateInputSchema ]),
}).strict()

export const todolistUpsertArgsSchema: z.ZodType<Prisma.todolistUpsertArgs> = z.object({
  select: todolistSelectSchema.optional(),
  include: todolistIncludeSchema.optional(),
  where: todolistWhereUniqueInputSchema,
  create: z.union([ todolistCreateInputSchema,todolistUncheckedCreateInputSchema ]),
  update: z.union([ todolistUpdateInputSchema,todolistUncheckedUpdateInputSchema ]),
}).strict()

export const todolistCreateManyArgsSchema: z.ZodType<Prisma.todolistCreateManyArgs> = z.object({
  data: todolistCreateManyInputSchema.array(),
  skipDuplicates: z.boolean().optional(),
}).strict()

export const todolistDeleteArgsSchema: z.ZodType<Prisma.todolistDeleteArgs> = z.object({
  select: todolistSelectSchema.optional(),
  include: todolistIncludeSchema.optional(),
  where: todolistWhereUniqueInputSchema,
}).strict()

export const todolistUpdateArgsSchema: z.ZodType<Prisma.todolistUpdateArgs> = z.object({
  select: todolistSelectSchema.optional(),
  include: todolistIncludeSchema.optional(),
  data: z.union([ todolistUpdateInputSchema,todolistUncheckedUpdateInputSchema ]),
  where: todolistWhereUniqueInputSchema,
}).strict()

export const todolistUpdateManyArgsSchema: z.ZodType<Prisma.todolistUpdateManyArgs> = z.object({
  data: z.union([ todolistUpdateManyMutationInputSchema,todolistUncheckedUpdateManyInputSchema ]),
  where: todolistWhereInputSchema.optional(),
}).strict()

export const todolistDeleteManyArgsSchema: z.ZodType<Prisma.todolistDeleteManyArgs> = z.object({
  where: todolistWhereInputSchema.optional(),
}).strict()

interface todoGetPayload extends HKT {
  readonly _A?: boolean | null | undefined | Prisma.todoArgs
  readonly type: Prisma.todoGetPayload<this['_A']>
}

interface todolistGetPayload extends HKT {
  readonly _A?: boolean | null | undefined | Prisma.todolistArgs
  readonly type: Prisma.todolistGetPayload<this['_A']>
}

export const tableSchemas = {
  todo: {
    fields: ["id","listid","text","completed"],
    relations: [
      new Relation("list", "listid", "id", "todolist", "todoTotodolist", "one"),
    ],
    modelSchema: (todoCreateInputSchema as any)
      .partial()
      .or((todoUncheckedCreateInputSchema as any).partial()),
    createSchema: todoCreateArgsSchema,
    createManySchema: todoCreateManyArgsSchema,
    findUniqueSchema: todoFindUniqueArgsSchema,
    findSchema: todoFindFirstArgsSchema,
    updateSchema: todoUpdateArgsSchema,
    updateManySchema: todoUpdateManyArgsSchema,
    upsertSchema: todoUpsertArgsSchema,
    deleteSchema: todoDeleteArgsSchema,
    deleteManySchema: todoDeleteManyArgsSchema
  } as TableSchema<
    z.infer<typeof todoCreateInputSchema>,
    Prisma.todoCreateArgs['data'],
    Prisma.todoUpdateArgs['data'],
    Prisma.todoFindFirstArgs['select'],
    Prisma.todoFindFirstArgs['where'],
    Prisma.todoFindUniqueArgs['where'],
    Omit<Prisma.todoInclude, '_count'>,
    Prisma.todoFindFirstArgs['orderBy'],
    Prisma.TodoScalarFieldEnum,
    todoGetPayload
  >,
  todolist: {
    fields: ["id","filter","editing"],
    relations: [
      new Relation("todo", "", "", "todo", "todoTotodolist", "many"),
    ],
    modelSchema: (todolistCreateInputSchema as any)
      .partial()
      .or((todolistUncheckedCreateInputSchema as any).partial()),
    createSchema: todolistCreateArgsSchema,
    createManySchema: todolistCreateManyArgsSchema,
    findUniqueSchema: todolistFindUniqueArgsSchema,
    findSchema: todolistFindFirstArgsSchema,
    updateSchema: todolistUpdateArgsSchema,
    updateManySchema: todolistUpdateManyArgsSchema,
    upsertSchema: todolistUpsertArgsSchema,
    deleteSchema: todolistDeleteArgsSchema,
    deleteManySchema: todolistDeleteManyArgsSchema
  } as TableSchema<
    z.infer<typeof todolistCreateInputSchema>,
    Prisma.todolistCreateArgs['data'],
    Prisma.todolistUpdateArgs['data'],
    Prisma.todolistFindFirstArgs['select'],
    Prisma.todolistFindFirstArgs['where'],
    Prisma.todolistFindUniqueArgs['where'],
    Omit<Prisma.todolistInclude, '_count'>,
    Prisma.todolistFindFirstArgs['orderBy'],
    Prisma.TodolistScalarFieldEnum,
    todolistGetPayload
  >,
}

export const dbSchema = new DbSchema(tableSchemas)
export type Electric = ElectricClient<typeof dbSchema>
