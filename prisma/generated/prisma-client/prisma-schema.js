module.exports = {
        typeDefs: // Code generated by Prisma (prisma@1.34.0). DO NOT EDIT.
  // Please don't change this file manually but run `prisma generate` to update it.
  // For more information, please read the docs: https://www.prisma.io/docs/prisma-client/

/* GraphQL */ `type AggregateTask {
  count: Int!
}

type BatchPayload {
  count: Long!
}

scalar DateTime

scalar Long

type Mutation {
  createTask(data: TaskCreateInput!): Task!
  updateTask(data: TaskUpdateInput!, where: TaskWhereUniqueInput!): Task
  updateManyTasks(data: TaskUpdateManyMutationInput!, where: TaskWhereInput): BatchPayload!
  upsertTask(where: TaskWhereUniqueInput!, create: TaskCreateInput!, update: TaskUpdateInput!): Task!
  deleteTask(where: TaskWhereUniqueInput!): Task
  deleteManyTasks(where: TaskWhereInput): BatchPayload!
}

enum MutationType {
  CREATED
  UPDATED
  DELETED
}

interface Node {
  id: ID!
}

type PageInfo {
  hasNextPage: Boolean!
  hasPreviousPage: Boolean!
  startCursor: String
  endCursor: String
}

type Query {
  task(where: TaskWhereUniqueInput!): Task
  tasks(where: TaskWhereInput, orderBy: TaskOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Task]!
  tasksConnection(where: TaskWhereInput, orderBy: TaskOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): TaskConnection!
  node(id: ID!): Node
}

type Subscription {
  task(where: TaskSubscriptionWhereInput): TaskSubscriptionPayload
}

type Task {
  id: ID!
  type: TaskType!
  group: String!
  date: DateTime!
  subject: String
  professor: String
  title: String
  description: String
}

type TaskConnection {
  pageInfo: PageInfo!
  edges: [TaskEdge]!
  aggregate: AggregateTask!
}

input TaskCreateInput {
  id: ID
  type: TaskType!
  group: String!
  date: DateTime!
  subject: String
  professor: String
  title: String
  description: String
}

type TaskEdge {
  node: Task!
  cursor: String!
}

enum TaskOrderByInput {
  id_ASC
  id_DESC
  type_ASC
  type_DESC
  group_ASC
  group_DESC
  date_ASC
  date_DESC
  subject_ASC
  subject_DESC
  professor_ASC
  professor_DESC
  title_ASC
  title_DESC
  description_ASC
  description_DESC
}

type TaskPreviousValues {
  id: ID!
  type: TaskType!
  group: String!
  date: DateTime!
  subject: String
  professor: String
  title: String
  description: String
}

type TaskSubscriptionPayload {
  mutation: MutationType!
  node: Task
  updatedFields: [String!]
  previousValues: TaskPreviousValues
}

input TaskSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: TaskWhereInput
  AND: [TaskSubscriptionWhereInput!]
  OR: [TaskSubscriptionWhereInput!]
  NOT: [TaskSubscriptionWhereInput!]
}

enum TaskType {
  EXAM
  HOMEWORK
  MISSING
  OTHER
}

input TaskUpdateInput {
  type: TaskType
  group: String
  date: DateTime
  subject: String
  professor: String
  title: String
  description: String
}

input TaskUpdateManyMutationInput {
  type: TaskType
  group: String
  date: DateTime
  subject: String
  professor: String
  title: String
  description: String
}

input TaskWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  type: TaskType
  type_not: TaskType
  type_in: [TaskType!]
  type_not_in: [TaskType!]
  group: String
  group_not: String
  group_in: [String!]
  group_not_in: [String!]
  group_lt: String
  group_lte: String
  group_gt: String
  group_gte: String
  group_contains: String
  group_not_contains: String
  group_starts_with: String
  group_not_starts_with: String
  group_ends_with: String
  group_not_ends_with: String
  date: DateTime
  date_not: DateTime
  date_in: [DateTime!]
  date_not_in: [DateTime!]
  date_lt: DateTime
  date_lte: DateTime
  date_gt: DateTime
  date_gte: DateTime
  subject: String
  subject_not: String
  subject_in: [String!]
  subject_not_in: [String!]
  subject_lt: String
  subject_lte: String
  subject_gt: String
  subject_gte: String
  subject_contains: String
  subject_not_contains: String
  subject_starts_with: String
  subject_not_starts_with: String
  subject_ends_with: String
  subject_not_ends_with: String
  professor: String
  professor_not: String
  professor_in: [String!]
  professor_not_in: [String!]
  professor_lt: String
  professor_lte: String
  professor_gt: String
  professor_gte: String
  professor_contains: String
  professor_not_contains: String
  professor_starts_with: String
  professor_not_starts_with: String
  professor_ends_with: String
  professor_not_ends_with: String
  title: String
  title_not: String
  title_in: [String!]
  title_not_in: [String!]
  title_lt: String
  title_lte: String
  title_gt: String
  title_gte: String
  title_contains: String
  title_not_contains: String
  title_starts_with: String
  title_not_starts_with: String
  title_ends_with: String
  title_not_ends_with: String
  description: String
  description_not: String
  description_in: [String!]
  description_not_in: [String!]
  description_lt: String
  description_lte: String
  description_gt: String
  description_gte: String
  description_contains: String
  description_not_contains: String
  description_starts_with: String
  description_not_starts_with: String
  description_ends_with: String
  description_not_ends_with: String
  AND: [TaskWhereInput!]
  OR: [TaskWhereInput!]
  NOT: [TaskWhereInput!]
}

input TaskWhereUniqueInput {
  id: ID
}
`
      }
    