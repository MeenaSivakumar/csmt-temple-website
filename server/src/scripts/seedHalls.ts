import 'dotenv/config'
import mongoose from 'mongoose'
import Hall from '../models/Hall.js'

const halls = [
  {
    name: 'Sri Murugan Hall',
    description: 'Main temple hall for large ceremonies and community gatherings.',
    capacity: 200,
    minBookingHours: 2,
    cleaningGapHours: 1,
  },
  {
    name: 'Amman Kalyana Mandapam',
    description: 'Smaller ceremonial hall ideal for intimate rituals and private functions.',
    capacity: 80,
    minBookingHours: 2,
    cleaningGapHours: 1,
  },
]

async function seed() {
  await mongoose.connect(process.env.MONGO_URI as string)
  for (const hall of halls) {
    const exists = await Hall.findOne({ name: hall.name })
    if (!exists) {
      await Hall.create(hall)
      console.log(`✅ Created: ${hall.name}`)
    } else {
      console.log(`⏭  Already exists: ${hall.name}`)
    }
  }
  await mongoose.disconnect()
  console.log('Done.')
}

seed().catch((err) => { console.error(err); process.exit(1) })
