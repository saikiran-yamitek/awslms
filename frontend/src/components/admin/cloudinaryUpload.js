export const uploadVideoToCloudinary = async (file) => {
  const cloudName = 'df0l9ygux';
  const uploadPreset = 'unsigned_lurnity'; // your unsigned preset name

  const url = `https://api.cloudinary.com/v1_1/${cloudName}/video/upload`;
  const formData = new FormData();

  formData.append('file', file);
  formData.append('upload_preset', uploadPreset);

  const res = await fetch(url, {
    method: 'POST',
    body: formData,
  });

  if (!res.ok) throw new Error('Upload failed');

  const data = await res.json();
  return data.secure_url; // Video URL
};
