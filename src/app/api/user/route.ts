import { AxiosRequestConfig } from 'axios';
import { NextResponse } from 'next/server';
import axios from 'axios'

export async function PUT(request: Request) {
  const data = await request.text()
  const params = new URL(request.url)

  let config: AxiosRequestConfig = {
    method: 'put',
    maxBodyLength: Infinity,
    url: 'https://api.trustauthx.com/user/me/auth',
    headers: {
      'Content-Type': 'application/json'
    },
    params: Object.fromEntries(params.searchParams),
    data
  };
  try {
    const response = await axios.request(config)

    return NextResponse.json(response.data, { status: response.status, statusText: response.statusText })
  } catch (error) {
    console.error("Err ", error)
    // return NextResponse.json(error?.data ?? "Error", { status: error.response.status, statusText: error.response.statusText })
    return NextResponse.json(error)
  }
}