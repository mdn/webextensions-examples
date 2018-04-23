/* global IDBFiles */
/* exported saveCollectedBlobs, loadStoredImages, removeStoredImages */

"use strict";

async function saveCollectedBlobs(collectionName, collectedBlobs) {
  const storedImages = await IDBFiles.getFileStorage({name: "stored-images"});

  for (const item of collectedBlobs) {
    await storedImages.put(`${collectionName}/${item.uuid}`, item.blob);
  }
}

async function loadStoredImages(filter) {
  const imagesStore = await IDBFiles.getFileStorage({name: "stored-images"});

  let listOptions = filter ? {includes: filter} : undefined;
  const imagesList = await imagesStore.list(listOptions);

  let storedImages = [];

  for (const storedName of imagesList) {
    const blob = await imagesStore.get(storedName);

    storedImages.push({storedName, blobUrl: URL.createObjectURL(blob)});
  }

  return storedImages;
}

async function removeStoredImages(storedImages) {
  const imagesStore = await IDBFiles.getFileStorage({name: "stored-images"});
  for (const storedImage of storedImages) {
    URL.revokeObjectURL(storedImage.blobUrl);
    await imagesStore.remove(storedImage.storedName);
  }
}
