CREATE TABLE "UsersTable" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"username" varchar(230) NOT NULL
);
