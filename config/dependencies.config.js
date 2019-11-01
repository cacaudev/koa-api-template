'use strict';

import awilix from 'awilix';
import LocaleService from '../src/services/locale.service.js';

const container = awilix.createContainer();

container
  .register({
    localeService: awilix.asClass(LocaleService, { lifetime: awilix.Lifetime.SINGLETON })
  })
  .register({
    i18nProvider: awilix.asValue()
  });

export default container;
