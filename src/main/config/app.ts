import http from "http"

const defaultRoute = (req, res) => {
  res.writeHead(404, {
    "Content-Type": "application/json"
  })
  res.write(JSON.stringify({
    statusCode: 404,
    message: "Route not found"
  }))
  return res.end()
}

const routes = {
  "GET": {
    default: defaultRoute,
    "/hello": (req, res) => {
      res.write("Hello node")
      return res.end()
    }
  },
  "POST": {
    default: defaultRoute,
  }
}

const handler = (request, response) => {
  const { method, url } = request;
  const chosen = routes[method][url] || routes[method].default
  return chosen(request, response)
}

export const app = http.createServer(handler)