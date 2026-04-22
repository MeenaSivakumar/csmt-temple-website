import 'dotenv/config'
import mongoose from 'mongoose'
import Puja from '../models/Puja.js'
import Priest from '../models/Priest.js'

const pujas = [
  { name: 'Ganapathi Homam', description: 'Removes obstacles and blesses new beginnings.', durationMinutes: 90, price: 1500 },
  { name: 'Satyanarayana Puja', description: 'For prosperity and fulfilment of wishes.', durationMinutes: 120, price: 1200 },
  { name: 'Navagraha Homam', description: 'Propitiate nine planets for health and success.', durationMinutes: 180, price: 3000 },
  { name: 'Ayush Homam', description: 'Performed on birthdays for long life and good health.', durationMinutes: 120, price: 2000 },
  { name: 'Rudra Abhishekam', description: 'Sacred bathing ritual of Lord Shiva.', durationMinutes: 60, price: 800 },
]

const priests = [
  { name: 'Pandit Subramanian K.', bio: 'Expert in Vedic rituals with 20+ years of experience.' },
  { name: 'Pandit Raghunathan V.', bio: 'Specialises in Tamil and Sanskrit agamic rituals.' },
  { name: 'Pandit Krishnaswamy A.', bio: 'Certified in Shaiva and Vaishnava traditions.' },
]

async function seed() {
  await mongoose.connect(process.env.MONGO_URI as string)
  for (const p of pujas) {
    if (!(await Puja.findOne({ name: p.name }))) { await Puja.create(p); console.log(`✅ Puja: ${p.name}`) }
    else console.log(`⏭  Puja exists: ${p.name}`)
  }
  for (const p of priests) {
    if (!(await Priest.findOne({ name: p.name }))) { await Priest.create(p); console.log(`✅ Priest: ${p.name}`) }
    else console.log(`⏭  Priest exists: ${p.name}`)
  }
  await mongoose.disconnect()
  console.log('Done.')
}

seed().catch((err) => { console.error(err); process.exit(1) })
