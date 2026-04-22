import cron from 'node-cron'
import PujaBooking from '../models/PujaBooking.js'

export const startExpireReservationsJob = () => {
  cron.schedule('*/30 * * * *', async () => {
    try {
      const cutoff = new Date(Date.now() - 24 * 60 * 60 * 1000)
      const result = await PujaBooking.updateMany(
        { status: 'reserved', reservedAt: { $lte: cutoff } },
        { $set: { status: 'expired', expiredAt: new Date() } }
      )
      if (result.modifiedCount > 0)
        console.log(`[cron] Expired ${result.modifiedCount} puja reservation(s)`)
    } catch (err) {
      console.error('[cron] expireReservations error:', err)
    }
  })
  console.log('[cron] Reservation expiry job running every 30 minutes')
}
