-- Enable pgcrypto for UUID generation used by Payload CMS
-- Must run before any table creation migrations

CREATE EXTENSION IF NOT EXISTS pgcrypto;
