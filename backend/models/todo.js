import { Schema, model } from 'mongoose'

const todoSchema = new Schema({
    text: {
        type: String,
        required: [true, 'Todo text is required'],
        trim: true,
        minlength: [1, 'Todo text must be at least 1 character long'],
        maxlength: [200, 'Todo text cannot exceed 200 characters']
    },
    complete: {
        type: Boolean,
        default: false,
        index: true // Index for faster queries on completion status
    },
    priority: {
        type: String,
        enum: ['low', 'medium', 'high'],
        default: 'medium'
    },
    category: {
        type: String,
        enum: ['work', 'personal', 'shopping', 'health', 'other'],
        default: 'other'
    },
    dueDate: {
        type: Date,
        default: null
    },
    createdAt: {
        type: Date,
        default: Date.now,
        immutable: true // Cannot be modified after creation
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true, // Automatically manage createdAt and updatedAt
    versionKey: false // Remove __v field
})

// Add text index for potential search functionality
todoSchema.index({ text: 'text' })

// Update the updatedAt timestamp before saving
todoSchema.pre('save', function(next) {
    this.updatedAt = new Date()
    next()
})

export const Todo = model("todo", todoSchema)