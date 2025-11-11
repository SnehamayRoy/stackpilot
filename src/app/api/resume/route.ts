import { NextResponse } from "next/server";
import axios from "axios";
import FormData from "form-data"; // This is 'form-data', NOT the built-in FormData

export const runtime = "nodejs";

export async function POST(request: Request) {
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };

  if (request.method === "OPTIONS") {
    return new NextResponse(null, { status: 200, headers });
  }

  try {
    const requestFormData = await request.formData();
    const file = requestFormData.get("file") as File | null;

    if (!file) {
      return NextResponse.json(
        { error: "No file uploaded" },
        { status: 400, headers }
      );
    }

    console.log("📄 Received file:", file.name, file.type, file.size);

    // 1. Get the file's raw data as an ArrayBuffer
    const arrayBuffer = await file.arrayBuffer();

    // 2. Convert the ArrayBuffer to a Node.js Buffer
    // This is the format 'form-data' library expects
    const buffer = Buffer.from(arrayBuffer);

    // 3. Create a new form using the 'form-data' library
    const forwardForm = new FormData();

    // 4. Append the buffer, making sure to include the original filename
    forwardForm.append("file", buffer, file.name);

    console.log("... Forwarding file to external API via axios...");

    // 5. Use 'axios.post' to send the form
    const response = await axios.post(
      "https://resume-extractor-1j6m.onrender.com/extract-skills",
      forwardForm,
      {
        headers: {
          // 'axios' + 'form-data' will create the
          // correct 'Content-Type: multipart/form-data; boundary=...'
          ...forwardForm.getHeaders(),
        },
      }
    );

    console.log("📥 Extractor response:", response.status, response.data);

    // 6. Return the successful response from the external API
    return NextResponse.json(response.data, { headers });
  } catch (error) {
    console.error("⚠️ Proxy error:", error);

    // Handle errors from axios
    if (axios.isAxiosError(error) && error.response) {
      console.error("Axios error details:", error.response.data);
      return NextResponse.json(
        {
          error: "Extractor failed",
          details: JSON.stringify(error.response.data),
        },
        { status: error.response.status, headers }
      );
    }

    // Handle other errors
    return NextResponse.json(
      { error: "Server error", message: (error as Error).message },
      { status: 500, headers }
    );
  }
}
