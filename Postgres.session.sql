CREATE DOMAIN long_name 
  AS VARCHAR(50)
  CONSTRAINT name_too_short CHECK(length(VALUE) > 3);
  
CREATE DOMAIN email AS VARCHAR(80)
  CONSTRAINT at_sign CHECK(VALUE ~ '.*@.*');

CREATE TABLE "user" (
  id SERIAL PRIMARY KEY,
  username long_name UNIQUE,
  email email UNIQUE NOT NULL,
  first_name long_name NOT NULL,
  last_name long_name NOT NULL,
  password long_name NOT NULL,
  listen_count INTEGER NOT NULL DEFAULT 0,
  creation_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TYPE insert_user_return AS (
  id INTEGER,
  creation_date TIMESTAMP
);

CREATE TABLE "song" (
  id SERIAL PRIMARY KEY,
  title VARCHAR(100),
  duration INTEGER,
  listen_count INTEGER NOT NULL DEFAULT 0,
  creation_date TIMESTAMP
    DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE "playlist" (
  id SERIAL PRIMARY KEY,
  title long_name,
  description VARCHAR(200),
  duration INTEGER,
  listen_count INTEGER NOT NULL DEFAULT 0,
  creation_date TIMESTAMP
    DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE "album" (
  id SERIAL PRIMARY KEY,
  title long_name,
  song_count INT,
  duration INTEGER, 
  listen_count INTEGER NOT NULL DEFAULT 0,
  creation_date TIMESTAMP
    DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE "artist" (
  id SERIAL PRIMARY KEY,
  title long_name,
  song_count INTEGER,
  album_count INTEGER,
  listen_count INTEGER NOT NULL DEFAULT 0,
  creation_date TIMESTAMP
    DEFAULT CURRENT_TIMESTAMP
);

CREATE TYPE "entity_types" AS ENUM(
  'song',
  'playlist',
  'album'
);

CREATE TABLE "history" (
  id SERIAL PRIMARY KEY,
  entity_type entity_types,
  entity_id SERIAL,
  creation_date TIMESTAMP
    DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE "stats" (
  song_count INTEGER NOT NULL DEFAULT 0,
  playlist_count INTEGER NOT NULL DEFAULT 0,
  artist_count INTEGER NOT NULL DEFAULT 0,
  duration INTEGER NOT NULL DEFAULT 0
);

CREATE FUNCTION "check_history_entity_types"() 
  RETURNS TRIGGER
  LANGUAGE plpgsql
  AS $$
DECLARE
  error BOOLEAN = FALSE;
BEGIN
  IF NEW.entity_type = 'song' THEN
    IF NOT EXISTS (
      SELECT 1 FROM "song" WHERE id = NEW.entity_id
    ) THEN
      error = TRUE;
    END IF;
  ELSIF NEW.entity_type = 'album' THEN
    IF NOT EXISTS (
      SELECT 1 FROM "album" WHERE id = NEW.entity_id
    ) THEN
      error = TRUE;
    END IF;
  ELSIF NEW.entity_type = 'playlist' THEN
    IF NOT EXISTS (
      SELECT 1 FROM "playlist" WHERE id = NEW.entity_id
      ) THEN
      error = TRUE;
    END IF;
  END IF;
  IF error THEN
      RAISE EXCEPTION 'Invalid id % for entity %', NEW.entity_type, NEW.entity_id;
  END IF;
  RETURN NEW;
END;
$$;

CREATE TRIGGER "history_conditional_entity_fk" 
BEFORE INSERT OR UPDATE ON "history"
FOR EACH ROW
EXECUTE FUNCTION "check_history_entity_types"();

CREATE TABLE "USER_PLAYLIST" (
  user_id SERIAL,
  playlist_id SERIAL,
  CONSTRAINT user_id_fk 
    FOREIGN KEY ("user_id") REFERENCES "user" ("id"),
  CONSTRAINT playlist_id_fk
    FOREIGN KEY ("playlist_id") REFERENCES "playlist" ("id")
);

CREATE TABLE "USER_HISTORY" (
  user_id SERIAL,
  history_id SERIAL,
  CONSTRAINT user_id_fk
    FOREIGN KEY ("user_id") REFERENCES "user" ("id"),
  CONSTRAINT history_id_fk
    FOREIGN KEY ("history_id") REFERENCES "history" ("id")
);

CREATE TABLE "ARTIST_ALBUM" (
  artist_id SERIAL,
  album_id SERIAL,
  CONSTRAINT artist_id_fk
    FOREIGN KEY ("artist_id")
    REFERENCES "artist" ("id"),
  CONSTRAINT album_id_fk
    FOREIGN KEY ("album_id")
    REFERENCES "album" ("id")
);

CREATE TABLE "ALBUM_SONG" (
  album_id SERIAL,
  song_id SERIAL,
  CONSTRAINT album_id_fk
    FOREIGN KEY ("album_id")
    REFERENCES "album" ("id"),
  CONSTRAINT song_id_fk
    FOREIGN KEY ("song_id")
    REFERENCES "song" ("id")
);

CREATE TABLE "PLAYLIST_SONG" (
  playlist_id SERIAL,
  song_id SERIAL,
  CONSTRAINT playlist_id_fk
    FOREIGN KEY ("playlist_id")
    REFERENCES "playlist" ("id"),
  CONSTRAINT song_id_fk
    FOREIGN KEY ("song_id")
    REFERENCES "song" ("id")
);

CREATE FUNCTION insert_user(
  username "user"."username"%TYPE,
  password "user"."password"%TYPE,
  email "user"."email"%TYPE,
  first_name "user"."first_name"%TYPE,
  last_name "user"."last_name"%TYPE
)
  RETURNS SETOF insert_user_return
  LANGUAGE PLPGSQL
  AS $$
BEGIN
  RETURN QUERY INSERT INTO "user" 
    ("username", "password", "email", "first_name", "last_name") 
  VALUES
    (username, password, email, first_name, last_name)
  RETURNING
    id, 
    creation_date
  ;
END;
$$;

DROP FUNCTION "update_song_stats" CASCADE;

CREATE FUNCTION "update_song_stats"()
  RETURNS TRIGGER
  LANGUAGE PLPGSQL
  AS $$
BEGIN
  UPDATE "stats" SET 
      "song_count" = "song_count" + 1,
      "duration" = "duration" + NEW.duration
  ;
  RETURN NEW;
END;
$$;

CREATE TRIGGER "update_song_stats"
  BEFORE INSERT ON "song"
  FOR EACH ROW
  EXECUTE FUNCTION "update_song_stats"();

INSERT INTO "song" ("title", "duration")
  VALUES
    ('utku', 100),
    ('ban', 100)
;
-- 
-- INSERT INTO "stats" ("song_count") VALUES (0);

  -- song_count INTEGER NOT NULL DEFAULT 0,
  -- playlist_count INTEGER NOT NULL DEFAULT 0,
  -- artist_count INTEGER NOT NULL DEFAULT 0,
  -- duration INTEGER NOT NULL DEFAULT 0

SELECT * FROM "song";
SELECT * FROM "stats";
  
CREATE TYPE "insert_song_return" (
  "song_id" INT,
  "album_id" INT,
  "artist_id" INT,
  "creation_date" TIMESTAMP
);
  
CREATE FUNCTION "insert_song"(

)
  RETURNS SETOF "insert_song_return"
  LANGUAGE PLPGSQL
BEGIN
  START TRANSACTION

  COMMIT;
END;
$$

-- SELECT * FROM insert_user('catdog', 'cat-dog', 'utkusarioglu@hotmail.com', 'utku', 'sarioglu'); 
