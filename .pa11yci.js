const host = process.env.NEXT_PUBLIC_HOST || 'http://localhost:3000';

module.exports = {
  defaults: {
    timeout: 5000,
  },
  urls: [host, `${host}/profile/346665059977527866/mumbles`, `${host}/profile/346665059977527866/likes`],
};
