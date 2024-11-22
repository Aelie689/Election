export async function fetchDataFromS3(key) {
    const BUCKET_URL = "https://g01-bucket.s3.us-east-1.amazonaws.com/";
  
    try {
      const response = await fetch(`${BUCKET_URL}${key}`);
      if (!response.ok) throw new Error("Network response was not ok");
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching data from S3:", error);
      return null;
    }
  }