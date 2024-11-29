/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import "dynamsoft-license";

import "dynamsoft-document-normalizer";
import "dynamsoft-capture-vision-router";

import { CoreModule, DSImageData } from "dynamsoft-core";
import { LicenseManager } from "dynamsoft-license";
import { DDV, DetectResult, DocumentDetectConfig, VImageData } from "dynamsoft-document-viewer";
import { CaptureVisionRouter } from "dynamsoft-capture-vision-bundle";

let initiazlied = false;

export async function init(){
  if (initiazlied === false) {
    console.log("Initializing...");
    //set the license for Dynamsoft Document Viewer and Dynamsoft Document Normalizer. Use one-day trial by default.
    //apply your license here: https://www.dynamsoft.com/customer/license/trialLicense/?product=mwc
    CoreModule.engineResourcePaths.rootDirectory = "https://cdn.jsdelivr.net/npm/";
    await LicenseManager.initLicense("DLS2eyJoYW5kc2hha2VDb2RlIjoiMjAwMDAxLTE2NDk4Mjk3OTI2MzUiLCJvcmdhbml6YXRpb25JRCI6IjIwMDAwMSIsInNlc3Npb25QYXNzd29yZCI6IndTcGR6Vm05WDJrcEQ5YUoifQ==",{executeNow:true});
    await CoreModule.loadWasm(["DDN"]).catch((ex: Error) => {
      const errMsg = ex.message || ex;
      console.error(errMsg);
      alert(errMsg);
    });
    DDV.Core.engineResourcePath = "assets/ddv-resources/engine";// Lead to a folder containing the distributed WASM files
    await DDV.Core.loadWasm();
    await DDV.Core.init();
    DDV.setProcessingHandler("imageFilter", new DDV.ImageFilter());
  }
  initiazlied = true;
  return true;
}

