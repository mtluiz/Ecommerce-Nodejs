import http from "http"

const handler = (request, response) => {
  response.write("hello brother")
  return response.end()
}

export const app = http.createServer(handler)