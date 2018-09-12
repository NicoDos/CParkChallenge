import mongoose from 'mongoose';

const reportSchema = mongoose.Schema({
  id: { type: Number, index: true },
  title: { type: String, required: true },
  time: { type: Date, required: true },
  position: {
    type: { type: String, enum: ['Point'] },
    coordinates: { type: [Number], required: true },
  },
});

reportSchema.index({ position: '2dsphere' });

export default mongoose.model('Report', reportSchema);
