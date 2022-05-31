module.exports = {
  type: 'postgres',
  url: process.env.DATABASE_URL,
  entities: [process.env.ORM_ENTITIES_DIR],
  migrations: [process.env.ORM_MIGRATIONS_DIR],
  cli: {
    migrationsDir: 'src/shared/infra/typeorm/migrations',
  },
};
