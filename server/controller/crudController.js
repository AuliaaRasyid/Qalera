const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const allowedImageFileType = ['image/jpeg', 'image/png', 'image/jpg', 'image/svg'];
const allowedTextFileType = ['application/pdf'];
const MAX_IMG_SIZE = 2 * 1024 * 1024; // 2MB limit
const MAX_PDF_SIZE = 5 * 1024 * 1024; // 5MB limit

// Reusable function to create multer storage configuration
const createStorage = (folderName) => multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, `uploads/${folderName}`);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

// file filter
const fileImageFilter = (req, file, cb) => {
    if (allowedImageFileType.includes(file.mimetype)) {
        cb(null, true);
    } else {
        req.fileValidationError = 'Invalid file type, please upload a valid image file.';
        cb(null, false);
    }
};

const fileTextFilter = (req, file, cb) => {
    if (allowedTextFileType.includes(file.mimetype)) {
        cb(null, true);
    } else {
        req.fileValidationError = 'Invalid file type, please upload a valid pdf file.';
        cb(null, false);
    }
};

// Reusable function for image upload middleware
const uploadImage = (folderName) => multer({
    storage: createStorage(folderName),
    fileFilter: fileImageFilter,
    limits: { fileSize: MAX_IMG_SIZE }
}).single(`${folderName}Image`); //for image the field last name must be 'Image'

// Reusable function for text upload middleware
const uploadPDF = (folderName) => multer({
    storage: createStorage(folderName),
    fileFilter: fileTextFilter,
    limits: { fileSize: MAX_PDF_SIZE }
}).single(`${folderName}Text`); //for text related (pdf, docx, etc) the field last name must be 'Text'

const handleFileDeletion = (folderName, filename) => {
    const filePath = path.resolve(__dirname, '..', 'uploads', folderName, filename);
    fs.unlink(filePath, (err) => {
        if (err) {
            console.error('Error deleting file:', err);
        }
    });
};

// Reusable function for creating CRUD operations with dynamic fields
const createCRUD = (modelName, folderName, config) => {
    const addItem = async (req, res) => {
        if (req.fileValidationError) {
            return res.status(400).json({ message: req.fileValidationError });
        }

        const data = {};
        // Populate data object with dynamic fields
        for (const field of config.fields) {
            if (field.type === 'file') {
                data[field.name] = req.file ? req.file.filename : null;
            } else if (field.type === 'date' && req.body[field.name]) {
                data[field.name] = new Date(req.body[field.name]).toISOString();
            } else {
                data[field.name] = req.body[field.name];
            }
        }

        // Validate required fields
        const missingFields = config.fields.filter(field => !data[field.name] && field.required);
        if (missingFields.length > 0) {
            return res.status(400).json({ message: `Missing required fields: ${missingFields.map(f => f.name).join(', ')}` });
        }
    
        try {
            // For Applier model, check if the Career exists
            if (modelName === 'applier') {
                const career = await prisma.career.findUnique({
                    where: { careerId: data.careerId },
                });
                if (!career) {
                    return res.status(400).json({ message: 'Invalid careerId. Career not found.' });
                }
            }
    
            const item = await prisma[modelName].create({ data });
            res.status(201).json({ message: 'Item created successfully', item });
        } catch (error) {
            console.error(`Error adding ${modelName}:`, error);
            res.status(500).json({ message: 'Internal server error' });
        }
    };

    const getAllItems = async (req, res) => {
        try {
            const items = await prisma[modelName].findMany();
            res.status(200).json(items);
        } catch (error) {
            console.error(`Error fetching ${modelName}:`, error);
            res.status(500).json({ message: 'Internal server error' });
        }
    };

    const getItemById = async (req, res) => {
        const itemId = req.params.id;
        try {
            const item = await prisma[modelName].findUnique({
                where: { [`${modelName}Id`]: itemId },
            });
            if (!item) return res.status(404).json({ message: `${modelName} not found` });
            res.status(200).json(item);
        } catch (error) {
            console.error(`Error fetching ${modelName}:`, error);
            res.status(500).json({ message: 'Internal server error' });
        }
    };

    const editItem = async (req, res) => {
        if (req.fileValidationError) {
            return res.status(400).json({ message: req.fileValidationError });
        }

        const data = {};
        for (const field of config.fields) {
            if (field.type === 'file') {
                // Only update the file field if a new file is uploaded
                if (req.file) {
                    data[field.name] = req.file.filename;
                }
            } else if (field.type === 'date' && req.body[field.name]) {
                data[field.name] = new Date(req.body[field.name]).toISOString();
            } else if (req.body[field.name] !== undefined) {
                // Only update fields that are provided in the request body
                data[field.name] = req.body[field.name];
            }
        }

        // Remove the file field from required fields for updates
        const requiredFields = config.fields.filter(field => field.required && field.type !== 'file');
        const missingFields = requiredFields.filter(field => !data[field.name] && !req.body[field.name]);
        if (missingFields.length > 0) {
            return res.status(400).json({ message: `Missing required fields: ${missingFields.map(f => f.name).join(', ')}` });
        }

        const itemId = req.params.id;

        try {
            const existingItem = await prisma[modelName].findUnique({
                where: { [`${modelName}Id`]: itemId },
            });
            if (!existingItem) return res.status(404).json({ message: `${modelName} not found` });

            // Delete old file if a new one is uploaded
            for (const field of config.fields) {
                if (field.type === 'file' && req.file && existingItem[field.name]) {
                    handleFileDeletion(folderName, existingItem[field.name]);
                }
            }

            const item = await prisma[modelName].update({
                where: { [`${modelName}Id`]: itemId },
                data,
            });

            res.status(200).json(item);
        } catch (error) {
            console.error(`Error editing ${modelName}:`, error);
            res.status(500).json({ message: 'Internal server error' });
        }
    };

    const deleteItem = async (req, res) => {
        const itemId = req.params.id;
        try {
            const existingItem = await prisma[modelName].findUnique({
                where: { [`${modelName}Id`]: itemId },
            });
            if (!existingItem) return res.status(404).json({ message: `${modelName} not found` });

            // Delete file
            for (const field of config.fields) {
                if (field.type === 'file' && existingItem[field.name]) {
                    handleFileDeletion(folderName, existingItem[field.name]);
                }
            }

            const item = await prisma[modelName].delete({
                where: { [`${modelName}Id`]: itemId },
            });
            res.status(200).json(item);
        } catch (error) {
            console.error(`Error deleting ${modelName}:`, error);
            res.status(500).json({ message: 'Internal server error' });
        }
    };

    return { addItem, getAllItems, getItemById, editItem, deleteItem };
};

