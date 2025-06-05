# LoopAI Data Ingestion System

## Project Overview
A distributed data ingestion system built with Node.js and Express that handles:

- Batch processing with priority queues
- Real-time status tracking
- MongoDB storage

## Features

- REST API endpoints
- Priority-based processing
- Batch processing simulation
- MongoDB persistence
- Automatic collection creation

## Installation

```bash
npm install
Configuration

Create a .env file in the project root with the following content:

MONGODB_URI=mongodb+srv://<username>:<password>@cluster.xxxxx.mongodb.net/Ingestion
PORT=3000
API Documentation

POST /api/ingest
Request body example:

{
  "ids": [1, 2, 3, 4, 5],
  "priority": "HIGH"
}
Example cURL command:

curl -X POST http://localhost:3000/api/ingest \
  -H "Content-Type: application/json" \
  -d '{"ids": [1,2,3,4,5], "priority": "HIGH"}'
GET /api/status/{ingestion_id}
Example cURL command:

curl http://localhost:3000/api/status/04cfda34-9830-4711-83a3-5be5346c8cc5
Project Structure

/src
├── controllers/    # Request handlers
├── models/         # MongoDB schemas
├── routes/         # Express routers
├── services/       # Business logic
├── store/          # Database operations
└── validations/    # Joi schemas
Running the Server

node src/index.js
