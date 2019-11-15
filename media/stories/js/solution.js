'use strict';

if (navigator.mediaDevices === undefined) {
  navigator.mediaDevices = {};
}

if (navigator.mediaDevices.getUserMedia === undefined) {
  navigator.mediaDevices.getUserMedia = function (constraints) {
    var getUserMedia = navigator.getUserMedia ||
      navigator.webkitGetUserMedia ||
      navigator.mozGetUserMedia ||
      navigator.msGetUserMedia;

    if (!getUserMedia) {
      return Promise.reject(new Error('getUserMedia is not implemented in this browser'));
    }
    return new Promise((resolve, reject) => {
      getUserMedia.call(navigator, constraints, resolve, reject);
    });
  }
}

function createThumbnail(video) {
  return new Promise((done, fail) => {
    const preview = document.createElement('video');
    preview.src = URL.createObjectURL(video);
    preview.addEventListener('loadeddata', () => preview.currentTime = 2);
    preview.addEventListener('seeked', () => {
      const snapshot = document.createElement('canvas');
      const context = snapshot.getContext('2d');
      snapshot.width = preview.videoWidth;
      snapshot.height = preview.videoHeight;
      context.drawImage(preview, 0, 0);
      snapshot.toBlob(done);
    });
  });
}

function record(app) {
  return new Promise((done, fail) => {
    app.mode = 'preparing';
       navigator.mediaDevices
         .getUserMedia(app.config)
         .then(function(stream) {
           app.preview.srcObject = stream;
           app.mode = 'recording';
            setTimeout(() => {
                let recorder = new MediaRecorder(stream);
                let videoArr = [];

                recorder.addEventListener('dataavailable', (event) => videoArr.push(event.data));
                recorder.addEventListener('stop', (event) => {
                  app.preview.srcObject = null;
                  stream.getTracks().forEach(el => el.stop());

                  const recorded = new Blob(videoArr, {'type': recorder.mimeType});
                  videoArr = recorder = stream = null;

                  createThumbnail(recorded)
                    .then(result => done({video: recorded, frame: result}))
                    .catch(error => fail(error))
                });

                recorder.start();
                setTimeout(() => recorder.stop(), app.limit);
           }, 1000);        
      })
      .catch(error => fail(error));
  });
}