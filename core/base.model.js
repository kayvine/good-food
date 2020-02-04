import mongoose, { Schema } from 'mongoose';

const baseSchema = new mongoose.Schema(
    {
        createdBy: { type: Schema.ObjectId, ref: 'User' },
        lastModifiedBy: { type: Schema.ObjectId, ref: 'User' },
        deletedOn: Date,
        deletedBy: { type: Schema.ObjectId, ref: 'User' },
    },
    {
        timestamps: {
            createdAt: 'createdOn',
            updatedAt: 'lastModifiedOn'
        }
    }
);

export default mongoose.model('Base', baseSchema);
