import React, { useState, useRef } from "react";
import { PDFExport } from "@progress/kendo-react-pdf";
import ImageUploading from "react-images-uploading";
import {
  Editor,
  EditorTools,
  EditorUtils,
  ProseMirror,
  EditorMountEvent,
} from "@progress/kendo-react-editor";

import ReactHtmlParser from "react-html-parser";
import { Button, Box } from "@mui/material";

export default function NewEmployee() {
  const { EditorState, EditorView } = ProseMirror;
  const { imageResizing } = EditorUtils;

  const [signatureImg, setSignatureImg] = useState("/stroke-infotech-logo.svg");
  const [imageWidth, setImageWidth] = useState();
  const [images, setImages] = useState(["/stroke-infotech-logo.svg"]);
  const [downloadbtnClick, setDownloadbtnClick] = useState(false);

  const pdfExportComponent = React.useRef(null);
  const maxNumber = 69;

  const signatureContent = `<p style="text-align: left; margin-bottom:0;"><img src=${signatureImg} alt="" width="100%" height="100%"  /></p>`;
 
  const handleSignatureDimension = (e) => {
    setImageWidth(e.html);
  };

  const handleSignature = (e) => {
    if (e.viewProps) {
      const { plugins, doc } = e.viewProps.state;

      return new EditorView(
        { mount: e.dom },
        {
          ...e.viewProps,
          state: EditorState.create({
            doc,
            plugins: [...plugins, imageResizing()],
          }),
        }
      );
    } else {
      const file = e[0].data_url;
      setSignatureImg(file);
    }
  };

  const exportPDFWithComponent = () => {
    setDownloadbtnClick(true);
    setTimeout(() => {
      if (pdfExportComponent.current) {
        pdfExportComponent.current.save();
        setTimeout(() => {
          setDownloadbtnClick(false);
        }, 2500);
      }
    }, 1500);
  };

  return (
    <div className="bg-page-background py-8">
      <PDFExport
        scale={0.8}
        paperSize="A4"
        ref={pdfExportComponent}
        fileName="hello"
      >
        <div
          style={{ maxWidth: "300px" }}
          className="page-section sm:max-w[1200px] lg:max-w-[210mm] min-h-[297mm] lg:mx-auto shadow-card mb-2 bg-page"
          // style={{ minHeight: isdownloadbtnClick ? "297mm" : "297mm" }}
        >
          <div className="flex justify-between items-start border-b border-real-gray sm:px-5 lg:px-12 pt-14 pb-5">
            <div className="w-2/4 pt-1"></div>

            <div className="note-section sm:px-5 lg:px-12 ">
              {downloadbtnClick ? (
                ""
              ) : (
                <ImageUploading
                  // value={images}
                  onChange={handleSignature}
                  maxNumber={maxNumber}
                  dataURLKey="data_url"
                  value={[]}
                >
                  {({
                    onImageUpload,
                    onImageUpdate,
                    isDragging,
                    dragProps,
                  }) => (
                    <div className="upload__image-wrapper max-w-[40%] ml-auto">
                      <div className="w-full text-right">
                        <button
                          className="mb-0 edit-button fill-primary"
                          style={isDragging ? { color: "red" } : undefined}
                          onClick={onImageUpdate}
                          {...dragProps}
                        >
                          <svg
                            baseProfile="tiny"
                            height="24px"
                            fill="#898e92"
                            id="Layer_1"
                            version="1.2"
                            viewBox="0 0 24 24"
                            width="24px"
                            xmlSpace="preserve"
                            xmlns="http://www.w3.org/2000/svg"
                            xmlnsXlink="http://www.w3.org/1999/xlink"
                          >
                            <path d="M21.561,5.318l-2.879-2.879C18.389,2.146,18.005,2,17.621,2c-0.385,0-0.768,0.146-1.061,0.439L13,6H4C3.448,6,3,6.447,3,7  v13c0,0.553,0.448,1,1,1h13c0.552,0,1-0.447,1-1v-9l3.561-3.561C21.854,7.146,22,6.762,22,6.378S21.854,5.611,21.561,5.318z   M11.5,14.672L9.328,12.5l6.293-6.293l2.172,2.172L11.5,14.672z M8.939,13.333l1.756,1.728L9,15L8.939,13.333z M16,19H5V8h6  l-3.18,3.18c-0.293,0.293-0.478,0.812-0.629,1.289C7.031,12.969,7,13.525,7,13.939V17h3.061c0.414,0,1.108-0.1,1.571-0.29  c0.464-0.19,0.896-0.347,1.188-0.64L16,13V19z M18.5,7.672L16.328,5.5l1.293-1.293l2.171,2.172L18.5,7.672z" />
                          </svg>
                        </button>
                      </div>
                      <div className="image-item ">
                        <Editor
                          className="w-full text-right image-editor"
                          onMount={handleSignature}
                          value={signatureContent}
                          contentStyle={{
                            overflow: "hidden",
                            height: "100%",
                            width: "100%",
                            padding: 0,
                          }}
                          onChange={handleSignatureDimension}
                        />
                      </div>
                    </div>
                  )}
                </ImageUploading>
              )}

              {downloadbtnClick ? (
                <Box
                >
                  {imageWidth === undefined
                    ? ReactHtmlParser(signatureContent)
                    : ReactHtmlParser(imageWidth)}
                </Box>
              ) : (
                ""
              )}
              <img
                src={signatureImg}
                width="100%"
                height="100%"
                style={{ display: "none" }}
              />
            </div>
          </div>
        </div>
      </PDFExport>

      <div>
        <Button onClick={exportPDFWithComponent}>download</Button>
      </div>
    </div>
  );
}
