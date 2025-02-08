CREATE TABLE IF NOT EXISTS Subscriptions (
    id text NOT NULL,
    domain text NOT NULL,
    timestamp timestamp NOT NULL,
    subscriptions text,
    PRIMARY KEY (id, domain)
);