import mongoose, { Schema, Document } from 'mongoose';

export interface PokemonInterface extends Document {
  name: string;
  nickname: string
  evolution?: string;
}

const PokemonSchema: Schema = new Schema({
  name: { type: String, required: true, unique: true },
  nickname: { type: String, required: true, unique: false},
  evolution: { type: String, required: false },
});

export default mongoose.model<PokemonInterface>('Pokemon', PokemonSchema);