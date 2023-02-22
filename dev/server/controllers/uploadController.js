"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadAPI_removeimages = exports.uploadAPI_imageUpload = void 0;
const sharp = require('sharp');
const fs = require('fs');
sharp.cache(false);
function uploadAPI_imageUpload(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const image = req.file;
        const dirPath = __dirname + '/../../' + 'public/uploaded-images/';
        const originalName = image.filename;
        const newName = Date.now() + '-' + originalName.split('.').slice(0, -1).join('.') + '.webp';
        if (!image) {
            console.log("No image sent in request");
            return res.status(400).send(JSON.stringify({ success: 0 }));
        }
        yield sharp(dirPath + originalName)
            .webp({ quality: 70 })
            .resize(1920, 1080, {
            kernel: sharp.kernel.cubic,
            fit: 'cover',
        })
            .toFile(dirPath + newName);
        //Create thumbnail
        yield sharp(dirPath + originalName)
            .webp({ quality: 70 })
            .resize(640, 360, {
            kernel: sharp.kernel.cubic,
            fit: 'cover',
        })
            .toFile(dirPath + 'thumbnails/' + newName);
        fs.unlink(dirPath + originalName, (err) => { if (err) {
            console.log(err);
        } });
        return res.status(200).send(JSON.stringify({ url: newName }));
    });
}
exports.uploadAPI_imageUpload = uploadAPI_imageUpload;
function uploadAPI_removeimages(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const images = req.body.images;
        const response = { success: 0, message: "", status: 400 };
        if (images == null || images == undefined || images == "") {
            response.message = "No images/session to clear";
        }
        else {
            response.status = 200;
            yield removeImages(images);
        }
        return res.status(response.status).send(JSON.stringify(response));
        function removeImages(imageArray) {
            return __awaiter(this, void 0, void 0, function* () {
                yield imageArray.forEach((image) => __awaiter(this, void 0, void 0, function* () {
                    image = image.replace('/uploaded-images/', '');
                    yield fs.unlink(__dirname + '/../../' + 'public/uploaded-images/' + image, (err) => { if (err) {
                        console.log(err);
                    } });
                    yield fs.unlink(__dirname + '/../../' + 'public/uploaded-images/thumbnails/' + image, (err) => { if (err) {
                        console.log(err);
                    } });
                }));
                response.message = "Images removed";
                response.success = 1;
            });
        }
    });
}
exports.uploadAPI_removeimages = uploadAPI_removeimages;
