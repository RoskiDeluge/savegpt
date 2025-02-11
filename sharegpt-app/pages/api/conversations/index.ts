import { NextApiRequest, NextApiResponse } from "next";
import { getConvos } from "@/lib/api";
import { PAGINATION_LIMIT } from "@/lib/constants";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const { type, page } = req.query as { type: string; page?: string };

    const response = await getConvos({
      orderBy: type === "new" ? "createdAt" : "views",
      take: PAGINATION_LIMIT,
      skip: page ? parseInt(page) * 50 : 0,
    });

    res.status(200).json(response);
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
