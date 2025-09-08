import { relations } from "drizzle-orm";
import { integer, pgTable, timestamp, varchar } from "drizzle-orm/pg-core";


export const usersTable = pgTable("user", {
    user_id: integer("user_id").primaryKey().generatedAlwaysAsIdentity(),
    name: varchar("name", { length: 255 }).notNull(),
    email: varchar("email", { length: 255 }).notNull().unique(),
    hashed_password: varchar("hashed_password", { length: 255 }),
    google_id: varchar("google_id", { length: 255 }),
    created_at: timestamp("created_at").notNull().defaultNow(),
    updated_at: timestamp("updated_at").notNull().defaultNow(),
});

export const tasksTable = pgTable("task", {
    task_id: integer("task_id").primaryKey().generatedAlwaysAsIdentity(),
    task_title: varchar("task_title", { length: 255 }).notNull(),
    task_content: varchar("task_content", { length: 255 }).notNull(),
    user_id: integer("user_id")
        .notNull()
        .references(() => usersTable.user_id),
});

export const subtasksTable = pgTable("subtask", {
    subtask_id: integer("subtask_id").primaryKey().generatedAlwaysAsIdentity(),
    subtask_title: varchar("subtask_title", { length: 255 }).notNull(),
    subtask_content: varchar("subtask_content", { length: 255 }).notNull(),
    task_id: integer("task_id")
        .notNull()
        .references(() => tasksTable.task_id),
});


export const usersRelationsTable = relations(usersTable, ({ many }) => ({
    tasks: many(tasksTable),
}));

export const tasksRelationsTable = relations(tasksTable, ({ one, many }) => ({
    user: one(usersTable, {
        fields: [tasksTable.user_id],
        references: [usersTable.user_id],
    }),
    subtasks: many(subtasksTable),
}));

export const subtasksRelationsTable = relations(subtasksTable, ({ one }) => ({
    task: one(tasksTable, {
        fields: [subtasksTable.task_id],
        references: [tasksTable.task_id],
    }),
}));