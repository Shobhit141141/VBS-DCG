const multer = require('multer');
const fs = require('fs');
const path = require('path');

// Define the directory path
const uploadDir = path.join(__dirname, '..', 'public', 'uploads');

// Ensure the public/uploads directory exists
if (!fs.existsSync(uploadDir)) {
  try {
    fs.mkdirSync(uploadDir, { recursive: true });
    console.log('Upload directory created successfully.');
  } catch (err) {
    console.error('Error creating upload directory:', err);
    // Handle error appropriately, such as logging or throwing an exception
    // Note: You may want to throw the error to propagate it back to the calling code
    throw err;
  }
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir); // Folder where the images will be stored
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const uploadImg = multer({ storage: storage });

module.exports = { uploadImg };
