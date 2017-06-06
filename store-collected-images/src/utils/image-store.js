"use strict";

import {getFileStorage} from 'idb-file-storage/src/idb-file-storage';

export async function saveCollectedBlobs(collectionName, collectedBlobs) {
  const storedImages = await getFileStorage({name: "stored-images"});

  for (const item of collectedBlobs) {
    await storedImages.put(`${collectionName}/${item.uuid}`, item.blob);
  }
}

export async function loadStoredImages(filter, component) {
  const imagesStore = await getFileStorage({name: "stored-images"});

  let listOptions = filter ? {includes: filter} : undefined;
  const imagesList = await imagesStore.list(listOptions);

  let storedImages = [];

  for (const storedName of imagesList) {
    const blob = await imagesStore.get(storedName);

    storedImages.push({storedName, blobUrl: URL.createObjectURL(blob)});

    // Refresh the UI.
    component.setState({storedImages});
  }
}

export async function removeStoredImages(storedImages) {
  const imagesStore = await getFileStorage({name: "stored-images"});
  for (const storedImage of storedImages) {
    URL.revokeObjectURL(storedImage.blobUrl);
    await imagesStore.remove(storedImage.storedName);
  }
}
