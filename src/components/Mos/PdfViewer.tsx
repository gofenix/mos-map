"use client";

export default function PDFViewer() {
  return (
    <div className="-mt-16 w-full p-16">
      <iframe
        src="/docs/开放课题申请书.pdf"
        width={"100%"}
        height={"700px"}
      ></iframe>
    </div>
  );
}
