// import { NextApiRequest, NextApiResponse } from "next";

// interface Data {
//   name: string;
// }

// const testOrg = (req: NextApiRequest, res: NextApiResponse<Data>) => {
//   const org = { name: "Apple" };
//   res.status(200).json(org);
// };

import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  return NextResponse.json({ name: 'Apple' }, { status: 200 });
}
