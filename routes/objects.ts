import { Hono } from "hono";
import * as xml from "@libs/xml";
import Api from "@/utils/api.ts";
import { DELTA_SERVER_URL } from "@/utils/constants.ts";

const api = new Api(DELTA_SERVER_URL);

const objects = new Hono();

objects.get("/:keyName", async (c) => {
  const { keyName } = c.req.param();

  const apiKey = c.res.headers.get("Authorization");

  const res = await api.get(`/drives/${keyName}/contents`, {
    headers: { Authorization: `Bearer ${apiKey}` },
  });

  const files = res.files;

  const root = {
    ListBucketResult: {
      "@xmlns": "",
      Name: keyName,
      Prefix: "",
      KeyCount: 205,
      IsTruncated: false,
      Contents: files.map((f) => ({
        key: `${f.directoryId}/${f.cid}`,
        LastModified: f.updatedAt,
        ETag: "",
        Size: f.size,
        StorageClass: f.storageClasses.map((s) => s.storageClassName)[0],
      })),
      // Contents: [
      //   {
      //     Key: "image.png",
      //     LastModified: `${new Date()}`,
      //     ETag: "",
      //     Size: 213,
      //     StorageClass: "STANDARD",
      //   },
      // ],
    },
  };

  console.dir({ root, files }, { depth: null });

  const xmlResponse = xml.stringify({
    "@version": "1.0",
    root,
  });

  c.header("Content-Type", "text/xml");

  return c.body(xmlResponse);
});

export default objects;
