import app from "./index";

// Start the server if not running in a serverless environment
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});