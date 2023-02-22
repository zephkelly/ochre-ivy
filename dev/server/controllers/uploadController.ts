const sharp = require('sharp');
const fs = require('fs'); 

sharp.cache(false);

export async function uploadAPI_imageUpload(req, res) {
  const image  = req.file;
  const dirPath = __dirname + '/../../' + 'public/uploaded-images/';

  const originalName = image.filename;
  const newName = Date.now() + '-' + originalName.split('.').slice(0, -1).join('.') + '.webp';

  if (!image) {
    console.log("No image sent in request");
    return res.status(400).send(JSON.stringify({success: 0}));
  }

  await sharp(dirPath + originalName)
    .webp({ quality: 70 })
    .resize(1920, 1080, {
      kernel: sharp.kernel.cubic,
      fit: 'cover',
    })
    .toFile(dirPath + newName);
  
  //Create thumbnail
  await sharp(dirPath + originalName)
    .webp({ quality: 70 })
    .resize(640, 360, {
      kernel: sharp.kernel.cubic,
      fit: 'cover',
    })
    .toFile(dirPath + 'thumbnails/' + newName );

  fs.unlink(dirPath + originalName, (err) => { if (err) { console.log(err); } });

  return res.status(200).send(JSON.stringify({ url: newName }));
}

export async function uploadAPI_removeimages(req, res) {
  const images = req.body.images;

  const response = { success: 0, message: "", status: 400 };

  if (images == null || images == undefined || images == "") {
    response.message = "No images/session to clear";
  } else {
    response.status = 200;
    await removeImages(images);
  }

  return res.status(response.status).send(JSON.stringify(response));

  async function removeImages(imageArray) {
    await imageArray.forEach(async (image: string) => {
      image = image.replace('/uploaded-images/', '');

      await fs.unlink(__dirname + '/../../' + 'public/uploaded-images/' + image, (err) => { if (err) { console.log(err); } });
      await fs.unlink(__dirname + '/../../' + 'public/uploaded-images/thumbnails/' + image, (err) => { if (err) { console.log(err); } });
    });

    response.message = "Images removed";
    response.success = 1;
  }
}