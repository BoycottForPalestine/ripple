export async function GET(request: Request) {
  const version = "1.0.2";
  return Response.json({ version });
}
