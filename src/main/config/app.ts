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
    "/hello": async (req, res) => {
      for await (const data of req) {
        const d = JSON.parse(data)
        console.log(d);

      }
      return res.end()
    }
  }
}

const handler = (request, response) => {
  const { method, url } = request;
  const chosen = routes[method][url] || routes[method].default
  return chosen(request, response)
}

export const app = http.createServer(handler)