import app from "./config/app"

const PORT: number = +(process.env.PORT as string) || 3000;

app.listen({ port: PORT }, (err) => {
  if (err) {
    app.log.error(err)
    process.exit(1)
  }
})