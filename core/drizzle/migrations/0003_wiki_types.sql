CREATE TABLE IF NOT EXISTS "wiki_types" (
  "slug" text PRIMARY KEY,
  "name" text NOT NULL,
  "short_descriptor" text NOT NULL DEFAULT '',
  "descriptor" text NOT NULL DEFAULT '',
  "prompt" text NOT NULL DEFAULT '',
  "is_default" boolean NOT NULL DEFAULT false,
  "user_modified" boolean NOT NULL DEFAULT false,
  "created_at" timestamp DEFAULT now() NOT NULL,
  "updated_at" timestamp DEFAULT now() NOT NULL
);