//Add CRUD items here

// Partners CRUD
const partnerCRUD = createCRUD('partner', 'partner', {
    fields: [
        { name: 'partnerName', type: 'string', required: true },
        { name: 'partnerImage', type: 'file', required: true },
    ],
});

// Teams CRUD
const teamCRUD = createCRUD('team', 'team', {
    fields: [
        { name: 'teamName', type: 'string', required: true },
        { name: 'teamPosition', type: 'string', required: true },
        { name: 'teamImage', type: 'file', required: true },
    ],
});

// Testimoni CRUD
const testimoniCRUD = createCRUD('testimoni', 'testimoni', {
    fields: [
        { name: 'testimoniName', type: 'string', required: true },
        { name: 'testimoniDescription', type: 'string', required: true },
        { name: 'testimoniCompany', type: 'string', required: true },
    ],
});

// Career CRUD
const careerCRUD = createCRUD('career', 'career', {
    fields: [
        { name: 'careerTitle', type: 'string', required: true },
        { name: 'careerLocation', type: 'string', required: true },
        { name: 'careerDate', type: 'date', required: true },
        { name: 'careerPosition', type: 'string', required: true },
        { name: 'careerDescription', type: 'string', required: true },
        { name: 'careerRequirements', type: 'string', required: true },
        { name: 'careerText', type: 'file', required: true },
    ],
});

// Product CRUD
const productCRUD = createCRUD('product', 'product', {
    fields: [
        { name: 'productName', type: 'string', required: true },
        { name: 'productDescription', type: 'string', required: true },
        { name: 'productImage', type: 'file', required: true },
    ]
});

const applierCRUD = createCRUD('applier', 'applier', {
    fields: [
        { name: 'applierName', type: 'string', required: true },
        { name: 'applierPhoneNumber', type: 'string', required: true },
        { name: 'applierEmail', type: 'string', required: true },
        { name: 'applierAddress', type: 'string', required: true },
        { name: 'applierText', type: 'file', required: false },
        { name: 'careerId', type: 'string', required: true },
    ]
});

module.exports = {
    partner: {
        ...partnerCRUD,
        uploadImage: uploadImage('partner'),
    },
    team: {
        ...teamCRUD,
        uploadImage: uploadImage('team'),
    },
    testimoni: {
        ...testimoniCRUD,
    },
    career: {
        ...careerCRUD,
        uploadPDF: uploadPDF('career'),
    },
    applier: {
        ...applierCRUD,
        uploadPDF: uploadPDF('applier'),
    },
    product: {
        ...productCRUD,
        uploadImage: uploadImage('product'),
    }
};