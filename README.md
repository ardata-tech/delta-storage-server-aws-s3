# Delta Storage AWS S3 Compatible

## Try it out!

### Configure
1. Get your Api Key [here](https://app.delta.storage/apikeys)
2. Download AWS ClI and configure
```bash
aws configure

AWS Access Key ID: <Delta Storage Api Key>
AWS Secret Access Key: <Delta Storage Api Key>
... enter until the end
```

### Create a drive
```bash
aws s3 --endpoint=http://142.93.144.8:1338 mb s3://<bucket-name>
```

### Delete a drive
```bash
aws s3 --endpoint=http://142.93.144.8:1338 rb s3://<bucket-id>
```

### Upload a file
```bash
aws s3 --endpoint=http://142.93.144.8:1338 cp <your-file-path> s3://<bucket-id>/<file-name>
```

### Delete a file
```bash
aws s3 --endpoint=http://142.93.144.8:1338 rm s3://<bucket-id>/<file-id>
```

### List files in a drive
```bash
aws s3 --endpoint=http://142.93.144.8:1338 ls s3://<bucket-id>
```

---

# Local Development
## Prerequisites
- Deno

## Run the server
```bash
deno task start
```

