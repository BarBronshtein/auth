import axios from 'axios';

export const uploadImg = async (file: File) => {
	// Variables
	const UPPLOAD_PERSET = '';
	const CLOUD_NAME = '';
	const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;
	const formData = new FormData();
	// Request Body
	formData.append('file', file);
	formData.append('upload_preset', UPPLOAD_PERSET);
	try {
		const res = await axios.post(UPLOAD_URL, formData);
		return res.data;
	} catch (err) {
		console.log(err);
		throw new Error('Something went wrong please try again later');
	}
};
