ALTER TABLE "contentTable" ADD COLUMN "createdAt" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "contentTable" ADD COLUMN "updatedAt" timestamp DEFAULT now() NOT NULL;