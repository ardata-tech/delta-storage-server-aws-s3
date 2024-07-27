import { Hono } from "hono";
import * as xml from "@libs/xml";
import Api from "@/utils/api.ts";
import { DELTA_SERVER_URL } from "@/utils/constants.ts";

const api = new Api(DELTA_SERVER_URL);

const objects = new Hono();

// GET FILES
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

  const xmlResponse = xml.stringify({
    "@version": "1.0",
    root,
  });

  c.header("Content-Type", "text/xml");

  return c.body(xmlResponse);
});

// UPLOAD FILE
objects.put("/:bucketName/*", async (c) => {
  try {
    const apiKey = c.res.headers.get("Authorization");

    const { bucketName } = c.req.param();

    const data = await api.get(`/drives`, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    });
    const idExists = data.drives.some((drive) => drive.id === bucketName);
    if (!idExists) {
      throw new Error("Drive not found");
    }

    const keyName = c.req.path.split("/").slice(1);
    const blob = await c.req.blob();

    const file = new File([blob], keyName.at(-1) ?? "", { type: blob.type });

    const formData = new FormData();
    formData.append("file", file, file.name);
    formData.append("directoryId", keyName.at(-2) ?? bucketName);

    await api.post(`/files/upload`, formData, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    });

    const root = {};

    const xmlResponse = xml.stringify({
      "@version": "1.0",
      root,
    });

    c.header("Content-Type", "text/xml");

    return c.body(xmlResponse);
  } catch (error) {
    return c.body(error);
  }
});

objects.delete("/:bucketName/*", async (c) => {
  try {
    const { bucketName } = c.req.param();
    const apiKey = c.res.headers.get("Authorization");

    const keyName = c.req.path.split("/").slice(1);

    const fileId = keyName.at(-1);

    const data = await api.get(`/drives`, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    });

    const idExists = data.drives.some((drive) => drive.id === bucketName);
    if (!idExists) {
      throw new Error("Drive not found");
    }

    await api.delete(`/files/${fileId}`, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    });

    const root = {};

    const xmlResponse = xml.stringify({
      "@version": "1.0",
      root,
    });

    c.header("Content-Type", "text/xml");

    return c.body(xmlResponse);
  } catch (error) {
    return c.body(error);
  }
});

export default objects;
