import mongoose, { Schema, Document } from 'mongoose'

export interface IESignature extends Document {
  privateKey: string
  publicKey: string
  kid: string
  createdAt: Date
  updatedAt: Date
}

const ESignatureSchema: Schema = new Schema(
  {
    publicKey: { type: String, required: true },
    privateKey: { type: String, required: true, unique: true },
    kid: { type: String },
  },
  {
    timestamps: true
  }
)

export default mongoose.model<IESignature>('ESignature', ESignatureSchema)
