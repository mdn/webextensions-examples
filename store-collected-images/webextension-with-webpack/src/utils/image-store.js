"use strict";

// Import the `getFileStorage` helper from the idb-file-storage npm dependency.
import {getFileStorage} from 'idb-file-storage/src/idb-file-storage';

export async function saveCollectedBlobs(collectionName, collectedBlobs) {
  // Retrieve a named file storage (it creates a new one if it doesn't exist yet).
  const storedImages = await getFileStorage({name: "stored-images"});

  for (const item of collectedBlobs) {
    // Save all the collected blobs in an IndexedDB key named based on the collectionName
    // and a randomly generated uuid.
    await storedImages.put(`${collectionName}/${item.uuid}`, item.blob);
  }
}

export async function loadStoredImages(filter) {
  // Retrieve a named file storage (it creates a new one if it doesn't exist yet).
  const imagesStore = await getFileStorage({name: "stored-images"});

  let listOptions = filter ? {includes: filter} : undefined;

  // List the existent stored files (optionally filtered).
  const imagesList = await imagesStore.list(listOptions);

  let storedImages = [];

  for (const storedName of imagesList) {
    // Retrieve the stored blob by name.
    const blob = await imagesStore.get(storedName);

    // convert the Blob object into a blob URL and store it into the
    // array of the results returned by this function.
    storedImages.push({storedName, blobUrl: URL.createObjectURL(blob)});
  }

  return storedImages;
}

export async function removeStoredImages(storedImages) {
  // Retrieve a named file storage (it creates a new one if it doesn't exist yet).
  const imagesStore = await getFileStorage({name: "stored-images"});

  for (const storedImage of storedImages) {
    // Revoke the blob URL.
    URL.revokeObjectURL(storedImage.blobUrl);

    // Remove the stored blob by name.
    await imagesStore.remove(storedImage.storedName);
  }
}
