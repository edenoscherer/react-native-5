/**
 * @typedef {Object} UserAddressModel
 * @property {string} ComplementaryAddress
 * @property {string} Number
 * @property {string} Street
 * @property {string} ZipCode
 * @property {string} id
 */

/**
 * @typedef {Object} UserModel
 * @property {UserAddressModel} address
 * @property {Date|string} birthday
 * @property {string} challenge_submission_hash
 * @property {number} city_change
 * @property {number} coding_experience
 * @property {any[]} company
 * @property {Date|string} created_at
 * @property {string} documents
 * @property {number} education_level
 * @property {string} email
 * @property {number} english_proficiency
 * @property {string} first_name
 * @property {number} gender
 * @property {string} github
 * @property {string} id
 * @property {string} interest
 * @property {string[]} language
 * @property {string} last_name
 * @property {string} linkedin
 * @property {string} nickname
 * @property {{installed_cli: boolean}} onboarding
 * @property {string} phone
 * @property {string} picture
 * @property {string} programming_level
 * @property {number} remote_work
 * @property {string} token
 * @property {number} type
 * @property {string} university
 * @property {Date|string} updated_at
 * @property {Date|string} validated_at
 */

/**
 * @typedef {Object} AccelerationModel
 * @property {string} slug
 * @property {string} alias
 * @property {string} name
 * @property {string} is_disabled
 * @property {string|Date} subscription_start_at
 * @property {string|Date} subscription_finish_at
 * @property {string|Date} start_at
 * @property {string|Date} finish_at
 * @property {string} location
 * @property {string} banner_url
 * @property {string} home_banner_url
 * @property {string} color_scheme
 * @property {number} company_count
 */
