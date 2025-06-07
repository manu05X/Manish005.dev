import formidable from 'formidable'
import fs from 'fs'
import path from 'path'
import { v4 as uuidv4 } from 'uuid'

export const config = {
  api: {
    bodyParser: false,
  },
}

const uploadDir = path.join(process.cwd(), 'public/uploads')

// Ensure upload directory exists
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true })
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  try {
    const form = formidable({
      uploadDir,
      keepExtensions: true,
      maxFileSize: 5 * 1024 * 1024, // 5MB
      filter: ({ mimetype }) => {
        return mimetype && mimetype.includes('image/')
      },
    })

    const [fields, files] = await new Promise((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) reject(err)
        resolve([fields, files])
      })
    })

    const file = files.image
    if (!file) {
      return res.status(400).json({ message: 'No image file provided' })
    }

    // Generate unique filename
    const ext = path.extname(file.originalFilename)
    const filename = `${uuidv4()}${ext}`
    const newPath = path.join(uploadDir, filename)

    // Rename the file
    fs.renameSync(file.filepath, newPath)

    // Return the URL
    const imageUrl = `/uploads/${filename}`
    res.status(200).json({ imageUrl })
  } catch (error) {
    console.error('Error uploading image:', error)
    res.status(500).json({ message: 'Error uploading image' })
  }
} 