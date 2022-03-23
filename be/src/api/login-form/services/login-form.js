'use strict';

/**
 * login-form service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::login-form.login-form');
