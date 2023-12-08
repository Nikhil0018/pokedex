import { EnvironmentModel } from './models/environment.model';

export const environment: EnvironmentModel = {
  flags: {
    production: false,
  },

  pokeapi: {
    base: 'https://pokeapi.co/api/v2/',
  },
};
