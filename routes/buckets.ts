import { Hono } from "hono";

import * as xml from "@libs/xml";
import { DELTA_SERVER_URL } from "@/utils/constants.ts";
import Api from "@/utils/api.ts";

const bucket = new Hono();
const api = new Api(DELTA_SERVER_URL);

// CREATE BUCKET
bucket.put("/:bucketName", async (c) => {
  try {
    const { bucketName } = c.req.param();

    const apiKey = c.res.headers.get("Authorization");

    await api.post(
      "/drives/create",
      { name: bucketName },
      {
        headers: { Authorization: `Bearer ${apiKey}` },
      },
    );

    const root = {
      "x-amz-id-2": "",
      "x-amz-request-id": "",
      Date: `${new Date()}`,
      Location: `/${bucketName}`,
      "Content-Length": 0,
      Connection: "close",
      Server: "Delta Storage Server",
    };

    const xmlResponse = xml.stringify({
      "@version": "1.0",
      root,
    });

    c.header("Content-Type", "text/xml");

    return c.body(xmlResponse);
  } catch (e) {
    return c.body(e);
  }
});

bucket.delete("/:bucketName", async (c) => {
  try {
    const { bucketName } = c.req.param();

    const apiKey = c.res.headers.get("Authorization");

    await api.delete(`/drives/${bucketName}`, {
      headers: { Authorization: `Bearer ${apiKey}` },
    });

    const root = {
      "x-amz-id-2": "",
      "x-amz-request-id": "",
      Date: `${new Date()}`,
      Connection: "close",
      Server: "Delta Storage Server",
    };

    const xmlResponse = xml.stringify({
      "@version": "1.0",
      root,
    });

    c.header("Content-Type", "text/xml");

    return c.body(xmlResponse);
  } catch (e) {
    return c.body(e);
  }
});

export default bucket;
