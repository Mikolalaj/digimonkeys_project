BEGIN;

CREATE EXTENSION "uuid-ossp";

CREATE TABLE users
(
    user_id uuid NOT NULL DEFAULT uuid_generate_v4(),
    username character varying(100) NOT NULL,
    password character varying(100) NOT NULL,
    first_name character varying(100) NOT NULL,
    PRIMARY KEY (user_id),
    CONSTRAINT users_uq UNIQUE (username)
);

ALTER TABLE IF EXISTS users
    OWNER to digimonkeys;

INSERT INTO users
VALUES
	('2020766e-e720-402d-9680-a99ced11d066', 'user', '$2a$12$zxC/pVKk9tgXqJxZxqHbpuIo33MYQnUf8i.CoB4o4jvUVFSK4aNZ6', 'Mikolaj');


CREATE TABLE videos
(
    video_id uuid DEFAULT uuid_generate_v4() NOT NULL,
    user_id uuid NOT NULL,
    url character varying(200) NOT NULL,
    liked boolean DEFAULT false NOT NULL,
    add_date timestamp without time zone DEFAULT date_trunc('second'::text, (CURRENT_TIMESTAMP)::timestamp without time zone) NOT NULL,
    service_name character varying(200),
	PRIMARY KEY (video_id),
	CONSTRAINT user_fk FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

ALTER TABLE IF EXISTS videos
    OWNER to digimonkeys;


INSERT INTO videos VALUES ('aa347d14-ea3d-403e-96dc-a12e4c1c7c94', '2020766e-e720-402d-9680-a99ced11d066', 'yJuV8PDwvC8', true, '2022-05-27 16:56:24', 'YouTube');
INSERT INTO videos VALUES ('b00a8e57-81a1-40a6-b5a3-5ed206dc3600', '2020766e-e720-402d-9680-a99ced11d066', 'IXXxciRUMzE', false, '2022-05-27 16:57:17', 'YouTube');
INSERT INTO videos VALUES ('acfe74c5-bd24-4d6f-80f2-2b1a31110375', '2020766e-e720-402d-9680-a99ced11d066', 'soRjcajliHE', false, '2022-05-27 16:58:00', 'YouTube');
INSERT INTO videos VALUES ('59e0cc7d-d035-492a-81e7-8a41a82a8861', '2020766e-e720-402d-9680-a99ced11d066', 'PNWsW6c6t8g', true, '2022-05-27 16:58:47', 'YouTube');
INSERT INTO videos VALUES ('8d0d2854-29ea-48b5-8669-2105138b6599', '2020766e-e720-402d-9680-a99ced11d066', 'LrSX_OcpeJg', false, '2022-05-27 16:58:11', 'YouTube');
INSERT INTO videos VALUES ('f910e973-6f5b-423e-a256-3ec0f1f301a7', '2020766e-e720-402d-9680-a99ced11d066', 'qolmz4FlnZ0', false, '2022-05-27 16:58:37', 'YouTube');
INSERT INTO videos VALUES ('8f32b902-1948-488e-abd5-63e5436e84ef', '2020766e-e720-402d-9680-a99ced11d066', 'J0DjcsK_-HY', true, '2022-05-27 16:59:08', 'YouTube');
INSERT INTO videos VALUES ('55af43ad-a54d-41db-8c9b-799e0980e5ba', '2020766e-e720-402d-9680-a99ced11d066', 'WJ9-xN6dCW4', true, '2022-05-27 16:57:47', 'YouTube');
INSERT INTO videos VALUES ('fdacfd5d-0eef-4abb-8da9-e617fde379a1', '2020766e-e720-402d-9680-a99ced11d066', 'L62LtChAwww', true, '2022-05-27 16:57:36', 'YouTube');
INSERT INTO videos VALUES ('e9dda2ae-126e-43e3-ad90-b27e21eceed0', '2020766e-e720-402d-9680-a99ced11d066', 'QnxpHIl5Ynw', false, '2022-05-27 16:58:57', 'YouTube');
INSERT INTO videos VALUES ('ca32f3d5-592f-4311-8c1f-64a8585e5a2e', '2020766e-e720-402d-9680-a99ced11d066', 'WdrNXRdkuG4', false, '2022-05-27 16:56:50', 'YouTube');
INSERT INTO videos VALUES ('bdb4f96f-cbff-467d-91e2-dd001f2169ce', '2020766e-e720-402d-9680-a99ced11d066', 'LwXQ7WUh-D0', false, '2022-05-27 16:59:15', 'YouTube');
INSERT INTO videos VALUES ('b9f6444e-e043-4ae5-b015-a58cd9d57a07', '2020766e-e720-402d-9680-a99ced11d066', '1uFv9Ts7Sdw', true, '2022-05-27 16:58:23', 'YouTube');
INSERT INTO videos VALUES ('88ad5271-e190-46c2-8587-d9ca25d71109', '2020766e-e720-402d-9680-a99ced11d066', 'xzH6toY_EPw', false, '2022-05-27 16:59:38', 'YouTube');
INSERT INTO videos VALUES ('bd5a5777-e251-4775-80c0-da269035d613', '2020766e-e720-402d-9680-a99ced11d066', 'k-9DOwrLdkg', false, '2022-05-29 13:34:07', 'YouTube');
INSERT INTO videos VALUES ('b56ad17d-9eb5-41f1-9704-f08218afcd16', '2020766e-e720-402d-9680-a99ced11d066', 'bRoVXGRm5-Q', true, '2022-05-30 21:21:13', 'YouTube');
INSERT INTO videos VALUES ('7a86393b-8c36-4efd-a4e6-ac4227320789', '2020766e-e720-402d-9680-a99ced11d066', 'P103bWMdvtA', false, '2022-05-30 21:21:46', 'YouTube');
INSERT INTO videos VALUES ('848a266a-2c58-4c75-bcb7-f68c84eba531', '2020766e-e720-402d-9680-a99ced11d066', '5kYsxoWfjCg', true, '2022-05-29 13:49:07', 'YouTube');
INSERT INTO videos VALUES ('77abdd1e-a352-4ca1-bd09-b65a691856b3', '2020766e-e720-402d-9680-a99ced11d066', 'Tw0zYd0eIlk', false, '2022-05-29 13:37:32', 'YouTube');
INSERT INTO videos VALUES ('f6c109e7-ce20-4236-921c-778dc1df3563', '2020766e-e720-402d-9680-a99ced11d066', '2CSWw2OVxio', false, '2022-05-31 15:30:03', 'YouTube');
INSERT INTO videos VALUES ('0e77307b-68b5-4c3b-9b90-7cc53b3935c7', '2020766e-e720-402d-9680-a99ced11d066', 'H5v3kku4y6Q', false, '2022-05-31 15:50:55', 'YouTube');
INSERT INTO videos VALUES ('22bf59d4-6258-4603-9117-98a3759f9987', '2020766e-e720-402d-9680-a99ced11d066', 'H5v3kku4y6Q', false, '2022-05-31 15:51:50', 'YouTube');

COMMIT;