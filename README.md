# Delta Storage AWS S3 Compatible

## Prerequisites
- Deno

## Development
```bash
deno task start
```

## Try it out!

### Create a drive
```bash
aws s3 --endpoint=http://localhost:1338 mb s3://bucket-name
```

### Delete a drive
```bash
aws s3 --endpoint=http://localhost:1338 rb s3://bucket-name
```

### Upload a file
```bash
aws s3 --endpoint=http://localhost:1338 cp your-large-file.mp4 s3://bucket-name/your-large-file.mp4
```

### Delete a file
```bash
aws s3 --endpoint=http://localhost:1338 rm s3://bucket-name/your-large-file.mp4
```

### List files in a drive
```bash
aws s3 --endpoint=http://localhost:1338 ls s3://bucket-name
```
