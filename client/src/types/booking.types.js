/**
 * @typedef {Object} HallBooking
 * @property {string} _id
 * @property {string} hall
 * @property {string} date
 * @property {string} startTime
 * @property {string} endTime
 * @property {string} userId
 * @property {'pending'|'confirmed'|'rejected'|'cancelled'} status
 * @property {string} [confirmedAt]
 * @property {string} [confirmedBy]
 * @property {string} createdAt
 */

/**
 * @typedef {Object} PujaBooking
 * @property {string} _id
 * @property {string} pujaId
 * @property {string|null} priestId
 * @property {string} userId
 * @property {'onsite'|'private'} type
 * @property {string} datetime
 * @property {'reserved'|'confirmed'|'expired'|'cancelled'} status
 * @property {string} reservedAt
 * @property {string} [confirmedAt]
 * @property {string} createdAt
 */
