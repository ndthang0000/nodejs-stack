import mongoose, { Schema, Document } from 'mongoose'

export interface IESignature extends Document {
  privateKey: string
  publicKey: string
  keyid: number
  createdAt: Date
  updatedAt: Date
}

const ESignatureSchema: Schema = new Schema(
  {
    publicKey: { type: String, required: true },
    privateKey: { type: String, required: true, unique: true },
    keyid: { type: Number },
  },
  {
    timestamps: true
  }
)

export default mongoose.model<IESignature>('ESignature', ESignatureSchema)
