# Media Vault — Direct-to-S3 Upload System

## Overview

Media Vault is a high-performance Next.js application that enables users to upload large media files directly to S3 without routing binary data through the application server.

## Architecture

- Next.js App Router
- AWS S3 (or MinIO)
- Direct-to-Storage uploads
- Presigned URLs
- Multipart Upload for large files

## Why Presigned URLs?

Presigned URLs allow the browser to upload files directly to S3, removing server bottlenecks and improving scalability.

## Multipart Upload

Files larger than 50MB are uploaded using S3 Multipart Upload:

- Files are split into 5MB chunks
- Each chunk is uploaded independently
- Uploads are resumable and fault-tolerant

## Environment Variables

```env
AWS_REGION=us-east-1
AWS_ENDPOINT=http://localhost:9000
AWS_ACCESS_KEY_ID=minioadmin
AWS_SECRET_ACCESS_KEY=minioadmin
AWS_S3_BUCKET=media
PUBLIC_S3_URL=http://localhost:9000/media
```

## Getting Started

Follow these steps to set up and run the Media Vault application:

### Prerequisites

- Docker and Docker Compose installed
- Node.js (v20.19 or later) and npm installed

### Step 1: Clone the Repository

```bash
git clone https://github.com/karotkindanylo/media-vault-test.git
cd media-vault-test
```

### Step 2: Set Up MinIO (S3-Compatible Storage)

1. Start MinIO using Docker Compose:

   ```bash
   docker-compose up -d
   ```

   This will start MinIO on `http://localhost:9000` with default credentials (`minioadmin:minioadmin`).

2. Access the MinIO web interface at `http://localhost:9000` and create a bucket named `media`.

### Step 3: Configure CORS for MinIO

1. Create a `cors.xml` file with the following content:

   ```json
   <CORSConfiguration>
        <CORSRule>
            <AllowedOrigin>http://localhost:3000</AllowedOrigin>
            <AllowedMethod>GET</AllowedMethod>
            <AllowedMethod>PUT</AllowedMethod>
            <AllowedMethod>POST</AllowedMethod>
            <AllowedMethod>DELETE</AllowedMethod>
            <AllowedHeader>*</AllowedHeader>
            <ExposeHeader>ETag</ExposeHeader>
            <MaxAgeSeconds>3000</MaxAgeSeconds>
        </CORSRule>
    </CORSConfiguration>
   ```

2. Apply the CORS configuration:
   ```bash
   mc alias set local http://localhost:9000 minioadmin minioadmin
   mc anonymous set download localminio/media
   ```

### Step 4: Install Dependencies

```bash
npm install
```

### Step 5: Set Environment Variables

Create a `.env.local` file in the root directory and copy the environment variables from the example provided in the "Environment Variables" section.

### Step 6: Run the Application

Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:3000`.

### Step 7: Test the Upload

1. Open the application in your browser.
2. Upload a file and verify that it appears in the MinIO bucket.
