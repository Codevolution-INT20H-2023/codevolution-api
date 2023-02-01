export default () => ({
  security: {
    secret: process.env.SECRET,
    jwt: {
      ttl: process.env.JWT_TTL ?? '86400s',
      refreshTtl: process.env.JWT_REFRESH_TTL ?? '1209600s',
    },
  },
});