export async function initDocDetectModule() {
  const router = await CaptureVisionRouter.createInstance();
  await router.initSettings("{\"CaptureVisionTemplates\": [{\"Name\": \"Default\"},{\"Name\": \"DetectDocumentBoundaries_Default\",\"ImageROIProcessingNameArray\": [\"roi-detect-document-boundaries\"]},{\"Name\": \"DetectAndNormalizeDocument_Default\",\"ImageROIProcessingNameArray\": [\"roi-detect-and-normalize-document\"]},{\"Name\": \"NormalizeDocument_Binary\",\"ImageROIProcessingNameArray\": [\"roi-normalize-document-binary\"]},  {\"Name\": \"NormalizeDocument_Gray\",\"ImageROIProcessingNameArray\": [\"roi-normalize-document-gray\"]},  {\"Name\": \"NormalizeDocument_Color\",\"ImageROIProcessingNameArray\": [\"roi-normalize-document-color\"]}],\"TargetROIDefOptions\": [{\"Name\": \"roi-detect-document-boundaries\",\"TaskSettingNameArray\": [\"task-detect-document-boundaries\"]},{\"Name\": \"roi-detect-and-normalize-document\",\"TaskSettingNameArray\": [\"task-detect-and-normalize-document\"]},{\"Name\": \"roi-normalize-document-binary\",\"TaskSettingNameArray\": [\"task-normalize-document-binary\"]},  {\"Name\": \"roi-normalize-document-gray\",\"TaskSettingNameArray\": [\"task-normalize-document-gray\"]},  {\"Name\": \"roi-normalize-document-color\",\"TaskSettingNameArray\": [\"task-normalize-document-color\"]}],\"DocumentNormalizerTaskSettingOptions\": [{\"Name\": \"task-detect-and-normalize-document\",\"SectionImageParameterArray\": [{\"Section\": \"ST_REGION_PREDETECTION\",\"ImageParameterName\": \"ip-detect-and-normalize\"},{\"Section\": \"ST_DOCUMENT_DETECTION\",\"ImageParameterName\": \"ip-detect-and-normalize\"},{\"Section\": \"ST_DOCUMENT_NORMALIZATION\",\"ImageParameterName\": \"ip-detect-and-normalize\"}]},{\"Name\": \"task-detect-document-boundaries\",\"TerminateSetting\": {\"Section\": \"ST_DOCUMENT_DETECTION\"},\"SectionImageParameterArray\": [{\"Section\": \"ST_REGION_PREDETECTION\",\"ImageParameterName\": \"ip-detect\"},{\"Section\": \"ST_DOCUMENT_DETECTION\",\"ImageParameterName\": \"ip-detect\"},{\"Section\": \"ST_DOCUMENT_NORMALIZATION\",\"ImageParameterName\": \"ip-detect\"}]},{\"Name\": \"task-normalize-document-binary\",\"StartSection\": \"ST_DOCUMENT_NORMALIZATION\",   \"ColourMode\": \"ICM_BINARY\",\"SectionImageParameterArray\": [{\"Section\": \"ST_REGION_PREDETECTION\",\"ImageParameterName\": \"ip-normalize\"},{\"Section\": \"ST_DOCUMENT_DETECTION\",\"ImageParameterName\": \"ip-normalize\"},{\"Section\": \"ST_DOCUMENT_NORMALIZATION\",\"ImageParameterName\": \"ip-normalize\"}]},  {\"Name\": \"task-normalize-document-gray\",   \"ColourMode\": \"ICM_GRAYSCALE\",\"StartSection\": \"ST_DOCUMENT_NORMALIZATION\",\"SectionImageParameterArray\": [{\"Section\": \"ST_REGION_PREDETECTION\",\"ImageParameterName\": \"ip-normalize\"},{\"Section\": \"ST_DOCUMENT_DETECTION\",\"ImageParameterName\": \"ip-normalize\"},{\"Section\": \"ST_DOCUMENT_NORMALIZATION\",\"ImageParameterName\": \"ip-normalize\"}]},  {\"Name\": \"task-normalize-document-color\",   \"ColourMode\": \"ICM_COLOUR\",\"StartSection\": \"ST_DOCUMENT_NORMALIZATION\",\"SectionImageParameterArray\": [{\"Section\": \"ST_REGION_PREDETECTION\",\"ImageParameterName\": \"ip-normalize\"},{\"Section\": \"ST_DOCUMENT_DETECTION\",\"ImageParameterName\": \"ip-normalize\"},{\"Section\": \"ST_DOCUMENT_NORMALIZATION\",\"ImageParameterName\": \"ip-normalize\"}]}],\"ImageParameterOptions\": [{\"Name\": \"ip-detect-and-normalize\",\"BinarizationModes\": [{\"Mode\": \"BM_LOCAL_BLOCK\",\"BlockSizeX\": 0,\"BlockSizeY\": 0,\"EnableFillBinaryVacancy\": 0}],\"TextDetectionMode\": {\"Mode\": \"TTDM_WORD\",\"Direction\": \"HORIZONTAL\",\"Sensitivity\": 7}},{\"Name\": \"ip-detect\",\"BinarizationModes\": [{\"Mode\": \"BM_LOCAL_BLOCK\",\"BlockSizeX\": 0,\"BlockSizeY\": 0,\"EnableFillBinaryVacancy\": 0,\"ThresholdCompensation\" : 7}],\"TextDetectionMode\": {\"Mode\": \"TTDM_WORD\",\"Direction\": \"HORIZONTAL\",\"Sensitivity\": 7},\"ScaleDownThreshold\" : 512},{\"Name\": \"ip-normalize\",\"BinarizationModes\": [{\"Mode\": \"BM_LOCAL_BLOCK\",\"BlockSizeX\": 0,\"BlockSizeY\": 0,\"EnableFillBinaryVacancy\": 0}],\"TextDetectionMode\": {\"Mode\": \"TTDM_WORD\",\"Direction\": \"HORIZONTAL\",\"Sensitivity\": 7}}]}");
  class DDNNormalizeHandler extends DDV.DocumentDetect {
    async detect(image:VImageData, config:DocumentDetectConfig) {
      if (!router) {
        return Promise.resolve({
          success: false
        });
      };

      if (!image.width || !image.height) {
        return Promise.resolve({
          success: false
        });
      };

      let width = image.width;
      let height = image.height;
      let ratio = 1;
      let data:ArrayBuffer;

      if (height > 720) {
        ratio = height / 720;
        height = 720;
        width = Math.floor(width / ratio);
        data = compress(image.data as ArrayBuffer, image.width, image.height, width, height);
      } else {
        data = image.data.slice(0) as ArrayBuffer;
      }


      // Define DSImage according to the usage of DDN
      const DSImage:DSImageData = {
        bytes: new Uint8Array(data),
        width,
        height,
        stride: width * 4, //RGBA
        format: 10 // IPF_ABGR_8888
      } as DSImageData;

      // Use DDN normalized module
      const results = await router.capture(DSImage, 'DetectDocumentBoundaries_Default');
      const detectedQuadResultItems = results.detectedQuadResultItems;
      // Filter the results and generate corresponding return values
      if (!detectedQuadResultItems || detectedQuadResultItems.length <= 0) {
        return Promise.resolve({
          success: false
        });
      };

      const quad:any[] = [];
      
      detectedQuadResultItems[0].location.points.forEach((p) => {
        quad.push([p.x * ratio, p.y * ratio]);
      });

      const detectResult = this.processDetectResult({
        location: quad,
        width: image.width,
        height: image.height,
        config
      } as DetectResult);

      return Promise.resolve(detectResult);
    }
  }
  DDV.setProcessingHandler('documentBoundariesDetect', new DDNNormalizeHandler())
}

function compress(
    imageData:ArrayBuffer,
    imageWidth:number,
    imageHeight:number,
    newWidth:number,
    newHeight:number,
) {
  let source = null;
  try {
      source = new Uint8ClampedArray(imageData);
  } catch (error) {
      source = new Uint8Array(imageData);
  }

  const scaleW = newWidth / imageWidth;
  const scaleH = newHeight / imageHeight;
  const targetSize = newWidth * newHeight * 4;
  const targetMemory = new ArrayBuffer(targetSize);
  let distData = null;

  try {
      distData = new Uint8ClampedArray(targetMemory, 0, targetSize);
  } catch (error) {
      distData = new Uint8Array(targetMemory, 0, targetSize);
  }

  const filter = (distCol:number, distRow:number) => {
      const srcCol = Math.min(imageWidth - 1, distCol / scaleW);
      const srcRow = Math.min(imageHeight - 1, distRow / scaleH);
      const intCol = Math.floor(srcCol);
      const intRow = Math.floor(srcRow);

      let distI = (distRow * newWidth) + distCol;
      let srcI = (intRow * imageWidth) + intCol;

      distI *= 4;
      srcI *= 4;

      for (let j = 0; j <= 3; j += 1) {
          distData[distI + j] = source[srcI + j];
      }
  };

  for (let col = 0; col < newWidth; col += 1) {
      for (let row = 0; row < newHeight; row += 1) {
          filter(col, row);
      }
  }

  return distData;
}
