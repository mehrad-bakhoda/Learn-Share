import cookie from "cookie";
export default async function handle(req, res) {
  if (req.method === "POST") {
    res.setHeader(
      "Set-Cookie",
      cookie.serialize("refreshToken", "", {
        httpOnly: true,
        maxAge: 0,
        path: "/",
      })
    );
    res.status(200).send();
  }
}
