CREATE TABLE `players` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`first_name` text NOT NULL,
	`last_name` text NOT NULL,
	`number` integer NOT NULL,
	`position` text NOT NULL,
	`height_cm` integer NOT NULL,
	`weight_kg` integer NOT NULL,
	`age` integer NOT NULL,
	`created_at` text NOT NULL,
	`updated_at` text NOT NULL,
	`photo_URL` text
);
